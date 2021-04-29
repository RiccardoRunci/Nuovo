import { Injectable } from '@angular/core';
import { Canzoni } from './Canzoni';
import { HttpClient, HttpParams } from '@angular/common/http'; //importo HttpClient che è una classe che stà nel packeg '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProvaAdioService {

  constructor(private http: HttpClient) { }

  ElencoCanzoni():Observable<Canzoni[]> //observable perchè è una funzione asincrona
  { //stampo la lista di tutti gli utenti!
    return  this.http.get<Canzoni[]>('/api/Utente/TutteCanzoni');
  }
}
