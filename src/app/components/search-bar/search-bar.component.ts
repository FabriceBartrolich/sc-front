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
    this.shows = this.shows.map((show: any) => {
      if (show.id === id) {
        show.is_viewed = true;
      }
      return show;
    });
  }

  markShowAsWished(id: any) {
    this.shows = this.shows.map((show: any) => {
      if (show.id === id) {
        show.is_wished = true;
      }
      return show;
    });
  }

  search() {
   
    this.carousel = false;
    const me = this.userService.getMe();
    if (!me) {
      // return;
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

  getPoster(path: string) {
    if (!path) {
      return 'https://via.placeholder.com/300x450?text=No+image+available';
    }

    return 'https://image.tmdb.org/t/p/w300/' + path;
  }

  scrollToTop() {
    window.scrollTo(0, 0);
  }
}
