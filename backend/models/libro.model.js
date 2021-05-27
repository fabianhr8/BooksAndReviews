const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create User schema
const libroSchema = new Schema({
    usuarioNombre: { type: String, required: true },
    titulo: { type: String, required: true },
    resena: { type: String, required: true },
    calificacion: { type: Number, required: true },
    usuarioId: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
});

// Create User model
const Libro = mongoose.model('Libro', libroSchema);

// Export model
module.exports = Libro;