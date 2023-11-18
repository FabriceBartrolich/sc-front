import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent implements OnInit {
  shows: any = [];
  searchTerm: string = '';
  carousel: boolean = true;

  constructor(private userService: UserService) {}

  // À l'initialisation, vérifiez si des résultats de recherche sont stockés
  ngOnInit() {
    // this.retrieveSearchData();
    // this.loadViewedShows();
  }

  isLoggedIn() {
    return this.userService.isLoggedIn();
  }

  jaidejavulaserie(idSerie: number) {
    //TODO mettre en place la logique pour vérifier si la s
    if (idSerie === 1396) {
      return true;
    } else {
      return false;
    }
  }

  markShowAsViewed(id: any) {
    // console.log('bonjour', id);
 this.shows = this.shows.map((show: any) => {
          console.log(show.id, id);
          
          if (show.id === id) {
            show.is_viewed = true;
          }
          return show;
        });
  }

    markShowAsWished(id: any) {
    // console.log('bonjour', id);
 this.shows = this.shows.map((show: any) => {
          console.log(show.id, id);
          
          if (show.id === id) {
            show.is_wished = true;
          }
          return show;
        });
  }


  search() {
    this.carousel = false;
    let me: any = localStorage.getItem('me');
    if (me) {
      me = JSON.parse(me);
    }
    fetch('http://localhost:3000/api/show/search/tvshow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${me?.token}`,
      },
      body: JSON.stringify({ title: this.searchTerm, userId: me?.user?.id }),
    })
      .then((response) => response.json())
      .then((result) => {
        this.shows = result.results;

        localStorage.setItem('searchTerm', this.searchTerm);
        localStorage.setItem('searchResults', JSON.stringify(this.shows));
         });
  }

  // addShowViewedList(showId: number) {
  //   // L'utilisateur est connecté
  //       console.log("AddShowViewedList 2");
  //   let me: any = localStorage.getItem('me');
  //   me = JSON.parse(me);

  //   // On récupère l'id de l'utilisateur
  //   const userId = me.id;
  //   // On récupère l'id du show

  //   fetch(`http://localhost:3000/api/show/viewedShows`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: `Bearer ${me.token}`,
  //     },
  //     body: JSON.stringify({
  //       userId,
  //       showId,
  //     }),
  //   })
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error(
  //           `Échec de l'ajout de la série à la liste des séries vues !`
  //         );
  //       }
  //       return response.json();
  //     })
  //     .then(() => {
  //       // Traiter la réponse - par exemple, notifier l'utilisateur du succès
  //       alert(`Série ajoutée avec succès à la liste des séries vues !`);
  //       // this.search();
  //       this.shows = this.shows.map((show: any) => {
  //         if (show.id === showId) {
  //           show.is_viewed = true;
  //         }
  //         return show;
  //       });
  //     })
  //     .catch((error) => {
  //       // Gérer les erreurs
  //       console.error(
  //         `Erreur lors de l'ajout de la série à la liste des séries vues:`,
  //         error
  //       );
  //       alert(
  //         `Une erreur est survenue lors de l'ajout de la série à la liste des séries vues.`
  //       );
  //     });
  // }

  // addShowWishedList(showId: number) {
  //           console.log("addShowWishedList 2");
  //   let me: any = localStorage.getItem('me');
  //   me = JSON.parse(me);

  //   const userId = me.id;

  //   fetch(`http://localhost:3000/api/show/wishedShows`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: `Bearer ${me.token}`,
  //     },
  //     body: JSON.stringify({
  //       userId,
  //       showId,
  //     }),
  //   })
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error(
  //           `Échec de l'ajout de la série à la liste des séries à voir !`
  //         );
  //       }
  //       return response.json();
  //     })
  //     .then(() => {
  //       // Traiter la réponse - par exemple, notifier l'utilisateur du succès
  //       alert(`Série ajoutée avec succès à la liste des séries à voir !`);
  //       // this.search();
  //       this.shows = this.shows.map((show: any) => {
  //         if (show.id === showId) {
  //           show.is_wished = true;
  //         }
  //         return show;
  //       });
  //     })
  //     .catch((error) => {
  //       // Gérer les erreurs
  //       console.error(
  //         `Erreur lors de l'ajout de la série à la liste des séries à voir :`,
  //         error
  //       );
  //       alert(
  //         `Une erreur est survenue lors de l'ajout de la série à la liste des séries à voir.`
  //       );
  //     });
  // }

  getPoster(path: string) {
      console.log('image', path);
    if (!path ) {
return 'https://via.placeholder.com/300x450?text=No+image+available';
    }
  
    
    return 'https://image.tmdb.org/t/p/w300/' + path;
  }

  scrollToTop() {
  window.scrollTo(0, 0);
}
}
