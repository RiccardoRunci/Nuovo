import { Injectable } from '@angular/core'; //HttpClient permette di fare upload/download e accedere ai dati di un servizio backend tramite il protocollo http.
import { HttpClient, HttpParams } from '@angular/common/http'; //importo HttpClient che è una classe che stà nel packeg '@angular/common/http'
import {Utenti} from './Utenti';
import { Observable } from 'rxjs';


@Injectable
({
  providedIn: 'root'//DEVI RICORDARDI di importare HttpClientModule in /src/app/AppModule e metterlo anche (nello stesso file in imports:[]).
})
export class TabCredenzialiService 
{
  /*Nel costruttore inizializzo l'attributo http che sarà di tipo HttpClient.
  In modo tale (per quando mi servirà) di fare this.http e richiamare il metodo get() il quale
  mi permette di fare il "fetch data" ossia di recuperare i dati dal backend.*/
  constructor(private http: HttpClient) { }
  
//-----------------------------------------------------------------------------------------------------------
  TuttoElenco():Observable<Utenti[]> //observable perchè è una funzione asincrona
  { //stampo la lista di tutti gli utenti!
    return  this.http.get<Utenti[]>('/api/TabCredenziali/utenti');
  }
//-----------------------------------------------------------------------------------------------------------  
  InserisciUtente(NomeUtente:string,PasswordUtente:string)
  {
    var InserisciUt = ('/api/TabCredenziali/inserisciutente');
    this.http.post
    (
      InserisciUt,
      {
        'nomeUt': NomeUtente,
        'passwordUt': PasswordUtente
      }
    ).subscribe
    (
      res => 
      {
        alert(res); 
      }, 
      err => 
      {
        console.log(err);
      }
    )  
  }
//-----------------------------------------------------------------------------------------------------------
  EliminaUtente(NomeUtente:string)
  {
    var url= ('/api/TabCredenziali/eliminautente');
    const params = new HttpParams().set('NomeUtente', NomeUtente);

    return this.http.delete(url, { params });
  }
//----------------------------------------------------------------------------------------------------------- 
  CercaUtente(NomeUtente: string) 
  {
    console.log("Comincio la ricerca?");
    return this.http.get('/api/TabCredenziali/utenti/'+NomeUtente);  
  }
//-----------------------------------------------------------------------------------------------------------
  LoginPassword(NomeUtente: string,PasswordUtente: string)
  {
    var InserisciUt = ('/api/TabCredenziali/login');
    this.http.post
    (
      InserisciUt,
      {
        'nomeUt': NomeUtente,
        'passwordUt': PasswordUtente
      }
    ).subscribe
    (
      res => 
      {
        alert(res); 
      }, 
      err => 
      {
        console.log(err);
      }
    )  
  }
//-----------------------------------------------------------------------------------------------------------
}
