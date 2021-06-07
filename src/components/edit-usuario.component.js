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

    async componentDidMount() {
        try {
            // this.props.location.usuarioID viene de la pagina usuarios-lista.component.js
            const res = await axios.get(`http://localhost:5000/usuarios/${this.props.location.usuarioId}`);
            this.setState({ 
                nombre: res.data.nombre,
                libros: res.data.libros
            });
        } catch (err) {
            console.log('OH NO!!!!');
            console.log(err);
        }
    }

    cambioEnNombre(e) {
        this.setState({
            nuevoNombre: e.target.value
        });
    }


    async alEnviar(e) {
        // Evitar que cargue otra pagina
        e.preventDefault();

        const usuario = {
            nombre: this.state.nuevoNombre,
        }
        
        try {
            await axios.post(`http://localhost:5000/usuarios/modificar/${this.props.location.usuarioId}`, usuario);
            for (let libro of this.state.libros) {
                await axios.post(`http://localhost:5000/libros/modificar/${libro}`, usuario);
            }

            // await axios.post(`http://localhost:5000/libros/modificar/${this.props.location.usuarioId}`, usuario)
            window.location = '/usuarios';                // Regresar a lista de usuarios
        } catch (err) {
            console.log('OH NO!!!!');
            console.log(err);
        }
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
