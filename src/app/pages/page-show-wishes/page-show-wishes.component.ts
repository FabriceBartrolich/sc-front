import { Component } from '@angular/core';

@Component({
  selector: 'app-page-show-wishes',
  templateUrl: './page-show-wishes.component.html',
  styleUrls: ['./page-show-wishes.component.css']
})
export class PageShowWishesComponent {
shows: any = [];
  ngOnInit(): any {
    this.loadShows();
  }
  loadShows() {
    console.log('je suis dans loadShows');
      let me: any = localStorage.getItem('me');
    me = JSON.parse(me);
    fetch('http://localhost:3000/api/show/wished/4', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${me.token}`,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        this.shows = result;
        console.log(this.shows);
      });
  }

  getPoster(path: string) {
    console.log(path);
    return 'https://image.tmdb.org/t/p/w300/' + path;
  }


removeShowWishedList(showId: number) {
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
    }) .then(() => { this.loadShows();})
  }
}
