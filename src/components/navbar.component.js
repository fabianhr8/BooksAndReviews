import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
 
    render () {
        return (
            <nav class="navbar navbar-expand-md navbar-dark bg-dark sticky-top shadow-sm">
            <div class="container-fluid">
    
                <div class="navbar-header">
                    <Link to='/libros' className="navbar-brand">LIBROS&RESEÑAS</Link>
                </div>
    
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
    
                <div class="collapse navbar-collapse" id="navbarToggler">
                    <ul class="navbar-nav ms-auto">
                        <li class="navbar-item">
                            <Link to='/libros' className='nav-link'>Libros</Link>
                        </li>
                        <li class="navbar-item">
                            <Link to='/usuarios' className='nav-link'>Usuarios</Link>
                        </li>
                        <li class="/nuevolibro">
                            <Link to='/nuevolibro' className='nav-link'>Nuevo libro</Link>
                        </li>
                        <li class="/nuevousuario">
                            <Link to='/nuevousuario' className='nav-link'>Nuevo usuario</Link>
                        </li>
                    </ul>
              </div>
            </div>
        </nav>
        );
    }
}
