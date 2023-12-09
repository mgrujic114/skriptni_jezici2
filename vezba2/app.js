const express = require('express');
const path = require('path');
const BP = require('body-parser');
const Joi = require('joi');
const fs = require('fs');

const app = express();

app.use(express.static(path.join(__dirname, 'static')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'static', '11422rn.html'));
    }
);

app.use('/nova-usluga', BP.urlencoded({extended: false}));

app.post("/nova-usluga", (req, res) => {

    //res.send(req.body);
    const shema = Joi.object().keys({
        naziv: Joi.string().trim().min(5).max(25).required(),
        opis: Joi.string().trim().min(1).required(),
        kategorija: Joi.string().required(),
        cena: Joi.number().greater(0).required()
        //tu
        }
    );

    const {error, succ} = shema.validate(req.body);
        if(error){
            res.send("Greska: " + error.details[0].message);
	        return;
        } else {
            //res.send("Poruka je poslata, očekujte odgovor");
            req.body.opis.replace(/\r?\n|\r/g, '<br>');
            fs.appendFile("usluga.txt", JSON.stringify(req.body) + "\n", 
                function(err, succ){
                    res.send("Poruka je poslata, očekujte odgovor uskoro");
                }
            );
        }  
    }
);

app.get("/usluga", (req, res) => {
    const usluge = [];
    fs.readFile('usluga.txt', 'utf8', (err, data) => {
        if (err) {
          console.error('Error reading file:', err);
          res.status(500).send({ error: "Greška" });
          return;
        } else {
            const redovi = data.split('\n');
            for(let i=0; i<redovi.length-1; i++){
                let obj = JSON.parse( redovi[i] );
                usluge.push(obj);
            }
            res.json(usluge);
        }
        }
    );
    }
);


app.use('/nova-kategorija', BP.urlencoded({extended: false}));

app.post("/nova-kategorija", (req, res) => {

    //res.send(req.body);
    const shema = Joi.object().keys({
        naziv: Joi.string().trim().min(5).max(25).required(),
        opis: Joi.string().trim().min(1).required(),
        koeficijent: Joi.number().greater(0).required()
        //tu
        }
    );

    const {error, succ} = shema.validate(req.body);
        if(error){
            res.send("Greska: " + error.details[0].message);
	        return;
        } else {
            //res.send("Poruka je poslata, očekujte odgovor");
            req.body.opis.replace(/\r?\n|\r/g, '<br>');
            fs.appendFile("kategorija.txt", JSON.stringify(req.body) + "\n", 
                function(err, succ){
                    res.send("Poruka je poslata, očekujte odgovor uskoro");
                }
            );
        }  
    }
);

app.get("/kategorija", (req, res) => {
    const kategorije = [];
    fs.readFile('kategorija.txt', 'utf8', (err, data) => {
        if (err) {
          console.error('Error reading file:', err);
          res.status(500).send({ error: "Greška" });
          return;
        } else {
            const redovi = data.split('\n');
            for(let i=0; i<redovi.length-1; i++){
                let obj = JSON.parse( redovi[i] );
                kategorije.push(obj);
            }
            res.json(kategorije);
        }
        }
    );
    }
);

app.use('/nova-opcija', BP.urlencoded({extended: false}));

app.post("/nova-opcija", (req, res) => {

    //res.send(req.body);
    const shema = Joi.object().keys({
        naziv: Joi.string().trim().min(5).max(25).required(),
        opis: Joi.string().trim().min(1).required(),
        cena: Joi.number().greater(0).required(),
        kategorija: Joi.string().required(),
        //tu
        }
    );

    const {error, succ} = shema.validate(req.body);
        if(error){
            res.send("Greska: " + error.details[0].message);
	        return;
        } else {
            //res.send("Poruka je poslata, očekujte odgovor");
            req.body.opis.replace(/\r?\n|\r/g, '<br>');
            fs.appendFile("opcija.txt", JSON.stringify(req.body) + "\n", 
                function(err, succ){
                    res.send("Poruka je poslata, očekujte odgovor uskoro");
                }
            );
        }  
    }
);      

app.get("/opcija", (req, res) => {
    const opcije = [];
    fs.readFile('opcija.txt', 'utf8', (err, data) => {
        if (err) {
          console.error('Error reading file:', err);
          res.status(500).send({ error: "Greška" });
          return;
        } else {
            const redovi = data.split('\n');
            for(let i=0; i<redovi.length-1; i++){
                let obj = JSON.parse( redovi[i] );
                opcije.push(obj);
            }
            res.json(opcije);
        }
        }
    );
    }
);

app.listen(8000, ()=>{
    console.log("server startovan na portu 8000");
    }
);

