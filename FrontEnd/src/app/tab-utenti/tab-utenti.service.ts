import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'; //importo l'HttpClient.
import { Observable } from 'rxjs'; //importo observable
import {catchError,tap} from 'rxjs/operators'; //????
import {Utenti} from './Utenti';
import { map } from 'rxjs/operators';

interface Utente_Eliminato 
{
  Utente_Eliminato: string;
}



@Injectable({
  providedIn: 'root'
})
export class TabUtentiService 
{
  constructor(private http: HttpClient) { } //nel costruttore inizializzo HttpClient.
//-------------------------------------------------------------------------------------
  utenti():Observable<Utenti[]> //observable perchè è una funzione asincrona
  { //stampo la lista di tutti gli utenti!
    return this.http.get<Utenti[]>('/api/TabUtenti/utenti',{responseType:"json"}).pipe(tap((_)=>console.log('Ok')));
  }
//-------------------------------------------------------------------------------------
  InserisciUtente(NomeUtente:string,EmailUtente:string)
  {
    var InserisciUt = ('/api/TabUtenti/inserisciutente');
    this.http.post
    (
      InserisciUt,
      {
        'nomeUt': NomeUtente,
        'emailUt': EmailUtente
      }
    ).subscribe
    (
      res => 
      {
        alert(res); //dice object object!!
        console.log(res); //qui mi dice come gli ho detto io nel backend
        //console.log(res.valueOf); native code????
      }, 
      err => 
      {
        console.log(err);
      }
    )  
  }
//-------------------------------------------------------------------------------------
EliminaUtente(NomeUtente:string)
{
  var url= ('/api/TabUtenti/eliminautente');
  let endPoints = NomeUtente;
  /* this.http.delete(url +"/"+ endPoints).subscribe
  (
    data => 
    {
      console.log(data);
    },
    res => 
    {
      alert(res); //dice object object!!
      console.log(res); //qui mi dice come gli ho detto io nel backend
      //console.log(res.valueOf); native code????
    }, */
    /* err => { console.log(err); } QUESTO no???*/ 
    return this.http.delete<Utente_Eliminato>(url +"/"+ endPoints).pipe(
      map(todo=>({Utete_Eliminato:todo.Utente_Eliminato})));
}
//-------------------------------------------------------------------------------------
CercaUtente(NomeUtente: string)
{
  return this.http.get('/api/TabUtenti/utenti/'+NomeUtente,{responseType:"json"}).subscribe(err=>console.log(err),res=>console.log(res));
  //return this.http.get('/api/TabUtenti/utenti/'+NomeUtente,{responseType:"json"}).subscribe(res=>console.log(res)); //questa mi ha fatto crashare nodejs, è uscito fuori un errore (non catturato?!?) e ha crashato tutto.
}
//-------------------------------------------------------------------------------------
}