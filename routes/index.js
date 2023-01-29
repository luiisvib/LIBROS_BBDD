var express = require('express');
var router = express.Router();
var datosjson = require("../datos.json")

const { v4: uuidv4 } = require('uuid');
const fs = require('fs')

/* GET home page. */
router.get('/', function(req, res, next) { 

  fs.readFile('datos.txt', (error, respuesta) => {
    if (error){
      console.log(error) 
    }
    else{
      var datosString = respuesta.toString()
      datos = JSON.parse(datosString)
      datosjson = datos
      res.render('index', { datos: datos, title: "NodeBooks" });
    }
  })
  
});

router.get('/addBooks', function(req, res, next) {
  res.render('addBooks', { title: "NodeBooks" });
});

router.post("/addBooks",  function(req, res, next) {
  const {nombre, imagen, descripcion} = req.body
  let idUnico = uuidv4();
  datosjson.push({
    id: idUnico,
    nombre: nombre,
    imagen: imagen,
    descripcion: descripcion
  })
  console.log(datosjson)
  var datos_txt = JSON.stringify(datosjson)
  console.log(datos_txt)

  fs.writeFile('datos.txt', datos_txt, error => {
    if (error){
      console.log(error) 
    }
    else{
      console.log('El archivo fue creado') 
    }
  })
  res.redirect("/")
});

module.exports = router;
