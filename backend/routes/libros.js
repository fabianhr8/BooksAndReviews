// We need the router because we are creating a route
const router = require('express').Router();
let Libro = require('../models/libro.model');
let Usuario = require('../models/usuario.model');

// Mostrar todos los libros
router.route('/').get((req, res) => {
    // Sacar todos los libros de la base de datos
    Libro.find()
        // mostrar los libros mediante json
        .then(libros => res.json(libros))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Agregar nuevo libro
router.route('/agregar').post((req, res) => {
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
    console.log(nuevoLibro);
    
    Usuario.findById(usuarioId)
        .then((usuarioActual) => {
            console.log(usuarioActual);
            usuarioActual.libros.push(nuevoLibro);
            usuarioActual.save()
                .then(() => {
                    nuevoLibro.save()
                        .then(() => {
                            res.json('¡Reseña agregada!');
                        })
                        .catch(err => res.status(400).json('Error: ' + err))
                })
        })
        .catch(err => res.status(400).json('Error: ' + err))
});

// Mostrar un libro
router.route('/:libroid').get((req, res) => {
    const { libroid } = req.params;
    console.log(libroid)
    // Buscar en la base de datos un libro en especifico
    Libro.findById(libroid)
        .then(libro => res.json(libro))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Borrar un libro
router.route('/:libroid').delete((req, res) => {
    Libro.findByIdAndDelete(req.params.id)
        .then(() => res.json('Libro eliminado.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Modificar libro
router.route('/modificar/:libroid').post((req, res) => {
    Libro.findById(req.params.id)
        .then(libro => {
            libro.usuario = req.body.usuario;
            libro.titulo = req.body.titulo;
            libro.resena = req.body.resena;
            libro.calificacion = Number(req.body.calificacion);

            libro.save()
                .then(() => res.json('Libro actualizado'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

// // Ver libros sobre un usuario en especifico
// router.route('/:usuarioid/libros').get((req, res) => {
//     const { usuarioid } = req.params;
//     Usuario.findById(usuarioid)
//         .then(usuarioActual => res.json(usuarioActual))
//         .catch(err => res.status(400).json('Error: ' + err))
//     console.log(usuarioActual)
// });

// Export router
module.exports = router;