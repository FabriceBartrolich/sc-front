import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page-show-details',
  templateUrl: './page-show-details.component.html',
  styleUrls: ['./page-show-details.component.css']
})
export class PageShowDetailsComponent implements OnInit {
  showId: string | null | undefined;
  showDetails: any;


  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.showId = this.route.snapshot.paramMap.get('id');
    if (this.showId) {
      this.getShowDetails(this.showId);
    }
  }

  getShowDetails(id: string) {
    let me: any = localStorage.getItem('me');
    if (me) {
      me = JSON.parse(me);
    }

    fetch(`http://localhost:3000/api/show/search/tvshow/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${me?.token}`,
      },
    })
    .then((response) => response.json())
    .then((result) => {
      console.log('Détails de la série', result);
      
      this.showDetails = result;
      // Maintenant, les détails de la série sont stockés dans showDetails
    })
    .catch((error) => {
      console.error('Erreur lors de la récupération des détails du show', error);
    });
  }

  getPoster(path: string) {
      console.log('image', path);
    if (!path ) {
return 'https://via.placeholder.com/300x450?text=No+image+available';
    }
  
    
    return 'https://image.tmdb.org/t/p/w300/' + path;
  }
}



