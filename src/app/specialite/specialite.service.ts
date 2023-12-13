import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Specialite } from './specialite';

@Injectable({
  providedIn: 'root',
})
export class SpecialiteService {
  private apiURL = 'http://localhost:5000/api';

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<any> {
    return this.httpClient.get(this.apiURL + '/specialites/').pipe(
      tap((data) => console.log('Data from API:', data)),
      catchError((error) => {
        console.error('Error loading data', error);
        return throwError(error);
      })
    );
  }
  create(specialite: Specialite): Observable<any> {
    return this.httpClient.post(this.apiURL + '/specialites/', specialite);
  }
  find(_id: object): Observable<any> {
    return this.httpClient.get(this.apiURL + '/specialites/' + _id);
  }
  update(_id: object, specialite: Specialite): Observable<any> {
    return this.httpClient.put(this.apiURL + '/specialites/' + _id, specialite);
  }

  delete(_id: object) {
    return this.httpClient.delete(this.apiURL + '/specialites/' + _id);
  }
}
