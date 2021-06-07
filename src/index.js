import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import Inicio from './components/inicio.component';
import Navbar from './components/navbar.component';
import LibrosLista from './components/libros-lista.component';
import LibroActual from './components/libro-actual.component';
import EditLibro from './components/edit-libro.component';
import UsuariosLista from './components/usuarios-lista.component';
import UsuarioActual from './components/usuario-actual.component';
import EditUsuario from './components/edit-usuario.component';
import NuevoLibro from './components/nuevo-libro.component';
import NuevoUsuario from './components/nuevo-usuario.component';

function App() { 
    return (
        <Router>
            <div className='container'> 
                <Navbar />
                <Route path='/' exact component={Inicio} />
                <Route path='/libros' exact component={LibrosLista} />
                <Route path='/libros/actual' exact component={LibroActual} />
                <Route path='/libros/actual/edit' exact component={EditLibro} />
                <Route path='/usuarios' exact component={UsuariosLista} />
                <Route path='/usuarios/actual' exact component={UsuarioActual} />
                <Route path='/usuarios/actual/edit' exact component={EditUsuario} />
                <Route path='/nuevolibro' exact component={NuevoLibro} />
                <Route path='/nuevousuario' exact component={NuevoUsuario} />
            </div>
        </Router>
    );
}
    
ReactDOM.render(<App />, document.getElementById('root'));

