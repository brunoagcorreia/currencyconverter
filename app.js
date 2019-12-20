// import Modul: Webserver (Express), POST encoder (body-parser)
const express = require("express");
const bodyParser = require("body-parser");
let models = require("./models");

// Webserver inistialisieren
let app = express();



// benutze die Funktion JSON & URLencoder von body-parser, 
// um POST Daten auszulesen und in eine JSON Objekt umzuwandeln
app.use(bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

models.Person.sync({force: false}).then(function() {
    console.log("Tabelle wurde erstellt");

});
// Benutze EJS Interpreter um JS in 
// HTML File Serverseitig zu verarbeiten
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

// Routing: definiert das Weiterleiten bzw. Aktion
// beim Aufruf einer bestimmen URL 
// .get - bei Aufruf der GET Methode
// .post - bei Aufruf der POST Methode
app.get('/', function(req, res){
    res.send("Hallo");
});

// Weiterleitung auf die Registierungsseite (eingabe.ejs)
app.get('/eingabe', function(req, res){
    res.render("eingabe");
});

// Aufruf durch Registierungsformular - Daten in Tabelle einfügen
app.post('/db_input', function(req, res){
    console.log(req.body);
    console.log(models.sequelize);
    models.Person.create({			// Eintrag in Tabelle einfügen
        vorname: req.body.vorname,
        nachname: req.body.nachname
        })

   res.redirect("/db_output");
//    res.send("In Tabelle eingefügt!");
});

// Unterschiedliches Routing für get und post Funktion
app.get('/db_input', (req, res) =>{
    res.send("db_input GET Seite!");
});


// Abruf eines Datensatzes - Beispiel mit id=1
app.get('/db_output', function(req, res){
    models.Person.findAll({
        where: {
            id: 1
        }
    }).then(function(obj){
        console.log(obj[0].dataValues.vorname)
        res.render("ausgabe", {person: obj[0].dataValues});
    });
})

// Aktualisieren des Datensatzes mit der id=1
app.post('/db_update', function(req, res){
    let test = { vorname: 'Hans'} 
    models.Person.update(test, {
        where: {
            id: 1
        }
    })
})

// loeschen des Datensatz mit der id=3
app.get('/db_delete', function(req, res){
    models.destroy({
        where: {
            id: 3
        }
    })
})

// Server wartet (hoert) auf Anfrage auf Port 8080
app.listen(8080);