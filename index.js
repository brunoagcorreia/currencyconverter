
const express = require("express");
const bodyParser = require("body-parser");
const convertionApi = "https://api.exchangerate-api.com/v4/latest/"
const https = require("https");
const fetch = require("node-fetch")

let app = express();
let amountToConvert;

app.use(bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");


app.get('/index', function(req, res){
  res.render("index");
});

// Aufruf durch Registierungsformular - Daten in Tabelle einfügen
app.post('/input', function(req, res){
  console.log(req.body.from_curr);
  amountToConvert = req.body.amount
  console.log(amountToConvert);
  let currencyToConvert = convertionApi + req.body.from_curr
  let toCurr = req.body.to_curr;
  fetch(currencyToConvert)
  .then(res => res.json())
  .then( data => {
    // console.log(amountToConvert * data.rates.USD)
    console.log(toCurr)
    // let erg = amountToConvert * data.rates.toCurr
    let erg = amountToConvert * data.rates.USD

    // console.log(erg)
    res.render('index', { erg: erg })
  })
});


app.get('/output', function(req, res){
    
  
  
})

// // Aktualisieren des Datensatzes mit der id=1
// app.post('/db_update', function(req, res){
//     let test = { vorname: 'Hans'} 
//     models.Person.update(test, {
//         where: {
//             id: 1
//         }
//     })
// })

// // loeschen des Datensatz mit der id=3
// app.get('/db_delete', function(req, res){
//     models.destroy({
//         where: {
//             id: 3
//         }
//     })
// })

// Server wartet (hoert) auf Anfrage auf Port 8080
app.listen(8080);