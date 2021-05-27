// We need the router because we are creating a route
const router = require('express').Router();
let Usuario = require('../models/usuario.model');

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
    const x = Usuario.findById(usuarioid)
        .then(usuarioActual => {
            res.json(usuarioActual)
        })
        .catch(err => res.status(400).json('Error: ' + err))
});

// Export router
module.exports = router;