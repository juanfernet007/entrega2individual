// const {estudiante,curso,matricula} = require ('./entidades.js');
const fs = require ('fs');

listaCursos = [];

const crearCurso = (curso) => {
    listarCursos();
    let cur = {
        id : curso.id, 
        nombre : curso.nombre,
        descripcion : curso.descripcion, 
        valor : curso.valor,
        modalidad : curso.modalidad, 
        duracion : curso.duracion, 
        activo : curso.activo
    };

    let duplicado = listaCursos.find(elemento => elemento.id == curso.id);    
    if(!duplicado){
        listaCursos.push(cur);
        guardarCursos();
    } else
       throw 'Ya existe otro curso con ese identificador';
}

const listarCursos = () => {
    try {
        listaCursos = require('./archivoCursos.json');
    } catch (error) {
        listaCursos = [];
    }
}

const guardarCursos =() => {
    let datos = JSON.stringify(listaCursos);
    fs.writeFile('src/archivoCursos.json', datos, (err) => {
        if(err) throw (err);
        console.log('Se ha hecho el registro');
    }) 
}

const actualizarCurso = (curso) => {
    listarCursos();
    let cur = {
        id : curso.id, 
        nombre : curso.nombre,
        descripcion : curso.descripcion, 
        valor : curso.valor,
        modalidad : curso.modalidad, 
        duracion : curso.duracion, 
        activo : curso.activo
    };

    let encontrado = listaCursos.find(elemento => elemento.id == curso.id);    
    if(encontrado) {
        listaCursos = listaCursos.filter(element =>  element != encontrado )   
        listaCursos.push(cur);
        guardarCursos();
    } else
      throw 'No se encontró el identificador del curso para actualizar';
}


const eliminarCurso = (id) => {
    listarCursos();    
    let encontrado = listaCursos.find(elemento => elemento.id == id);
    console.log(id);
    if(encontrado) {
        listaCursos = listaCursos.filter(element =>  element != encontrado )   
        guardarCursos();
    } else
    throw 'No se encontró el identificador del curso para eliminar';
}



module.exports = {
    crearCurso,
    actualizarCurso,
    eliminarCurso    
}