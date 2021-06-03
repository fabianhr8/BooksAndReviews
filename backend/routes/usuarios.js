// We need the router because we are creating a route
const router = require('express').Router();
let Usuario = require('../models/usuario.model');
let Libro = require('../models/libro.model');

// Mostrar los usuarios
router.route('/').get((req, res) => {
    // Buscar todos los usuarios en la base de datos
    Usuario.find()
        .then(usuarios => res.json(usuarios))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Crear nuevo usuario
router.route('/agregar').post((req, res) => { 
    const { nombre } = req.body;
    // Create new instance of User
    const nuevoUsuario = new Usuario({nombre});

    // Save user in database
    nuevoUsuario.save()
        .then(() => res.json('¡Usuario creado!'))
        .catch(err => res.status(400).json('Error: ' + err))
});

    // Ver un usuario en especifico
router.route('/:usuarioid').get((req, res) => {
    const { usuarioid } = req.params;
    const usuario = Usuario.findById(usuarioid)
        .then(usuarioActual => {
            res.json(usuarioActual)
        })
        .catch(err => res.status(400).json('Error: ' + err))
});

// Borrar un usuario
router.route('/:usuarioid').delete((req, res) => {
    Usuario.findByIdAndDelete(req.params.usuarioid)
        .then(() => res.json('Usuario eliminado.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Editar usuario
router.route('/modificar/:usuarioid').post((req, res) => {
    const { nombre , libros} = req.body;
    Usuario.findById(req.params.usuarioid)
    .then(usuarioActual => {
        usuarioActual.nombre = nombre;
        usuarioActual.save()
            .then(() => {


                for (let i = 0, p = Promise.resolve(); i < libros.length; i++) {
                    p = p.then(_ => new Promise(resolve => {
                        console.log(libros[i])
                        Libro.findById(libros[i])
                            .then(libro => {
                                libro.usuarioNombre = nombre;
                                libro.save()
                            })
                            .catch(err => res.status(400).json('Error: ' + err));
                        resolve();
                    }
                    ));
                }
                res.json('Libros actualizados');
            })
            .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));

});

// Export router
module.exports = router;