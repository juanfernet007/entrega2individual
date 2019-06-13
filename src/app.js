const {crearCurso,actualizarCurso,eliminarCurso} = require ('./funciones.js');
const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const bodyParser = require('body-parser');
require('./helpers');

const directorioPublico = path.join(__dirname,'../public');
const directorioPartials = path.join(__dirname,'../partials');
app.use(express.static(directorioPublico));
hbs.registerPartials(directorioPartials);
app.use(bodyParser.urlencoded({extended : false}));

app.set('view engine','hbs');

app.get('/',(req, res) => {
     res.render('index');
});

app.get('/cursos.hbs',(req, res) => {
    res.render('cursos');
});

app.post('/cursos/guardar',(req, res) => {    
    let curso = {
        id: parseInt(req.body.id), 
        nombre:    req.body.nombre, 
        descripcion:   req.body.descripcion, 
        valor: req.body.valor, 
        modalidad: req.body.modalidad, 
        duracion:  req.body.duracion, 
        activo: 1        
        };
    
    try {
        crearCurso(curso);   
        res.render('cursos'); 
    } catch (error) {    
        res.render('cursos', {mensaje: "<div class='alert alert-danger' role='alert'>"+error+"</div>"} );    
    }            

});

app.post('/cursos/actualizarCurso', (req, res) => {   
    let curso = {
        id: parseInt(req.body.id_actualizar), 
        nombre:    req.body.nombre_actualizar, 
        descripcion:   req.body.descripcion_actualizar, 
        valor: req.body.valor_actualizar, 
        modalidad: req.body.modalidad_actualizar, 
        duracion:  req.body.duracion_actualizar, 
        activo: parseInt(req.body.activo_actualizar)
        };        
    actualizarCurso(curso);    
    res.render('cursos');
});

app.post('/cursos/eliminarCurso', (req, res) => {                   
    eliminarCurso(parseInt(req.body.id_curso_eliminar));
    res.render('cursos');
});




        


app.listen(3000,() =>{
    console.log('Escuchando en el puerto 3000');
}); 