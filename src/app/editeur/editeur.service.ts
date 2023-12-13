import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Editeur } from './editeur';

@Injectable({
  providedIn: 'root',
})
export class EditeurService {
  private apiURL = 'http://localhost:5000/api';
  constructor(private httpClient: HttpClient) {}
  getAll(): Observable<any> {
    return this.httpClient.get(this.apiURL + '/editeurs/');
  }
  create(editeur: Editeur): Observable<any> {
    return this.httpClient.post(this.apiURL + '/editeurs/', editeur);
  }
  find(_id: object): Observable<any> {
    return this.httpClient.get(this.apiURL + '/editeurs/' + _id);
  }
  update(_id: object, editeur: Editeur): Observable<any> {
    return this.httpClient.put(this.apiURL + '/editeurs/' + _id, editeur);
  }

  delete(_id: object) {
    return this.httpClient.delete(this.apiURL + '/editeurs/' + _id);
  }
}
