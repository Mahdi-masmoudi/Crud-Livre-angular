import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Livre } from './livre';
@Injectable({
  providedIn: 'root',
})
export class LivreService {
  couverture: any;
  getAuteurs() {
    throw new Error('Method not implemented.');
  }

  private apiURL = 'http://localhost:5000/api';

  constructor(private httpClient: HttpClient) {}
  getAuteurByID(_id: object): Observable<any> {
    return this.httpClient.get(this.apiURL + '/auteurs/' + _id);
  }
  getAll(): Observable<any> {
    return this.httpClient.get(this.apiURL + '/livres/').pipe(
      tap((data) => console.log('Data from API:', data)),
      catchError((error) => {
        console.error('Error loading data', error);
        return throwError(error);
      })
    );
  }
  create(livre: Livre): Observable<any> {
    return this.httpClient.post(this.apiURL + '/livres/', livre);
  }
  find(_id: object): Observable<any> {
    return this.httpClient.get(this.apiURL + '/livres/' + _id);
  }
  update(_id: object, livre: Livre): Observable<any> {
    return this.httpClient.put(this.apiURL + '/livres/' + _id, livre);
  }

  delete(_id: object) {
    return this.httpClient.delete(this.apiURL + '/livres/' + _id);
  }
  uploadSignature(vals: any): Observable<any> {
    let data = vals;

    return this.httpClient.post(
      'https://api.cloudinary.com/v1_1/bib-iset/image/upload',
      data
    );
  }
}
