import { Component, OnInit } from '@angular/core';
import {ProvaAdioService} from './prova-adio.service';
import { Canzoni } from './Canzoni';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-prova-adio',
  templateUrl: './prova-adio.component.html',
  styleUrls: ['./prova-adio.component.css']
})
export class ProvaAdioComponent implements OnInit 
{
  public ArrayCanzoni: Canzoni[] = [];
  public ArrayCanzoniVocali:string[]=[];
  public ArrayUrlBlob:string[]=[];
  public ArrayBlob:Blob[]=[];
  
  constructor(private service: ProvaAdioService,
              private domSanitizer: DomSanitizer) {}

  ngOnInit(): void {}
//----------------------------------------------------------------------------------
  ElencoCanzoni()
  {
    this.service.ElencoCanzoni()
    .subscribe(data => this.ArrayCanzoni = data);
    
    //console.log("Lunghezza Array? "+this.ArrayUtente.length);
    if (this.ArrayCanzoni.length===0)
    {
      //NON CI SONO CANZONI!!!!
    }
    else
    {
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
      for (let entry of this.ArrayCanzoni) 
      {
        this.ArrayCanzoniVocali.push(entry.Vocale); //copio le stringhe lunghissime blob (senza intestazione) dentro un'altro array(ArrayCanzoniVocali).
      }
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
      //quindi ArrayCanzoniVocali contiene le stringhe lunghissime dei blob: SENZA INTESTAZIONE!!!
      console.log("ArrayCanzoniVocali contiene le stringhe lunghissime dei blob: SENZA INTESTAZIONE!!!!");
      for(let i=0;i<this.ArrayCanzoniVocali.length;i++)
      {
        //console.log(this.ArrayCanzoniVocali[i]); //e lo commento perchè se no dev tools è pieno di roba.
      }

      for(let i=0;i<this.ArrayCanzoniVocali.length;i++)
      {
        this.ArrayCanzoniVocali[i]=""+this.ArrayCanzoniVocali[i]
      }
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
      /*for (let i = 0; i < this.ArrayCanzoniVocali.length; i++) //carico l'arrayblob dall'arrayCanzoniVocali appena caricato sopra.
      {
        this.ArrayBlob.push(new Blob([this.ArrayCanzoniVocali[i]], {type : 'audio/wav'})); //Carico l'ArrayBlob inserendo anche "data:audio/wav;base64," al suo inizio.
      }
      
      console.log("Stampo quello che posso stampare dell'ArrayBlob:")
      for (let i = 0; i < this.ArrayBlob.length; i++) //carico l'arrayblob dall'arrayCanzoniVocali appena caricato sopra.
      {
        console.log("ArrayBlob:"+i+" Dimensioni in byte:"+this.ArrayBlob[i].size+" Tipo del blob: "+this.ArrayBlob[i].type);
      }*/
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
      this.CreoURLArrrayBlob(); 
    }
  }
//----------------------------------------------------------------------------------
Base64ToBlob(b64Data:any, contentType :string, sliceSize :number): Blob
    {
        const byteCharacters = atob(b64Data);
        const byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize)
        {
            const slice = byteCharacters.slice(offset, offset + sliceSize);
            const byteNumbers = new Array(slice.length);

            for (let i = 0; i < slice.length; i++)
            {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }

        const blob = new Blob(byteArrays, { type: contentType });
       
        return blob;
    }
//----------------------------------------------------------------------------------
CreoURLArrrayBlob()
{
  for (let entry of this.ArrayCanzoniVocali) 
  {//Creo le url "blob:http://ecc.." per far funzionare l'oggetto Audio dell'html!!
    this.ArrayUrlBlob.push(URL.createObjectURL(entry));
  }
  console.log("URL CREATE!");

  //stampo l'arrayUrl per vedere se ho fatto bene:
console.log("QUI DOVREBBERE COMPARIRE LE URL DEI BLOB:\n");
  for (let i = 0; i < this.ArrayUrlBlob.length; i++) 
  {
    console.log(this.ArrayUrlBlob[i]);
  }
 
  /*Cambio il contenuto dell' ArrayCanzoni mettendoci il contenuto dell'arrayUrl dei blob.
  for (let i = 0; i < this.ArrayCanzoni.length; i++)
  {
    this.ArrayCanzoni[i].Vocale =this.ArrayUrlBlob[i];
    this.domSanitizer.bypassSecurityTrustUrl(this.ArrayCanzoni[i].Vocale); //questo va messo perchè oltre che non funzionare dice che ha una vulnerabilità xss
  }*/

  /*provo a fare una console log per vedere se ho fatto bene:
  for (let i = 0; i < this.ArrayCanzoni.length; i++)
  {
    console.log("Dovrebbe esserci l'url: "+this.ArrayCanzoni[i].Vocale);
  }*/

}
//----------------------------------------------------------------------------------
sanitize(url:string) //Se non ce lo metto mi dà un warnig e poi un errore, mi dice unsage url
{
    return this.domSanitizer.bypassSecurityTrustUrl(url);
}
//----------------------------------------------------------------------------------

}
