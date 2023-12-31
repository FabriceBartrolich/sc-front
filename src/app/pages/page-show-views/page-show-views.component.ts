import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-page-show-views',
  templateUrl: './page-show-views.component.html',
  styleUrls: ['./page-show-views.component.css'],
})
export class PageShowViewsComponent implements OnInit {
  shows: any = [];

  constructor(private router: Router, private userService: UserService) {}
  ngOnInit(): any {
    this.loadShows();
  }

  monShow = {
    name: 'The Walking Dead',
    poster_path: '/rqeYMLryjcawh2JeRpCVUDXYM5b.jpg',
    id: 1396,
  };

  loadShows() {
    const me = this.userService.getMe();

    if (!me) {
      return;
    }

    fetch(`http://localhost:3000/api/show/viewed`, {
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
        console.log('Une erreur a été rencontrée');
      });
  }

  getPoster(path: string) {
    return 'https://image.tmdb.org/t/p/w300/' + path;
  }

  markShowAsRemovedViewed(showId: number) {
    this.shows = this.shows.filter((show: any) => show.id !== showId);
  }

  scrollToTop() {
    window.scrollTo(0, 0);
  }
}
