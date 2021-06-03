import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; 

export const Libro = props => {
    return (
        <li>
            <Link to={{pathname: `/libros/actual`, libroId: props.libro._id}}>
                {props.libro}
            </Link> 
        </li>
    )
}

export default class UsuarioActual extends Component {
    constructor(props) {
        super(props);

        // Bind methods so that the word 'this' refers to the class
        this.librosLista = this.librosLista.bind(this);
        this.editarUsuario = this.editarUsuario.bind(this);
        this.eliminarUsuario = this.eliminarUsuario.bind(this);

        this.state = { 
            nombre: '' ,
            libros: [],
            librosTotal: [],
            librosId: []
        };
    }

    componentDidMount() {
        // this.props.location.usuarioID viene de la pagina usuarios-lista.component.js
        axios.get(`http://localhost:5000/usuarios/${this.props.location.usuarioId}`)
            .then(res => {
                this.setState({ 
                    nombre: res.data.nombre,
                    libros: res.data.libros.map(actualLibro => actualLibro)
                });
                // Obtener todos los libros y filtrar solo los que tengan el ID del usuario
                axios.get('http://localhost:5000/libros/')
                    .then(res => {
                        this.setState({ librosTotal: res.data });
                        // console.log(this.state)
                        const lib = [];
                        const libId = [];
                        for (let i = 0; i < this.state.libros.length; i++) {
                            for (let j = 0; j < this.state.librosTotal.length; j++) {
                                if (this.state.libros[i] === this.state.librosTotal[j]._id) {
                                    lib.push(this.state.librosTotal[j].titulo);
                                    libId.push(this.state.librosTotal[j]._id);
                                }
                            }
                        }
                        this.setState({
                            libros: lib,
                            librosId: libId
                        });
                    })
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
    }

    // Mostrar todos los libros, son links para ir a la resena de cada libro
    librosLista() {
        
        let librosCantidad = [];
        for (let i = 0; i < this.state.libros.length; i++){
            librosCantidad.push(i);
        }

        const titulos = this.state.libros; 
        const ids = this.state.librosId;
        
        // Create the object array
        const librosInfo = librosCantidad.map((id, index) => {
          return {
            titulo: titulos[index],
            id: ids[index]
          }
        });

        return librosInfo.map(libroActual => {
            return (
                    <li>
                        <Link to={{pathname: `/libros/actual`, libroId: libroActual.id}}>
                            {libroActual.titulo}
                        </Link> 
                    </li>
            )
        })
    }

    editarUsuario() {
        return (
            <Link to={{pathname: `/usuarios/actual/edit`, usuarioId: this.props.location.usuarioId}}>
                <p>Editar usuario</p>
            </Link>
        )
    }

    eliminarUsuario() {

        axios.delete(`http://localhost:5000/usuarios/${this.props.location.usuarioId}`)
            .then(res => {
                window.location = '/usuarios';                // Regresar a lista de usuarios
            })
            .catch(err => console.log(err));
    }

    render () {
        return (
            <div>
                <h2>Usuario Actual:</h2>
                <h3>{this.state.nombre}</h3>
                <p>{this.editarUsuario()}</p>
                <button onClick={this.eliminarUsuario}>Eliminar usuario</button>
                <h2>Libros reseñados</h2>
                <ul>{this.librosLista()}</ul>
            </div>
        )
    }
}
