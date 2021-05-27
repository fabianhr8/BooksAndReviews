const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create User schema
const usuarioSchema = new Schema({
    nombre: { 
        type: String, 
        required: true 
    },
    libros: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Libro'
        }
    ]
});

// Create User model
const Usuario = mongoose.model('Usuario', usuarioSchema);

// Export model
module.exports = Usuario;