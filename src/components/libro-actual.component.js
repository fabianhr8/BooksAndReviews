import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; 

export default class UsuarioActual extends Component {
    constructor(props) {
        super(props);

        // Bind methods so that the word 'this' refers to the class
        // this.nombreUsuario = this.nombreUsuario.bind(this);

        this.state = { 
            usuarioNombre: '',
            titulo: '',
            resena: '',
            calificacion: 0,
            usuarioId: ''
        };
    }

    componentDidMount() {
        axios.get(`http://localhost:5000/libros/${this.props.location.libroId}`)
            .then(res => {
                this.setState({ 
                    usuarioNombre: res.data.usuarioNombre,
                    titulo: res.data.titulo,
                    resena: res.data.resena,
                    calificacion: res.data.calificacion,
                    usuarioId: res.data.usuarioId
                });
            })
            .catch(err => console.log(err));
    }

    render () {
        return (
            <div>
                <h2>Libro Actual:</h2>
                <h4>{this.state.titulo}</h4>
                <h2>Escrita por: </h2>
                <h4>
                    <Link to={{pathname: `/usuarios/actual`, usuarioId: this.state.usuarioId}}>
                        {this.state.usuarioNombre}
                    </Link>
                </h4>
                <h2>Reseña: </h2>
                <h4>{this.state.resena}</h4>
            </div>
        )
    }
}
