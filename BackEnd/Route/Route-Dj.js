const connection = require('../DBMS/ConnessioneDB');
const express = require('express');
const { json } = require('body-parser');
const router = express.Router()
router.use(express.json());
var multer = require('multer');  //per caricare la formData da angular
var upload = multer(); //per caricare la formData da angular

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
router.get('/Episodio/:NomeEpisodio',(req,res)=>
 {
    let NomeEpisodio=req.params.NomeEpisodio;
    console.log("Estrapolo l'episodio: "+ NomeEpisodio);
    (CercaEpisodio(NomeEpisodio,(function(RisultatoFunzione)
    {
        if(RisultatoFunzione)
        {
            console.log("Episodio presente!")
            //POSSO CONTINUARE A ESTRARLO!--------------------------------------------------------------------------------------------------------------
            try
            {
            connection.query('SELECT IdEpisodio,NomeEpisodio FROM tab_episodi where NomeEpisodio = ?',NomeEpisodio,(err,row,result)=>
            {
              if(!err)
              {
                res.json("IdEpisodio:"+row[0].IdEpisodio+"NomeEpisodio: "+row[0].NomeEpisodio); 
              }
              else 
              { //Errore in generale:
                res.json("Errore nella query /Episodio/:NomeEpisodio :"+err );
              }
            });
          }
          catch(err)
          {
            console.log("Errore"+err);
            res.status(500).send(JSON.stringify({"Errore": err }));
          }
          //------------------------------------------------------------------------------------------------------------------------------------------
        }
        else
        {
            res.json("Episodio non presente!!!");
        }
    })));
 });
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
router.get('/Episodi',(req,res)=>
{
    (CercaEpisodi(function(RisultatoFunzione)
    {
        if(RisultatoFunzione)
        {
            //console.log("Ci sono degli episodi");
            //POSSO ESTRARLI!----------------------------------------------------------------------------------------------------------------------------------
            try
            {
              let sql ='select * from tab_episodi';
              let query = connection.query(sql,(err,result)=>
              {
                res.setHeader('Content-Type', 'application/json');//setto l'header del json? ma quelle sono parole chiavi!
                if(err) {res.status(500).send(JSON.stringify({"Errore": err }));} 
                else
                {
                 res.json(result); //così res mi serializza l'oggetto automaticamente in json.
                }
              });
            }
            catch(error)
            {
              console.log("Errore estrapolazione /Episodi "+error);
            }
            //-------------------------------------------------------------------------------------------------------------------------------------------------
        }
        else
        {
            res.json("Non ci sono ancora episodi!");
        }
    }));
});
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------      
router.post('/inserisciEpisodio',function (req, res)
{
    let NomeEpisodio=req.body.nomeEpisodio;
    (CercaEpisodio(NomeEpisodio,(function(RisultatoFunzione)
    {
        if(RisultatoFunzione)
        {
            res.json("Episodio già presente!")
        }
        else
        {
            console.log("Episodio non presente, posso inserirlo!");
            //INSERISCI EPISODIO!!!-----------------------------------------------------------------------------------------------------------------------------------------------
            try
            {
            let sql = `INSERT INTO tab_episodi (NomeEpisodio) VALUES(?)`;
            connection.query(sql, [NomeEpisodio], (err, result,response) =>
            { //con stringify trasformo il json in stringa ma è sempre un json (però dentro è formato da stringhe)!!
              if (err) {res.status(500).send(JSON.stringify({"Errore":err }));} 
              else {res.json("Episodio inserito!");}
            });
            }
            catch(error)
            {
              console.log("Errore inserimento episodio /inserisciEpisodio "+error);
            }
            //--------------------------------------------------------------------------------------------------------------------------------------------------------------------
        }
    })));
});
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
function CercaEpisodio(NomeEpisodio,callback)
{//tutte le funzioni che lavorano con mysql sono delle callback.
    try //quindi aposto dei return ci vanno le "callback".
    {
        connection.query('SELECT COUNT(NomeEpisodio)as Contatore FROM tab_episodi where NomeEpisodio = ?',NomeEpisodio,(err,row,result)=>
        {
          //console.log("row "+row[0].Contatore);
          if(row[0].Contatore>0)
          {
            console.log("funzione CercaEpisodioEpisodio: TROVATO!!!!")
            callback(true);
          }
          else
          {
            console.log("funzione CercaEpisodioEpisodio: NON TROVATO!!!");
            callback(false);
          }
        });
      }
      catch(err)
      {
        console.log("Errore ricerca"+err);
        callback(false);
      }
}
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
function CercaEpisodi(callback)
{//tutte le funzioni che lavorano con mysql sono delle callback.
    try //quindi aposto dei return ci vanno le "callback".
    {
        connection.query('SELECT COUNT(NomeEpisodio)as Contatore FROM tab_episodi',(err,row,result)=>
        {
          //console.log("row "+row[0].Contatore);
          if(row[0].Contatore>0)
          {
            console.log("Funzione Cerca Episodi: Ci sono degli Episodi!!")
            callback(true);
          }
          else
          {
            console.log("Funzione Cerca Episodi: NON ci sono degli Episodi!!");
            callback(false);
          }
        });
      }
      catch(err)
      {
        console.log("Errore ricerca"+err);
        callback(false);
      }
      //return false;
}
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
router.delete('/EliminaEpisodio/:NomeEpisodio', function (req, res)  
{
    let NomeEpisodioDaEliminare=req.params.NomeEpisodio; //il tipo di dato è string e è il giusto NomeEpisodio (niente di strano).
    (IntegritaReferenzialeEpisodi(NomeEpisodioDaEliminare,(function(RisultatoFunzione) //cerco se ha occorrenze nella tabella tab_canzoni perchè è un integrità referenziale (nodejs crasha).
    {
      if(RisultatoFunzione) //se ha occorrenze in tab_canzoni non posso eliminarlo (perchè se no nodejs crasha).
      {
        console.log("Non posso eliminare, ha Integrità ref!!!");
        res.json("Non posso eliminare quell'episodio perchè ha delle canzoni.");
      }
      else  //non ha occorrenze, ma prima di eliminarlo cerco se effettivamente l'episodio esiste veramente in tab_episodi (perchè se no nodejs crasha).
      {
        (CercaEpisodio(NomeEpisodioDaEliminare,(function(RisultatoFunzione)
          {
            if(RisultatoFunzione) //se lo trovo in tabella tab_episodi posso cancellarlo.
            {
              console.log("Episodio già presente! Posso Eliminarlo!")
              //ELIMINALO---------------------------------------------------------------------------------------------------------------------------------------------
              try
              {
                connection.query(`DELETE FROM tab_episodi WHERE NomeEpisodio=?`, [NomeEpisodioDaEliminare],
                function (error) 
                 {
                  if (error) {console.log(error); throw error; }
                  else {res.json("Episodio eliminato!");}
                 });
              }
              catch(error)
              {
                console.log("Errore nell' eliminazione dell'episodio /EliminaEpisodio"+error);
              }
            //-------------------------------------------------------------------------------------------------------------------------------------------------------
            }
            else //Se non lo trovo in tabella tab_episodi non lo posso cancellare.
            {
              res.json("Episodio non presente, Non posso eliminarlo!");
            }
          })));
        }
      })));
});
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------  
function InviaEmailPubblicità()
 {//tutte le funzioni che lavorano con mysql sono delle callback.
    
   
 }
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------   
router.post('/inserisciCanzone',upload.fields([]),function (req, res)
{
  let Vocale=req.body.Vocale;
  let LinkYouTube=req.body.LinkYouTube;
  let NomeEpisodio=req.body.NomeEpisodio;

  (CercaCanzone(LinkYouTube,(function(RisultatoFunzione) //ho messo UNIQUE in tab_canzoni.LinkYouTube perchè ho sbagliato a progettarlo!
  {
    if(RisultatoFunzione) //quindi cerco se effettivamente c'è quella canzone già registrata nella tabella, se la trovo:
    {
      res.json("Purtroppo non puoi inserire la stessa canzone \n(lo stesso link youtube) più di una volta! \n anche in episodi differenti!");
    }
    else
    {  //SE NON TROVO LA CANZONE (lo stesso link youtube) allora.....
    //---------------------------------------------------------------------------------------------------------
      (CercaEpisodio(NomeEpisodio,(function(RisultatoFunzione) //vedo se in tab_episodio esiste veramente l'episodio.
      {
        if(RisultatoFunzione) //se trova l'episodio in tab_episodi:
        {
            console.log("Episodio valido: presente in tab_episodi!");
            (EstrapolaIdDaEpisodio(NomeEpisodio,(async function(RisultatoFunzione) // allora estrapolo l'id dell'episodio.
            { 
              let IdEpisodio=RisultatoFunzione; //questo è l'id dell'espisodio.
              //---------------------------------------------------------------------------------------------------
              try   //ATTENZIONE: devo fare i controlli sull'url del video da frontend.
              { 
                checkValueLoad = await new Promise((resolve, reject) => 
                {
                  return connection.query("Insert into tab_canzoni(Vocale,LinkYouTube,Episodio_ID) values( ? , ? ,?); ", [Buffer.from(Vocale),LinkYouTube,IdEpisodio], function(err, results)
                  {
                    if (err) 
                    {
                      console.log("Errore INSERIMENTO CANZONE!! " + err);
                    }
                    else {res.json("Canzone inserita!");}
                    resolve(true);
                  });
                });
              }
              catch(error)
              {
                console.log("Errore inserimento canzone /inserisciCanzone "+error);
              }
              /*------------------------INSERISCO LA CANZONE-------------------------------------------------------
              try   //ATTENZIONE: devo fare i controlli sull'url del video da frontend.
              { 
                let sql = `INSERT INTO tab_canzoni (Vocale,LinkYouTube,Episodio_ID) VALUES(?,?,?)`;
                connection.query(sql, [Vocale,LinkYouTube,IdEpisodio], (err, result,response) =>
                { //con stringify trasformo il json in stringa ma è sempre un json (però dentro è formato da stringhe)!!
                  if (err) {res.status(500).send(JSON.stringify({"Errore":err }));} 
                  else {res.json("Canzone inserita!");}
                });
              }
              catch(error)
              {
                console.log("Errore inserimento canzone /inserisciCanzone "+error);
              }
              //-------------------------------------------------------------------------------------------------*/
            })));
        }
        else //se non trova l'episodio in tab_episodi:
        {
            res.json("Episodio NON valido. Non Presente in tab_episodi!");
        }
      })));    
    //---------------------------------------------------------------------------------------------------------
    }
  }))) 
}); /*Fine chiamata rest*/
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------   
router.delete('/eliminaCanzone/:LinkYouTube',function (req, res)
{
  let LinkYouTube=req.params.LinkYouTube;
  
  (CercaCanzone(LinkYouTube,(function(RisultatoFunzione)
  {
    if(RisultatoFunzione)
    {
      //res.json("Canzone già presente! Posso eliminarla!!");
      try
      {
        //-------------------------------------------------------
        connection.query(`DELETE FROM tab_canzoni WHERE LinkYouTube=?`, [LinkYouTube],
        function (error) 
         {
          if (error) {console.log(error); throw error; }
          else {res.json("Canzone eliminata!");}
         });
        //-------------------------------------------------------
      }
      catch(error)
      {
        console.log("Errore in /eliminaCanzone/:LinkYouTube: "+error);
      }
    }
    else
    {
      res.json("Canzone non presente, non posso eliminarla!");
    }
  })));
});
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------   
function CercaCanzone(LinkYouTube,callback) //PER LINKYOUTUBE /*Funzione che restituisce true trova (in tab_canzoni) una canzone passata come argomento.*/
{
    try
    {
        connection.query('SELECT COUNT(LinkYouTube)as Contatore FROM tab_canzoni where LinkYouTube = ?',LinkYouTube,(err,row,result)=>
        {
          //console.log("row "+row[0].Contatore);
          if(row[0].Contatore>0)
          {
            console.log("Funzione CercaCanzone: TROVATA!!!!")
            callback(true);
          }
          else
          {
            console.log("Funzione CercaCanzone: NON TROVATA!!!");
            callback(false);
          }
        });
      }
      catch(err)
      {
        console.log("Errore in Funzione: CercaCanzone\n"+err);
        callback(false);
      }
}
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------   
function IntegritaReferenzialeEpisodi(NomeEpisodio, callback) 
{
  try 
  {
    connection.query("SELECT COUNT(tab_canzoni.Episodio_Id) as 'Contatore' FROM tab_canzoni, tab_episodi WHERE tab_episodi.NomeEpisodio= ? and tab_episodi.IdEpisodio = tab_canzoni.Episodio_ID",NomeEpisodio,(err,row,result)=>
        {
          //console.log("Quante volte lo trova?: "+row[0].Contatore);
          if(row[0].Contatore>0)
          { 
            console.log("Ricerca in tab_canzoni per integrità referenziale. Lo ha trovato!!");
            return callback (true);
          }
          else
          {
            console.log("Ricerca in tab_canzoni per integrità referenziale. NON Lo ha trovato!!");
            return callback (false);
          }
        });
  }
  catch(error)
  {
    console.log(error);
  }
}
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------   
function EstrapolaIdDaEpisodio(NomeEpisodio,callback)
{
  try 
  {
    connection.query("SELECT IdEpisodio as 'ID' FROM tab_episodi WHERE tab_episodi.NomeEpisodio= ?",NomeEpisodio,(err,row,result)=>
    {
      console.log("Ricerca in tab_episodio. "+ NomeEpisodio+ "+ Lo ha trovato: "+row[0].ID);
      return callback (row[0].ID);
    });
  }
  catch(error)
  {
    console.log("Errore in function EstrapolaIdDaEpisodio: "+error);
  }
}
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------   
module.exports=router;