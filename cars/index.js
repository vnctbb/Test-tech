'use strict'

// appel du module express
const express = require('express');
const app = express();
const fs = require('fs');

// déclaration du module de template
app.set('view engine', 'pug');

// chemin pour les fichiers statiques
app.use('/styles', express.static(__dirname + '/public/src/css'));
app.use('/scripts', express.static(__dirname + '/public/src/js'));
app.use('/img',express.static(__dirname + '/public/img'));

// récupération du fichier json
const buffer = fs.readFileSync('./public/src/json/cars.json');
const file = JSON.parse(buffer);

// constante 'brand' pour contenir les différentes marque de voiture
// valeurs push par une boucle forEach
const brands = [];

file.forEach(voiture => {
  if(brands.indexOf(voiture.marque) < 0){
    brands.push(voiture.marque)
  }
});

// route d'arrivé sur le site
app.get('/', (req, res) => {
  res.render('index', {cars: file, brands: brands});
});

// route pour obtenir la fiche d'une voiture en particulier
app.get('/cars/:un', (req, res) => {
  file.forEach((car, index) => {
    if(car.name === req.params.un){
      res.render('car', {cars: file, car: file[index], brands: brands})
    }
  });
});

// route pour obtenir les voitures d'une marque
app.get('/brands/:un', (req, res) => {
  const datas = [];
  brands.forEach((brand) => {
    if(brand === req.params.un){
      file.forEach(car => {
        if(brand === car.marque){
          datas.push(car);
        }
      });
      res.render('brand', {brands : datas, cars : file, name : req.params.un})
    }
  });
});

// route pour obtenir les voitures d'une marque
app.get('/search', (req, res) => {
  const regex = new RegExp(req.query.search, 'i')
  const datas = [];
  file.forEach((car, index) => {
    for(const prop in car){
      if(regex.test(car[prop])){
        datas.push(car);
        break;
      }
    };
  });
  res.render('brand', {brands : datas, cars : file, name : 'Recherche'})
});

// route erreur 404
app.use( (req, res) => {
  res.status(404).render('404');
});

// déclaration du port d'écoute
app.listen(8080, () => {
  console.log(`App démarré sur le port 8080, à l'adresse http://localhost:8080`)
});
