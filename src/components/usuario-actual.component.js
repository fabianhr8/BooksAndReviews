import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; 

export const Libro = props => {
    return (
        <li>
            {/* <p>{props.libro}</p> */}
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
        // this.nombreUsuario = this.nombreUsuario.bind(this);

        this.state = { 
            nombre: '' ,
            libros: [],
            librosTotal: [],
            librosId: []
        };
    }

    componentDidMount() {
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

    librosLista() {
        
        let librosCantidad = [];
        for (let i = 0; i < this.state.libros.length; i++){
            librosCantidad.push(i);
        }

        const titulos = this.state.libros; //Hundreds of elements here
        const ids = this.state.librosId; //Hundreds of elements here
        
        // Create the object array
        const librosInfo = librosCantidad.map((id, index) => {
          return {
            titulo: titulos[index],
            id: ids[index]
          }
        });

        return librosInfo.map(libroActual => {
            return (
                // <Libro libro={libroActual} key={libroActual._id} />
                    <li>
                        <Link to={{pathname: `/libros/actual`, libroId: libroActual.id}}>
                            {libroActual.titulo}
                        </Link> 
                    </li>
            )
        })
    }

    render () {
        return (
            <div>
                <h2>Usuario Actual:</h2>
                <h3>{this.state.nombre}</h3>
                <h2>Libros reseñados</h2>
                <ul>{this.librosLista()}</ul>
            </div>
        )
    }
}
