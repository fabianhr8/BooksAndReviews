import React, { Component } from 'react';
import axios from 'axios';

export default class NuevoLibro extends Component {
    constructor(props) {
        super(props);

        // Bind methods so that the word 'this' refers to the class
        this.cambioEnNombre = this.cambioEnNombre.bind(this);
        this.cambioEnTitulo = this.cambioEnTitulo.bind(this);
        this.cambioEnResena = this.cambioEnResena.bind(this);
        this.cambioEnCalificacion = this.cambioEnCalificacion.bind(this);
        this.alEnviar = this.alEnviar.bind(this);

        this.state = {
            usuario: '',
            usuarioId: '',
            titulo: '',
            resena: '',
            calificacion: 5,
            usuarios: [],
            usuariosId: [],
        }
    }

    // This is a React lifecycle method. It will be called right before anything is displayed on the page
    componentDidMount() {
        axios.get('http://localhost:5000/usuarios/')
            .then(res => {
                // Ver si hay al menos un usuario
                if (res.data.length > 0) {

                    this.setState({
                        usuarios: res.data.map(actualUsuario => actualUsuario.nombre),
                        usuariosId: res.data.map(actualUsuario => actualUsuario._id),
                        usuario: res.data[0].nombre,
                        usuarioId: res.data[0]._id
                    });
                }
            })
            .catch(err => console.log(err));
    }

    cambioEnNombre(e) {
        let index = this.state.usuarios.indexOf(e.target.value);
        let currentId = this.state.usuariosId[index];
        this.setState({
            usuario: e.target.value,
            usuarioId: currentId
        });
    }

    cambioEnTitulo(e) {
        this.setState({
            titulo: e.target.value
        });
    }

    cambioEnResena(e) {
        this.setState({
            resena: e.target.value
        });
    }

    cambioEnCalificacion(e) {
        this.setState({
            calificacion: e.target.value
        });
    }

    alEnviar(e) {
        // Evitar que cargue otra pagina
        e.preventDefault();
        
        const libro = {
            usuario: this.state.usuario,
            usuarioId: this.state.usuarioId,
            titulo: this.state.titulo,
            resena: this.state.resena,
            calificacion: this.state.calificacion
        }
        console.log(libro);

        axios.post('http://localhost:5000/libros/agregar', libro)
            .then(res => {
                window.location = '/libros';                // Go back to the list of exercises
            });
    }

    render () {
        return (
            <div>
                <h3>Agregar libro</h3>
                <form onSubmit={this.alEnviar}>
                    
                    <div className="form-group"> 
                        <label>Usuario: </label>
                        <select type="userInput" required className="form-control"
                            value={this.state.usuario} onChange={this.cambioEnNombre}>
                            {
                                this.state.usuarios.map(function(usuarioActual) {
                                    return <option key={usuarioActual} value={usuarioActual}> {usuarioActual} </option>;
                                })
                            }
                        </select>
                    </div>

                    <div className='form-group'>
                        <label>Titulo: </label>
                        <input type='text' required className='form-control' value={this.state.titulo}
                        onChange={this.cambioEnTitulo} />
                    </div>

                    <div className='form-group'>
                        <label>Reseña: </label>
                        <textarea className="form-control rounded-0" value={this.state.resena} 
                        onChange={this.cambioEnResena}>sss</textarea>
                    </div>

                    <div className='form-group'>
                        <label for="range">Calificación: </label>
                        <br />
                        <input type="range" class="form-control-range" min="1" max="5" id="range" 
                        onChange={this.cambioEnCalificacion} />
                    </div>

                    <div className='form-group'>
                        <input type="submit" value="Agregar libro" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}