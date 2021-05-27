const express = require('express');
// Cors is used to access resources from remote hosts (skip same-origin policy)
const cors = require('cors');
// To access mongo database
const mongoose = require('mongoose');
// To use the files inside the 'routes' folder
const librosRouter = require('./routes/libros');
const usuariosRouter = require('./routes/usuarios'); 

// Dotnev is used so that we have a .nev file for environment variables
// require('dotenv').config();

// Start the express app
const app = express();
// Declare port in which the app will listen
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
// This will allow us to parse json
app.use(express.json());


// Connect to database
// const uri = process.env.ATLAS_URI;
const uri = 'mongodb://localhost:27017/libros';
mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connected');
});

// Use the routes
app.use('/libros', librosRouter);
app.use('/usuarios', usuariosRouter);

// Home page
app.get('/', (req, res) => {
    res.send('HOME PAGE');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});