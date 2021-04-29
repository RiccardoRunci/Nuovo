const connection = require('../DBMS/ConnessioneDB');
const express = require('express');
const router = express.Router()
router.use(express.json());
const bcrypt= require ('bcrypt');
var jwt = require('jsonwebtoken');
//---------------------------------------------------------------------------------------------------------------------------------
router.post('/registraUtente',function (req, res)
{
   let Email=req.body.emailUt;
   let Password=req.body.passwordUt;
          //uso questa funzione callback!
   trovato=(CercaUtente(Email,async function(RisultatoFunzione) 
   {
     if(RisultatoFunzione)
     {
      res.json("Utente già presente!!!");
     }
     else
     {
        try
        {
         const salt=await bcrypt.genSalt(10);
         const hashPassword= await bcrypt.hash(Password,salt);

         let sql = `INSERT INTO tabutenti (EmailUtente, PasswordUtente) VALUES(?, ?)`;
        connection.query(sql, [Email , hashPassword], (err, result,response) =>
        { //con stringify trasformo il json in stringa ma è sempre un json (però dentro è formato da stringhe)!!
          if (err) {res.status(500).send(JSON.stringify({"Errore":err }));} 
          else {res.json("Utente inserito!");}
        });
        }
        catch(error)
        {
          console.log("Errore inserimento:"+error);
        }
      }
   }));

});
//---------------------------------------------------------------------------------------------------------------------------------
function CercaUtente(Email,callback)
 {//tutte le funzioni che lavorano con mysql sono delle callback.
  try //quindi aposto dei return ci vanno le "callback".
  {
    connection.query('SELECT COUNT(EmailUtente)as Contatore FROM tabutenti where EmailUtente = ?',Email,(err,row,result)=>
    {
      //console.log("row "+row[0].Contatore);
      if(row[0].Contatore>0)
      {
        console.log("TROVATO!!!!")
        callback(true);
      }
      else
      {
        console.log("NON TROVATO!!!");
        callback(false);
      }
    });
  }
  catch(err)
  {
    console.log("Errore ricerca"+err);
    callback(false);
  }
  return false;
}
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
router.post('/login',async function (req,res)
{
  let Email=req.body.emailUt;
  let Password=req.body.passwordUt;

  (CercaUtente(Email,function(RisultatoFunzione) //Cerco l'utente!
  {
    if(RisultatoFunzione) //se trovo l'utente
    {
      console.log("Utente trovato!!")
      CercaPassword(Email,async function(RisultatoFunzione) //cerco la password:
      {
        console.log(RisultatoFunzione);  //questa è la password!
       try
       {
        if(await bcrypt.compare(Password,RisultatoFunzione))
        {
          //console.log("Le 2 password coincidono");
          //console.log("Connesso!");
          //genero il token!!!
          //{EmailUtente:Email} è il contenuto del token(crittografato),
          //'chiaveSegreta' è la secret,
          //{expiredIn: } è il tempo di scadenza del token.
          let token=jwt.sign({EmailUtente:Email},'chiaveSegreta',{expiresIn:'2h'});
          res.status(200).json(token);
        }
        else
        {
          res.json("Password Errata!!!!");
          //console.log("Password Errata!");
        }
       }
       catch(error)
       {
          console.log("Errore Login"+error);
       }
      });
    }
    else
    {
      res.json('Utente: '+Email+" NON TROVATO!!");
    }
}));

});
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
function CercaPassword(Email,callback)
 {//tutte le funzioni che lavorano con mysql sono delle callback.
  try //quindi aposto dei return ci vanno le "callback".
  {
    connection.query('SELECT PasswordUtente FROM tabutenti where EmailUtente = ?',Email,(err,row,result)=>
    {
      //console.log("row "+row[0].Contatore);
      if(!err)
      {
        //console.log("TROVATO!!!!")
        //console.log("Password trovata:"+row[0].PasswordUtente)
        callback(row[0].PasswordUtente);
      }
    });
  }
  catch(err)
  { callback(false); }
}
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
module.exports=router;