import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
  popularShows: string[] = [];
  slides: string[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getPopularShows();
  }

  getPopularShows() {
    this.http.get<{ posterPaths: string[] }>('http://localhost:3000/api/show/popular').subscribe(
      (response) => {
        this.popularShows = response.posterPaths;
        this.getRandomSlides();
      },
      (error) => {
        console.error('Erreur lors de la récupération des séries populaires', error);
      }
    );
  }

  getRandomSlides() {
    for (let i = 0; i < 3; i++) {
      const randomIndex = Math.floor(Math.random() * this.popularShows.length);
      this.slides.push(this.popularShows[randomIndex]);
    }
  }
}

