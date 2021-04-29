import { Component, OnInit } from '@angular/core';
import { TabCredenzialiService } from './tab-credenziali.service';
import { Utenti } from './Utenti';

@Component({
  selector: 'app-tab-credenziali',
  templateUrl: './tab-credenziali.component.html',
  styleUrls: ['./tab-credenziali.component.css']
})

export class TabCredenzialiComponent implements OnInit 
{
  public ArrayUtente: Utenti[] = [];
  public RisultatoRicerca:string;

  constructor(private service: TabCredenzialiService) 
  { 
    this.RisultatoRicerca = "";

  }
  ngOnInit(): void { this.Elenco();}
//---------------------------------------------------------------------------------------------------------
  Elenco()
  {
    let i:Number;
    this.service.TuttoElenco()
    .subscribe(data => this.ArrayUtente = data);
    
    //console.log("Lunghezza Array? "+this.ArrayUtente.length);
    if (this.ArrayUtente.length===0)
    {
      //NON CI SONO UTENTI!!!!
    }
    else
    {
      for (let entry of this.ArrayUtente) 
      {
        console.log(entry);
      }
    }
  }
  //---------------------------------------------------------------------------------------------------------
  Aggiungi(NomeUtente:string,PasswordUtente:string)
  {
    if(NomeUtente.length===0 || PasswordUtente.length===0)
    {
      //errrore
      console.log("Errore devi scrivere nome e password");
    }
    else
    {
      NomeUtente=NomeUtente.toLowerCase();
      PasswordUtente=PasswordUtente.toLowerCase();
     this.service.InserisciUtente(NomeUtente,PasswordUtente); //rattoppato con await e sopra con async perchè non mi refreshava più..
      this.Elenco();
    }
   
  }
//---------------------------------------------------------------------------------------------------------
  Elimina(NomeUtente:string)
  {
    if(NomeUtente.length===0)
    {
      console.log("Inserisci il nome da eliminare!");
    }
    else
    {
      NomeUtente=NomeUtente.toLowerCase();
      this.service.EliminaUtente(NomeUtente).subscribe //rattoppato con await e sopra con async perchè non mi refreshava più..
      (
        result => alert("Fatto, "+result), //object object
        err => console.error("Che cosa è? "+err)
      );
      this.Elenco();
    }
  }
//---------------------------------------------------------------------------------------------------------
  Cerca(NomeUtente:string)
  {
    if(NomeUtente.length===0)
    {
      console.log("Inserisci il nome da CERCARE!");
    }
    else
    {
      NomeUtente=NomeUtente.toLowerCase();
      
      this.service.CercaUtente(NomeUtente).subscribe
      (
        result => alert("Fatto, "+result), //object object
        err => console.error("Che cosa è? "+err)
      );
      
    }
  }
//---------------------------------------------------------------------------------------------------------
Login(NomeUtente:string,PasswordUtente:string)
{
  console.log(""+NomeUtente);
  console.log(""+PasswordUtente);
  
  if(NomeUtente.length===0 || PasswordUtente.length===0)
  {
    //errrore
    console.log("Errore devi scrivere nome e password");
  }
  else
  {
    NomeUtente=NomeUtente.toLowerCase();
    PasswordUtente=PasswordUtente.toLowerCase();
   this.service.LoginPassword(NomeUtente,PasswordUtente); //rattoppato con await e sopra con async perchè non mi refreshava più..   
  }
}
//---------------------------------------------------------------------------------------------------------
}
