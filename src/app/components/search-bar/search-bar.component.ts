import { Component } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  shows: any = [];
  searchTerm: string = '';

search() {
  console.log('je suis dans search');

  fetch("http://localhost:3000/api/show/search/tvshow", {method: 'POST', headers: {
    'Content-Type': 'application/json'
  } , body : JSON.stringify({ title: this.searchTerm})})
  .then(response => response.json())
  .then(result => {

    this.shows = result.results;
        console.log(this.shows);
  })
}

addShowViewedList(showId: number) {
    // L'utilisateur est connecté
    let me: any = localStorage.getItem('me');
    me = JSON.parse(me);
    // On récupère le token

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
    }) .then(() => { })
  }

getPoster(path: string) { 
  console.log(path);
  
  return 'https://image.tmdb.org/t/p/w300/' + path;
}

}
