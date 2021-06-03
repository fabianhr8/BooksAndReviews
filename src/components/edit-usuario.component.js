import React, { Component } from 'react';
import axios from 'axios'; 

export default class UsuarioActual extends Component {
    constructor(props) {
        super(props);

        // Bind methods so that the word 'this' refers to the class
        this.cambioEnNombre = this.cambioEnNombre.bind(this);
        this.alEnviar = this.alEnviar.bind(this);

        this.state = {
            nombre: '',
            nuevoNombre: '',
            libros: []
        };
    }

    componentDidMount() {
        // this.props.location.usuarioID viene de la pagina usuarios-lista.component.js
        axios.get(`http://localhost:5000/usuarios/${this.props.location.usuarioId}`)
            .then(res => {
                this.setState({ 
                    nombre: res.data.nombre,
                    libros: res.data.libros
                });
            })
            .catch(err => console.log(err));
    }

    cambioEnNombre(e) {
        this.setState({
            nuevoNombre: e.target.value
        });
    }


    alEnviar(e) {
        // Evitar que cargue otra pagina
        e.preventDefault();

        const usuario = {
            nombre: this.state.nuevoNombre,
            libros: this.state.libros
        }
        console.log(usuario);

        axios.post(`http://localhost:5000/usuarios/modificar/${this.props.location.usuarioId}`, usuario)
            .then(res => {
                axios.post(`http://localhost:5000/libros/modificar/${this.props.location.usuarioId}`, usuario)
                .then(res => {
                    window.location = '/usuarios';                // Regresar a lista de usuarios
                })
                .catch(err => console.log(err));
                window.location = '/usuarios';                // Regresar a lista de usuarios
            })
            .catch(err => console.log(err));
    }

    render () {
        return (
            <div>
                <h2>Editar Usuario</h2>
                <p>Nombre actual:</p>
                <h4>{this.state.nombre}</h4>
                <form onSubmit={this.alEnviar}>
                    <div className='form-group'>
                        <label>Nuevo nombre: </label>
                        <input type='text' required className='form-control' onChange={this.cambioEnNombre} />
                    </div>
                    <div className='form-group'>
                        <input type="submit" value="Editar usuario" className="btn btn-primary" />
                    </div>
                </form>

            </div>
        )
    }
}
