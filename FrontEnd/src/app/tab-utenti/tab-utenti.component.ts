import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs'; //importo observable mi serve per la lista utenti.
import { Utenti } from './Utenti'; //importo l'interfaccia utenti per poterli stampare.
import { TabUtentiService } from './tab-utenti.service'; //importo il service!

@Component({
  selector: 'app-tab-utenti',
  templateUrl: './tab-utenti.component.html',
  styleUrls: ['./tab-utenti.component.css']
})
export class TabUtentiComponent implements OnInit 
{
  VariabileListaUtenti$:Observable<Utenti[]> | undefined; //$ è una convenzione che significa che la variabile deriva da una funzione Observable.
  ErroreNomeEmailUtente:string;
  ErroreEliminaNome:string;
  RispostaCerca:string;

  constructor(private service: TabUtentiService) 
  { 
    this.ErroreNomeEmailUtente="";
    this.ErroreEliminaNome="";
    this.RispostaCerca="";
  }
  ngOnInit(): void { }
//----------------------------------------------------------------------------  
  Elenco()
  {
    this.VariabileListaUtenti$=this.service.utenti();
    this.VariabileListaUtenti$.subscribe( //errori,risposte e completamento
      res => console.log('HTTP response', res),
      err => console.log('HTTP Error', err),
      () => console.log('HTTP request completed.'));
  }
//----------------------------------------------------------------------------
  Aggiungi(NomeUtente:string,EmailUtente:string)
  {
    if(NomeUtente.length===0 || EmailUtente.length===0)
    {
      //errrore
      this.ErroreNomeEmailUtente=" <--- Devi inserire Email e Nome!!";
    }
    else
    {
      this.ErroreNomeEmailUtente="";
      this.service.InserisciUtente(NomeUtente,EmailUtente);
    }
  }
//----------------------------------------------------------------------------
  Elimina(NomeUtente:string)
  {
    if(NomeUtente.length===0)
    {
      this.ErroreEliminaNome=" <--- Devi inserire il nome per eliminare!!"
    }
    else
    {//https://stackoverflow.com/questions/52963804/working-with-data-from-http-response-in-angular
      this.service.EliminaUtente(NomeUtente).subscribe(Utente_Eliminato=>
        /*console.log("Questo?"+Utente_Eliminato.Utete_Eliminato)*/
        this.RispostaCerca="Hai eliminato: "+Utente_Eliminato.Utete_Eliminato);//top
    }
  }
//----------------------------------------------------------------------------
Cerca(NomeUtente:string)
  {
    if(NomeUtente.length===0)
    {
      this.RispostaCerca=" <--- Devi inserire il nome per eliminare O cercare!!"
    }
    else
    {
      let prova:any;
      prova=this.service.CercaUtente(NomeUtente);
      this.RispostaCerca=String(prova);
    }
  }
//----------------------------------------------------------------------------
}
