// We need the router because we are creating a route
const router = require('express').Router();
let Usuario = require('../models/usuario.model');

// Mostrar los usuarios
router.route('/').get(async (req, res) => {
    try {
        // Buscar todos los usuarios en la base de datos
        const usuarios = await Usuario.find();
        res.json(usuarios);
    } catch (err) {
        console.log('OH NO!!!!');
        console.log(err);
    }
});

// Crear nuevo usuario
router.route('/agregar').post(async (req, res) => { 

    const { nombre } = req.body;
    // Create new instance of User
    const nuevoUsuario = new Usuario({nombre});

    try {
        await nuevoUsuario.save();
        res.json('¡Usuario creado!');
    } catch (err) {
        console.log('OH NO!!!!');
        console.log(err);
    }
});

    // Ver un usuario en especifico
router.route('/:usuarioid').get(async (req, res) => {
    const { usuarioid } = req.params;

    try {
        const usuarioActual = await Usuario.findById(usuarioid);
        res.json(usuarioActual);
    } catch (err) {
        console.log('OH NO!!!!');
        console.log(err);
    }
});

// Borrar un usuario
router.route('/:usuarioid').delete(async (req, res) => {
    try {
        await Usuario.findByIdAndDelete(req.params.usuarioid);
        res.json('Usuario eliminado.');
    } catch (err) {
        console.log('OH NO!!!!');
        console.log(err);
    }

});

// Editar usuario
router.route('/modificar/:usuarioid').post( async (req, res) => {
        
    // const { nombre , libros} = req.body;
    if (req.body.nombre !== '') {
        const { nombre } = req.body;
        const usuarioActual = await Usuario.findById(req.params.usuarioid);
        usuarioActual.nombre = nombre;
        await usuarioActual.save();
        res.json('Usuario modificado');
    } 

});

// Export router
module.exports = router;