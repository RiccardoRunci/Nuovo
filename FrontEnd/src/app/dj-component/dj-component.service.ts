import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Episodi } from './Episodi';

@Injectable({
  providedIn: 'root'
})

export class DjComponentService 
{
  ngOnInit(): void {  }
  constructor(private http: HttpClient) 
  { 

  }
//-----------------------------------------------------------------------------------------
  InserisciEpisodio(NomeEpisodio:string)
  {
    var InserisciEp = ('/api/Dj-Route/inserisciEpisodio');
    return this.http.post
    (
      InserisciEp,
      {
        'nomeEpisodio': NomeEpisodio,
      }
    )
  }
//-----------------------------------------------------------------------------------------
  ElencoEpisodi():Observable<Episodi[]> //observable perchè è una funzione asincrona
  { 
    return  this.http.get<Episodi[]>('/api/Dj-Route/Episodi');
  }
//-----------------------------------------------------------------------------------------
  EliminaEpisodio(NomeEpisodio:string)
  {
    //console.log("Nome Episodio da eliminare arrivato: "+NomeEpisodio);
   var EliminaEp = ('/api/Dj-Route/EliminaEpisodio/'+NomeEpisodio);
    return this.http.delete(EliminaEp);
  } 
//-----------------------------------------------------------------------------------------
  insersiciCanzone(Vocale:string,LinkYouTube:string,NomeEpisodio:string) //'POST /inserisciCanzone'
  { 
    //mette tutto nell'header: f12->network-> click su inserisciCanzone e a dx su header 
      let formData = new FormData(); //per spedire la base64 creo una form data.
      formData.append('Vocale',Vocale); //per spedire la base64 creo una form data.
      formData.append('LinkYouTube',LinkYouTube);
      formData.append('NomeEpisodio',NomeEpisodio);
      
    
    var InserisciCanzon = ('/api/Dj-Route/inserisciCanzone');
    return this.http.post('/api/Dj-Route/inserisciCanzone',formData);
   
  }
//-----------------------------------------------------------------------------------------
  EliminaCanzone()
  {

  }
//-----------------------------------------------------------------------------------------
}
