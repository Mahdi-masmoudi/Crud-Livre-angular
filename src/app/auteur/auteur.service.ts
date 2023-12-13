import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Auteur } from './auteur';

@Injectable({
  providedIn: 'root',
})
export class AuteurService {
  getAuteurs() {
    throw new Error('Method not implemented.');
  }

  private apiURL = 'http://localhost:5000/api';

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<any> {
    return this.httpClient.get(this.apiURL + '/auteurs/');
  }
  create(auteur: Auteur): Observable<any> {
    return this.httpClient.post(this.apiURL + '/auteurs/', auteur);
  }
  getAuteurByID(_id: object): Observable<any> {
    return this.httpClient.get(this.apiURL + '/auteurs/' + _id);
  }
  update(_id: object, auteur: Auteur): Observable<any> {
    return this.httpClient.put(this.apiURL + '/auteurs/' + _id, auteur);
  }

  delete(_id: object) {
    return this.httpClient.delete(this.apiURL + '/auteurs/' + _id);
  }
}
