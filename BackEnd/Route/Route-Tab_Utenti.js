const connection = require('../DBMS/ConnessioneDB');
const express = require('express');
const router = express.Router()
router.use(express.json());

//seleziona tutte le persone
router.get('/utenti',(req,res)=>{ //req e res sono i due oggetti request e response del protocollo http.
  let sql ='select * from tab_utenti';
  let query = connection.query(sql,(err,result)=>
  {
    res.setHeader('Content-Type', 'application/json');//setto l'header del json? ma quelle sono parole chiavi!
      if(err) {res.status(500).send(JSON.stringify({"Errore": err }));} 
      else
      {
       res.json(result); //così res mi serializza l'oggetto automaticamente in json.
       //res.send(JSON.stringify(result)); //il formato json è gia un formato dove all'interno del suo body contiene solo stringhe.
       //res.send è il metodo più a basso livello per spedire le response (posso scegliere anche il numero dello stato).
       //se faccio res.send() lui mi spedisce il file ma se dentro le () metto JSON.stringify(qualcosa) lui mi trasforma quel qualcosa come stringa/nel corpo di un json e me lo rispedisce indietro con send.
       //se faccio res.json(qualcosa), angular già mi trasforma quel "qualcosa" in json e posso evitare di trasformarlo io scrivendo stringify.
      }
  });
});

//seleziona una persona per id:
router.get('/utenti/:NomeUtente',(req,res)=>{
    connection.query('SELECT NomeUtente,EmailUtente FROM tab_utenti where NomeUtente = ?',[req.params.NomeUtente],(err,row,result)=>{
    if(!err)
    {
      //console.log(row[0].NomeUtente); //mi stampa il nome utente del primo e unico [0] record trovato.
      //console.log(row[0].NomeUtente.typeof); //ma è di tipo undefined!
        //console.log(result); //Mi stampa i dettagli dei campi
        //res.status(500).send(JSON.stringify({"Utente non trovato":" "})); //nel caso non trova niente!
      //res.json(row); //row mi invia tutta la riga della tabella mysql. row è in formato json.
      //questo sotto mi restituisce un json stringa contenente:
      res.status(201).send(JSON.stringify({"Trovato":row[0].NomeUtente+" / "+ row[0].EmailUtente }));
    }
    else {res.status(500).send(JSON.stringify({"Errore": err }));}
    });
});


router.post('/inserisciutente',(req, res)=> 
{
   let Nome=req.body.nomeUt;
   let Email=req.body.emailUt;
  
    let sql = `INSERT INTO tab_utenti (NomeUtente, EmailUtente)
            VALUES(?, ?)`;
    connection.query(sql, [Nome , Email], (err, result) =>
    { //con stringify trasformo il json in stringa ma è sempre un json (però dentro è formato da stringhe)!!
      if (err) {res.status(500).send(JSON.stringify({"Errore":err }));} 
      else {res.status(201).send(JSON.stringify({"Utente_inserito":Nome+" : "+ Email }));}
      
    });
});

//route for delete data
router.delete('/eliminautente/:NomeUt',(req, res) => {
  let Nome=req.params.NomeUt;
  let sql = `DELETE FROM tab_utenti WHERE NomeUtente=?`;
  let query = connection.query(sql,[Nome], (err, results) => {
    if(err) throw err;
    else
    {res.status(201).send(JSON.stringify({"Utente_Eliminato":Nome}));}
  });
});

module.exports=router;