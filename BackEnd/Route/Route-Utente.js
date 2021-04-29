const connection = require('../DBMS/ConnessioneDB');
const express = require('express');
const router = express.Router()
router.use(express.json());
var FormData = require('form-data');
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//seleziona tutte le persone
router.get('/TutteCanzoni',(req,res)=>
{
    try
    {
        let sql ='select * from tab_canzoni';
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
        console.log("Errore in rest: /TutteCanzoni: "+Error);
    }
});
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

module.exports=router;