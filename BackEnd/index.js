/*PARTE DEL BACKEND!!!*/
const connection =require('./DBMS/ConnessioneDB');
const RouteTab_Utenti = require('./Route/Route-Tab_Utenti.js');
const RouteTab_credenziali= require ('./Route/Route-Tab_Credenziali.js');
const Route_Login= require ('./Route/Route-Login.js');
const Route_Admin= require('./Route/Route-Admin.js');
const Route_AdminLogin=require('./Route/Route-LoginAdmin.js');
const Route_DjLogin=require('./Route/Route-LoginDj.js');
const Route_Dj=require('./Route/Route-Dj.js');
const Route_Utente=require('./Route/Route-Utente');
const BodyParser =require('body-parser');
const express = require('express'); 
const app = express();



const RoutePrimoC=express.Router();


const port = 8080;

app.listen(port, (req,res) => {
  console.log(`Express server listening on port ${port}`);
});
 
app.get("/", (req,res) => {
    console.log(`Route principale / `);
  });

//app.use prende tutte le richieste (get,post,delete,ecc..)
//app è l'istanza della classe express
app.use('/TabUtenti',RouteTab_Utenti);
app.use('/TabCredenziali',RouteTab_credenziali);
app.use('/LoginRegistration',Route_Login);
app.use('/Admin',Route_Admin);
app.use('/Admin-login',Route_AdminLogin);
app.use('/Dj-Login',Route_DjLogin);
app.use('/Dj-Route',Route_Dj);
app.use('/Utente',Route_Utente);

