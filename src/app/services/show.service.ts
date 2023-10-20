import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Show } from '../models/show';

@Injectable({
  providedIn: 'root',
})
export class ShowService {
  url: string = 'http://localhost:3000/api/show';

  constructor(private http: HttpClient) {}

  // Méthode pour récupérer tous les shows
  getShow(): Observable<Show[]> {
    return this.http.get<Show[]>(`${this.url}`);
  }

  // Méthode pour récupérer un show par son ID
  getShowById(id: number): Observable<Show> {
    return this.http.get<Show>(`${this.url}/${id}`);
  }

  // Méthode pour créer un nouveau show
  createShow(newShow: Show): Observable<Show> {
    const token = localStorage.getItem('token'); // On récupère le token dans le localStorage
    return this.http.post<Show>(this.url, newShow, {
      headers: { Authorization: `Bearer ${token}` },
    }); // On envoie le token dans les headers
  }

  // Méthode pour supprimer un show
  deleteShow(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  // Méthode pour mettre à jour un show
  updateShow(updatedShow: Show): Observable<Show> {
    return this.http.patch<Show>(
      `${this.url}/${updatedShow.id}`,
      updatedShow
    );
  }
}

