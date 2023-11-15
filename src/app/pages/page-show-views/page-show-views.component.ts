import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-show-views',
  templateUrl: './page-show-views.component.html',
  styleUrls: ['./page-show-views.component.css'],
})
export class PageShowViewsComponent implements OnInit {
  shows: any = [];

  constructor(private router: Router) { }
  ngOnInit(): any {
    this.loadShows();
  }

  loadShows() {
    // console.log('je suis dans loadShows');
    let me: any = localStorage.getItem('me');
    me = JSON.parse(me);
    fetch(`http://localhost:3000/api/show/viewed/${me.user.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${me.token}`,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.statusCode == 401) {
          console.log("Tu n'est pas connecté");
          this.router.navigate(['/connect']); 
          localStorage.removeItem('me');
        } else {
          this.shows = result;
          console.log('Bonjour', result);
        }
      })
      .catch((error) => {
        console.log('Une erreur a été rencontrée');
      });
  }

  getPoster(path: string) {
    console.log(path);
    return 'https://image.tmdb.org/t/p/w300/' + path;
  }

  // addShowViewedList(showId: number) {
  //   let me: any = localStorage.getItem('me');
  //   me = JSON.parse(me);

  //   const userId = me.id;

  //   fetch(`http://localhost:3000/api/show/viewed/${me.user.id}/${showId}`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: `Bearer ${me.token}`,
  //     },
  //     body: JSON.stringify({
  //       userId,
  //       showId,
  //     }),
  //   }) .then(() => { this.loadShows();})
  // }

  removeShowViewedList(showId: number) {
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
  //   .then(() => {
  //     // Enlever le show de la liste des shows
  //     this.shows = this.shows.filter((show: any) => {
  //       return show.id !== showId;
  //     });
  //   });
  // }
}
