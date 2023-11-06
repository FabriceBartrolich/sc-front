import { Component, Input } from '@angular/core';
import { Show } from 'src/app/models/show';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  @Input() show?: Show;
  @Input() isUserLoggedIn: boolean = false;

  constructor() { }

  addShowViewedList(showId: number) {
    // Ici, tu ajoutes le code pour ajouter la série à la liste des séries vues
    console.log('Série ajoutée à la liste des séries vues', showId);
  }

  addShowWishedList(showId: number) {
    // Ici, tu ajoutes le code pour ajouter la série à la liste de souhaits
    console.log('Série ajoutée à la liste de souhaits', showId);
  }

getPoster(poster_path: string): string {
  return 'https://image.tmdb.org/t/p/w300/' + poster_path;
}

}

