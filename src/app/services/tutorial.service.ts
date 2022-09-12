import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tutorial } from '../models/tutorial.model';
import { Observable } from 'rxjs/internal/Observable';
import { ObservableLike } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TutorialService {

  private urlApi = 'http://localhost:8081/api';

  constructor(private http: HttpClient) { }

  getAllTutorials(): Observable<Tutorial[]> {
    return this.http.get<Tutorial[]>(`${this.urlApi}/tutorials`);
  }

  getTutorialById(id: string): Observable<Tutorial> {
    return this.http.get<Tutorial>(`${this.urlApi}/tutorial/${id}`)
  }

  createTutorial(tutorial: Tutorial) {
    console.log(tutorial);
    return this.http.post(`${this.urlApi}/tutorial`, tutorial);
  }

  findByTitle(title: string): Observable<Tutorial[]> {
    return this.http.get<Tutorial[]>(`${this.urlApi}/tutorial/title/${title}`);
  }

  deleteAllTutorials(): Observable<JSON> {
    return this.http.delete<JSON>(`${this.urlApi}/tutorials`)
  }

  updateTutorial(id: string, tutorial: Tutorial) {
    return this.http.put<JSON>(`${this.urlApi}/tutorial/${id}`, tutorial);
  }

  deleteTutorialById(id: string) {
    return this.http.delete(`${this.urlApi}/tutorial/${id}`)
  }
}
