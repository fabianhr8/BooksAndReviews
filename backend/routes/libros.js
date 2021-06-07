// We need the router because we are creating a route
const router = require('express').Router();
let Libro = require('../models/libro.model');
let Usuario = require('../models/usuario.model');

// Mostrar todos los libros
router.route('/').get(async (req, res) => {
    try {
        // Sacar todos los libros de la base de datos
        const libros = await Libro.find();
        res.json(libros);
    } catch (err) {
        console.log('OH NO!!!!');
        console.log(err);
    }
});

// Agregar nuevo libro
router.route('/agregar').post(async (req, res) => {
    const usuarioNombre = req.body.usuario;
    const usuarioId = req.body.usuarioId;
    const titulo = req.body.titulo;
    const resena = req.body.resena;
    const calificacion = Number(req.body.calificacion);
    // Crear una instancia de libro
    const nuevoLibro = new Libro({
        usuarioNombre,
        usuarioId,
        titulo,
        resena,
        calificacion
    });

    try {
        const usuarioActual = await Usuario.findById(usuarioId);
        usuarioActual.libros.push(nuevoLibro);
        await usuarioActual.save();
        await nuevoLibro.save();
        res.json('¡Reseña agregada!');
    } catch (err) {
        console.log('OH NO!!!!');
        console.log(err);
    }
});

// Mostrar un libro
router.route('/:libroid').get(async (req, res) => {
    const { libroid } = req.params;

    try {
        // Buscar en la base de datos un libro en especifico
        const libro = await Libro.findById(libroid);
        res.json(libro);
    } catch (err) {
        console.log('OH NO!!!!');
        console.log(err);
    }
});

// Borrar un libro
router.route('/:libroid').delete(async (req, res) => {
    try {
        await Libro.findByIdAndDelete(req.params.libroid); 
        res.json('Libro eliminado.');
    } catch (err) {
        console.log('OH NO!!!!');
        console.log(err);
    }
});

// Modificar libro
router.route('/modificar/:libroid').post(async (req, res) => {

    try {
        const libroActual = await Libro.findById(req.params.libroid);
        // Por si viene desde "editar usuario"
        if (req.body.nombre) {
            libroActual.usuarioNombre = req.body.nombre;
        }
        // O desde "editar libro"
        else {
            libroActual.titulo = req.body.titulo;
            libroActual.resena = req.body.resena;
            libroActual.calificacion = Number(req.body.calificacion);
            libroActual.usuarioNombre = req.body.usuarioNombre;
        }
        await libroActual.save();
        res.json('Libro actualizado');
    } catch (err) {
        console.log('OH NO!!!!');
        console.log(err);
    }
});

module.exports = router;