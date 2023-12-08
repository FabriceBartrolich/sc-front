import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-show-wishes',
  templateUrl: './page-show-wishes.component.html',
  styleUrls: ['./page-show-wishes.component.css'],
})
export class PageShowWishesComponent {
  shows: any = [];

  constructor(private router: Router) { }
  ngOnInit(): any {
    this.loadShows();
  }
  loadShows() {

    let me: any = localStorage.getItem('me');
    me = JSON.parse(me);

    
    fetch(`http://localhost:3000/api/show/wished/${me.user.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${me.token}`,
      },
    })
     .then((response) => response.json())
      .then((result) => {

        
        if (result.statusCode == 401) {
          this.router.navigate(['/connect']); 
          localStorage.removeItem('me');
        } else {
          this.shows = result;

        }
      })
      .catch((error) => {
        console.log('Une erreur a été rencontrée', error);
      });
  }

  getPoster(path: string) {

    return 'https://image.tmdb.org/t/p/w300/' + path;
  }


markShowAsRemovedWished(showId: number) {
  this.shows = this.shows.filter((show: any) => show.id !== showId);
}

  scrollToTop() {
  window.scrollTo(0, 0);
}
}