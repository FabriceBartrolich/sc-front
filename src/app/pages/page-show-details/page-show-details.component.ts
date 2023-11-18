import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-page-show-details',
  templateUrl: './page-show-details.component.html',
  styleUrls: ['./page-show-details.component.css']
})
export class PageShowDetailsComponent implements OnInit {
  showId: string | null | undefined;
  showDetails: any;
  addWishedShow: any;



  constructor(private route: ActivatedRoute, private router: Router ) {}

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

    addShowWishedList(showId: number | undefined) {
      console.log("AddShowWishedList test");
      
     console.log("AddShowWishedList 1");
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
        console.log("Tu n'es pas connecté");
        this.router.navigate(['/connect']);
        localStorage.removeItem('me');
        return; // Ajoute un return ici pour gérer le cas 401
      } else {
        throw new Error(`Échec de l'ajout de la série à la liste des séries à voir !`);
      }
    } else {
      return response.json();
    }
  })
      .then(() => {
        this.showDetails.is_wished = true;
        // this.addWishedShow.emit(showId);
        // this.shows = this.shows.map((show: any) => {
        //   if (show.id === showId) {
        //     show.is_viewed = true;
        //     show.is_wished = true;
        //   }
        //   return show;
        // });
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


}



