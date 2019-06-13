//const {crearCurso, actualizarCurso,listarCursos} = require ('./funciones.js');
const hbs = require('hbs');
const fs = require ('fs');

hbs.registerHelper('listarCursos', () => {

    listaCursos = JSON.parse(fs.readFileSync('src/archivoCursos.json'));
    let texto = '';
    
    listaCursos.forEach(curso => {
        texto += '<tr>';
        texto += '<td>' + curso.id + '</td>';
        texto += '<td>' + curso.nombre + '</td>';
        texto += '<td>' + curso.descripcion + '</td>';
        texto += '<td>' + curso.valor + '</td>';
        texto += '<td>' + curso.modalidad + '</td>';
        texto += '<td>' + curso.duracion + '</td>';
        texto += "<td> <form action = '/cursos/actualizarCurso' method='post'> <input type='hidden' name='id_actualizar' value ='"+ curso.id+"'/><input type='hidden' name='nombre_actualizar' value ='"+ curso.nombre +"'/><input type='hidden' name='descripcion_actualizar' value ='" + curso.descripcion + "'/><input type='hidden' name='valor_actualizar' value ='"+ curso.valor +"'/><input type='hidden' name='modalidad_actualizar' value ='"+ curso.modalidad +"'/><input type='hidden' name='duracion_actualizar' value ='"+ curso.duracion +"'/>" + (curso.activo == 1 ? "<input type='hidden' name='activo_actualizar' value ='0'/><button type='submit' class='btn btn-primary'>Inactivar</button>":"<input type='hidden' name='activo_actualizar' value ='1'/><button type='submit' class='btn btn-danger'>Activar</button>") + "</form></td>";
        texto += "<td><form action = '/cursos/eliminarCurso' method='post'><input type='hidden' name='id_curso_eliminar' value='"+curso.id+"'/><button type='submit' class='btn btn-primary'>Eliminar</button></form></td>";
        texto += '</tr>';
    });
    
    return texto;
})






