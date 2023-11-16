import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Show } from 'src/app/models/show';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit{
  @Input() show: Show = {
    name:'',
    poster_path:'',
    id: undefined,
  };
  @Input() isUserLoggedIn: boolean = false;
  shows: Show[] = []
  
  @Output() addViewedShow = new EventEmitter<number>();
 @Output() addWishedShow = new EventEmitter<number>();
  

  constructor(private userService:UserService, private router: Router) { }
  ngOnInit(): void {
    console.log('dans la carte ', this.show)
  }

  
addShowViewedList(showId: number | undefined) {
    // L'utilisateur est connecté
    let me: any = localStorage.getItem('me');
    me = JSON.parse(me);

    // On récupère l'id de l'utilisateur
    const userId = me.id;
    // On récupère l'id du show
    if (showId === undefined) {
      // Gérer le cas où showId est undefined
      console.error('Erreur: showId est undefined');
      return;
    }

    fetch(`http://localhost:3000/api/show/viewedShows`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${me.token}`,
      },
      body: JSON.stringify({
        userId,
        showId,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Échec de l'ajout de la série à la liste des séries vues !`
          );
        }
        return response.json();
      })
      .then(() => {
        // Traiter la réponse - par exemple, notifier l'utilisateur du succès
        // console.log("Bonjour");
        
        this.addViewedShow.emit(showId);
        console.log(this.shows);
        // this.search();
        this.shows = this.shows.map((show: any) => {
          console.log(show.id, showId);
          
          if (show.id === showId) {
            show.is_viewed = true;
             show.is_wished = true;
            
          }
          return show;
        });
      })
      .catch((error) => {
        // Gérer les erreurs
        console.error(
          `Erreur lors de l'ajout de la série à la liste des séries vues:`,
          error
        );
        alert(
          `Une erreur est survenue lors de l'ajout de la série à la liste des séries vues.`
        );
      });
  }

  addShowWishedList(showId: number | undefined) {
    let me: any = localStorage.getItem('me');
    me = JSON.parse(me);

    const userId = me.id;

    if (showId === undefined) {
      // Gérer le cas où showId est undefined
      console.error('Erreur: showId est undefined');
      return;
    }
    

    fetch(`http://localhost:3000/api/show/wishedShows`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${me.token}`,
      },
      body: JSON.stringify({
        userId,
        showId,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Échec de l'ajout de la série à la liste des séries à voir !`
          );
        }
        return response.json();
      })
      .then(() => {
        // Traiter la réponse - par exemple, notifier l'utilisateur du succès
        // alert(`Série ajoutée avec succès à la liste des séries à voir !`);
        // this.search();
        this.addWishedShow.emit(showId);
        console.log(this.shows);
        // this.search();
        this.shows = this.shows.map((show: any) => {
          console.log(show.id, showId);
          
          if (show.id === showId) {
             show.is_viewed = true;
            show.is_wished = true;
          }
          return show;
        });
      })
      .catch((error) => {
        // Gérer les erreurs
        console.error(
          `Erreur lors de l'ajout de la série à la liste des séries à voir :`,
          error
        );
        alert(
          `Une erreur est survenue lors de l'ajout de la série à la liste des séries à voir.`
        );
      });
  }

removeShowViewedList(showId: number | undefined) {
    // L'utilisateur est connecté
    let me: any = localStorage.getItem('me');
    me = JSON.parse(me);
    // On récupère le token

    // On récupère l'id de l'utilisateur
    const userId = me.id;
    // On récupère l'id du show

    fetch(`http://localhost:3000/api/show/viewed/${me.user.id}/${showId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${me.token}`,
      },
      body: JSON.stringify({
        userId,
        showId,
      }),
    }).then((response) => {
  if (!response.ok && response.status == 401) {
    console.log("Tu n'es pas connecté");
    this.router.navigate(['/connect']);
    localStorage.removeItem('me');
  } else if (response.ok) {
    this.shows = this.shows.filter((show: any) => show.id !== showId);
  }
  // return response.json(); // facultatif, selon le besoin de traiter la réponse
})
.catch((error) => {
  console.log('Une erreur est survenue lors de la suppression de la série', error);
});
}

removeShowWishedList(showId: number | undefined) {
    // L'utilisateur est connecté
    let me: any = localStorage.getItem('me');

    me = JSON.parse(me);
    // On récupère le token

    // On récupère l'id de l'utilisateur
    const userId = me.id;
    // On récupère l'id du show

    fetch(`http://localhost:3000/api/show/wished/${me.user.id}/${showId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${me.token}`,
      },
      body: JSON.stringify({
        userId,
        showId,
      }),
    }).then((response) => {
  if (!response.ok && response.status == 401) {
    console.log("Tu n'es pas connecté");
    this.router.navigate(['/connect']);
    localStorage.removeItem('me');
  } else if (response.ok) {
    this.shows = this.shows.filter((show: any) => show.id !== showId);
  }
  // return response.json(); // facultatif, selon le besoin de traiter la réponse
})
.catch((error) => {
  console.log('Une erreur est survenue lors de la suppression de la série', error);
});
}


  isLoggedIn() {
    return this.userService.isLoggedIn();
  }
  
  getPoster(path: string) {
      console.log('image', path);
    if (!path ) {
return 'https://via.placeholder.com/300x450?text=No+image+available';
    }
  
    
    return 'https://image.tmdb.org/t/p/w300/' + path;
  }
// getPoster(poster_path: string): string {
//   return 'https://image.tmdb.org/t/p/w300/' + poster_path;
// }

goToDetails() {
this.router.navigate(['/show-details', this.show.id])
}

}

