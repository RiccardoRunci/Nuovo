import { Injectable } from '@angular/core'; //HttpClient permette di fare upload/download e accedere ai dati di un servizio backend tramite il protocollo http.
import { HttpClient, HttpParams } from '@angular/common/http'; //importo HttpClient che è una classe che stà nel packeg '@angular/common/http'
import {Utenti} from './Utenti';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService 
{
  /*Nel costruttore inizializzo l'attributo http che sarà di tipo HttpClient.
  In modo tale (per quando mi servirà) di fare this.http e richiamare il metodo get() il quale
  mi permette di fare il "fetch data" ossia di recuperare i dati dal backend.*/
  constructor(private http: HttpClient) { }
  
//-----------------------------------------------------------------------------------------------------------
  TuttoElenco():Observable<Utenti[]> //observable perchè è una funzione asincrona
  { //stampo la lista di tutti gli utenti!
    return  this.http.get<Utenti[]>('/api/Admin/utenti');
  }
//-----------------------------------------------------------------------------------------------------------
  EliminaUtente(EmailUtente:string)
  {
    var url= ('/api/Admin/eliminautente');
    const params = new HttpParams().set('EmailUtente', EmailUtente);

    return this.http.delete(url, { params });
  }
//----------------------------------------------------------------------------------------------------------- 
  CercaUtente(EmailUtente: string) 
  {
    console.log("Comincio la ricerca?");
    return this.http.get('/api/Admin/utenti/'+EmailUtente);  
  }
//-----------------------------------------------------------------------------------------------------------
}

