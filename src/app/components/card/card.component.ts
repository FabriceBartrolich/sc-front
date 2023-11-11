import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Show } from 'src/app/models/show';
import { UserService } from 'src/app/services/user.service';


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

  

  constructor(private userService:UserService) { }
  ngOnInit(): void {
    console.log('dans la carte ', this.show)
  }

  // addShowViewedList(showId: number) {
  //   // Ici, tu ajoutes le code pour ajouter la série à la liste des séries vues
  //   console.log('Série ajoutée à la liste des séries vues', showId);
  // }

  // addShowWishedList(showId: number) {
  //   // Ici, tu ajoutes le code pour ajouter la série à la liste de souhaits
  //   console.log('Série ajoutée à la liste de souhaits', showId);
  // }
  
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
        console.log("Bonjour");
        
        this.addViewedShow.emit(showId);
        console.log(this.shows);
        // this.search();
        this.shows = this.shows.map((show: any) => {
          console.log(show.id, showId);
          
          if (show.id === showId) {
            show.is_viewed = true;
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
        alert(`Série ajoutée avec succès à la liste des séries à voir !`);
        // this.search();
        this.shows = this.shows.map((show: any) => {
          if (show.id === showId) {
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
  isLoggedIn() {
    return this.userService.isLoggedIn();
  }
  

// getPoster(poster_path: string): string {
//   return 'https://image.tmdb.org/t/p/w300/' + poster_path;
// }

}

