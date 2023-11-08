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

  constructor(private userService: UserService) {}

  // À l'initialisation, vérifiez si des résultats de recherche sont stockés
  ngOnInit() {
    this.retrieveSearchData();
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

  // Fonction pour récupérer les données de recherche sauvegardées
  retrieveSearchData() {
    const savedSearchTerm = localStorage.getItem('searchTerm');
    const savedResults = localStorage.getItem('searchResults');
    if (savedSearchTerm) {
      this.searchTerm = savedSearchTerm;
    }
    if (savedResults) {
      this.shows = JSON.parse(savedResults);
    }
  }

  search() {
    console.log('je suis dans search', this.searchTerm);
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
        console.log(this.shows);
        localStorage.setItem('searchTerm', this.searchTerm);
        localStorage.setItem('searchResults', JSON.stringify(this.shows));
        console.log(this.shows);
      });

  }

  addShowViewedList(showId: number) {
    // L'utilisateur est connecté
    let me: any = localStorage.getItem('me');
    me = JSON.parse(me);

    // On récupère l'id de l'utilisateur
    const userId = me.id;
    // On récupère l'id du show

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
    }).then(() => {});
  }

  addShowWishedList(showId: number) {
  let me: any = localStorage.getItem('me');
  me = JSON.parse(me);

  const userId = me.id;

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
  .then(response => {
    if (!response.ok) {
      throw new Error(`Échec de l'ajout de la série à la liste de souhaits`);
    }
    return response.json();
  })
  .then(() => {
    // Traiter la réponse - par exemple, notifier l'utilisateur du succès
    alert(`Série ajoutée à la liste de souhaits avec succès!`);
        // this.search();
        this.shows = this.shows.map((show: any) => {
          if (show.id === showId) {
            show.is_wished = true;
          }
          return show;
        });
  })
  .catch(error => {
    // Gérer les erreurs
    console.error(`Erreur lors de l'ajout de la série à la liste de souhaits:`, error);
    alert(`Une erreur est survenue lors de l'ajout de la série à la liste de souhaits.`);
  });
}


  getPoster(path: string) {
    return 'https://image.tmdb.org/t/p/w300/' + path;
  }
}
