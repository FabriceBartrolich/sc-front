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
  currentSlideIndex: number = 0;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getPopularShows();
    
  }
  nextSlide() {
    this.currentSlideIndex = (this.currentSlideIndex + 1) % this.slides.length;
  }

  previousSlide() {
    this.currentSlideIndex = (this.currentSlideIndex - 1 + this.slides.length) % this.slides.length;
  }

  // updateActiveSlide() {
  //   this.slides = this.slides.map((slide, index) => ({
  //     ...slide,
  //     active: index === this.currentSlideIndex
  //   }));
  // }

  getPopularShows() {
    this.http.get<{ posterPaths: string[] }>('http://localhost:3000/api/show/popular/tvshows?page=1').subscribe(
      (response) => {
        const excludedPath = '/7dFZJ2ZJJdcmkp05B9NWlqTJ5tq.jpg';
        this.popularShows = response.posterPaths.filter(posterPath => posterPath !== excludedPath);
        console.table('popular => '+ this.popularShows[2])
        console.log('popular => ', this.popularShows)
        this.setSlides();
        // this.getRandomSlides();
      },
      (error) => {
        console.error('Erreur lors de la récupération des séries populaires', error);
      }
    );
  }

    setSlides() {
      const baseUrl = 'https://image.tmdb.org/t/p/w500/';
    // this.slides = [...this.popularShows];
    this.slides = this.popularShows.map(posterPath => baseUrl + posterPath);

  }
  // getRandomSlides() {
  //   for (let i = 0; i < 3; i++) {
  //     const randomIndex = Math.floor(Math.random() * this.popularShows.length);
  //     this.slides.push(this.popularShows[randomIndex]);
  //   }
  // }

  // getRandomSlides() {
  // this.slides = []; // Réinitialiser les slides si nécessaire

  // for (let i = 0; i < 3; i++) {
  //   let randomIndex;
  //   let selectedItem;

  //   do {
  //     randomIndex = Math.floor(Math.random() * this.popularShows.length);
  //     selectedItem = this.popularShows[randomIndex];
  //   } while (this.slides.includes(selectedItem));

  //   this.slides.push(selectedItem);
  // }
}



