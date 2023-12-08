import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit, OnDestroy {
  popularShows: any = [];
  slides: any = [];
  currentSlideIndex: number = 0;
  private autoSlideInterval: any;
  show: any;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.getPopularShows();
     this.startAutoSlide();
  }

    startAutoSlide() {
    this.autoSlideInterval = setInterval(() => {
      this.nextSlide();
    }, 20000); // 20 secondes
  }

  ngOnDestroy(): void {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
  }

  nextSlide() {
    this.currentSlideIndex = (this.currentSlideIndex + 1) % this.slides.length;
  }

  previousSlide() {
    this.currentSlideIndex = (this.currentSlideIndex - 1 + this.slides.length) % this.slides.length;
  }


  getPoster(path: string) {

    if (!path ) {
return 'https://via.placeholder.com/300x450?text=No+image+available';
    }
  
    
    return 'https://image.tmdb.org/t/p/w500/' + path;
  }

  getPopularShows() {
    this.http.get('http://localhost:3000/api/show/popular/tvshows?page=1').subscribe(
      (response: any) => {

        this.popularShows = response.splice(1, 7);
        
        const excludedPath = '/7dFZJ2ZJJdcmkp05B9NWlqTJ5tq.jpg';
  

        this.setSlides();
    
      },
      (error) => {
        console.error('Erreur lors de la récupération des séries populaires', error);
      }
    );
  }

    setSlides() {
      const baseUrl = 'https://image.tmdb.org/t/p/w500/';
  
    this.slides = this.popularShows;

  }

    goToDetails(slide: any) {

      
    this.router.navigate(['/show-details', slide.id]);
  }
}



