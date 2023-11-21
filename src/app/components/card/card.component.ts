import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Show } from 'src/app/models/show';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input() show: any = {
    name: '',
    poster_path: '',
    id: undefined,
  };
  @Input() mode = '';
  @Input() titleId: any = 'name';
  @Input() idKey: any = 'id';

  @Input() isUserLoggedIn: boolean = false;
  shows: Show[] = [];

  @Output() addViewedShow = new EventEmitter<number>();
  @Output() addWishedShow = new EventEmitter<number>();
  @Output() removeViewedShow = new EventEmitter<number>();
  @Output() removeWishedShow = new EventEmitter<number>();

  constructor(private userService: UserService, private router: Router) {}
  ngOnInit(): void {}

  addShowViewedList(showId: number | undefined) {
    let me: any = localStorage.getItem('me');
    me = JSON.parse(me);
    const userId = me.id;
    if (showId === undefined) {
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
          if (response.status === 401) {
            this.router.navigate(['/connect']);
            localStorage.removeItem('me');
            return; // Ajouter un return ici pour gérer le cas 401
          } else {
            throw new Error(
              `Échec de l'ajout de la série à la liste des séries vues !`
            );
          }
        } else {
          return response.json(); // Continue avec le traitement de la réponse
        }
      })
      .then(() => {
        this.addViewedShow.emit(showId);
        this.shows = this.shows.map((show: any) => {
          if (show.id === showId) {
            show.is_viewed = true;
            show.is_wished = true;
          }
          return show;
        });
      })
      .catch((error) => {
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
          if (response.status === 401) {

            this.router.navigate(['/connect']);
            localStorage.removeItem('me');
            return; // Ajoute un return ici pour gérer le cas 401
          } else {
            throw new Error(
              `Échec de l'ajout de la série à la liste des séries à voir !`
            );
          }
        } else {
          return response.json();
        }
      })
      .then(() => {
        this.addWishedShow.emit(showId);
        this.shows = this.shows.map((show: any) => {
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
    })
      .then((response) => {
        if (!response.ok && response.status == 401) {

          this.router.navigate(['/connect']);
          localStorage.removeItem('me');
        } else if (response.ok) {
          this.removeViewedShow.emit(showId);
          this.shows = this.shows.filter((show: any) => show.id !== showId);

        }
        // return response.json(); // facultatif, selon le besoin de traiter la réponse
      })
      .catch((error) => {

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
    })
      .then((response) => {
        if (!response.ok && response.status == 401) {

          this.router.navigate(['/connect']);
          localStorage.removeItem('me');
        } else if (response.ok) {
          this.removeWishedShow.emit(showId);
          this.shows = this.shows.filter((show: any) => show.id !== showId);
  
        }
        // return response.json(); // facultatif, selon le besoin de traiter la réponse
      })
      .catch((error) => {

      });
  }

  isLoggedIn() {
    return this.userService.isLoggedIn();
  }

  getPoster(path: string) {

    if (!path) {
      return 'https://via.placeholder.com/300x450?text=No+image+available';
    }

    return 'https://image.tmdb.org/t/p/w300/' + path;
  }
  // getPoster(poster_path: string): string {
  //   return 'https://image.tmdb.org/t/p/w300/' + poster_path;
  // }

  goToDetails() {
    console.log(this.show);
    
    this.router.navigate(['/show-details', this.show[this.idKey]]);
  }
}
