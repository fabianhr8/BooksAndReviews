import React, { Component } from 'react';
import axios from 'axios'; 

export default class UsuarioActual extends Component {
    constructor(props) {
        super(props);

        // Bind methods so that the word 'this' refers to the class
        this.cambioEnTitulo = this.cambioEnTitulo.bind(this);
        this.cambioEnResena = this.cambioEnResena.bind(this);
        this.cambioEnCalificacion = this.cambioEnCalificacion.bind(this);
        this.alEnviar = this.alEnviar.bind(this);

        this.state = {
            titulo: '',
            resena: '',
            calificacion: '',
            usuarioNombre: ''
        };
    }

    componentDidMount() {
        // this.props.location.usuarioID viene de la pagina usuarios-lista.component.js
        axios.get(`http://localhost:5000/libros/${this.props.location.libroId}`)
            .then(res => {
                this.setState({ 
                    titulo: res.data.titulo,
                    resena: res.data.resena,
                    calificacion: res.data.calificacion,
                    usuarioNombre: res.data.usuarioNombre
                });
            })
            .catch(err => console.log(err));
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

    async alEnviar(e) {
        // Evitar que cargue otra pagina
        e.preventDefault();

        const libro = {
            titulo: this.state.titulo,
            resena: this.state.resena,
            calificacion: this.state.calificacion,
            usuarioNombre: this.state.usuarioNombre
        }

        await axios.post(`http://localhost:5000/libros/modificar/${this.props.location.libroId}`, libro);
        window.location = '/libros';
    }

    render () {
        return (
            <div>
                <h2>Editar Libro</h2>
                <h4>{this.state.titulo}</h4>
                <h4>{this.state.resena}</h4>
                <h4>{this.state.calificacion}</h4>
                <form onSubmit={this.alEnviar}>

                    <div className='form-group'>
                        <label>Nuevo titulo: </label>
                        <input type='text' required className='form-control' value={this.state.titulo}
                        onChange={this.cambioEnTitulo} />
                    </div>

                    <div className='form-group'>
                        <label>Nueva reseña: </label>
                        <input type='text' required className='form-control' value={this.state.resena}
                        onChange={this.cambioEnResena} />
                    </div>

                    <div className='form-group'>
                        <label for="range">Nueva calificación: </label>
                        <br />
                        <input type="range" class="form-control-range" min="1" max="5" id="range" 
                        value={this.state.calificacion} onChange={this.cambioEnCalificacion} />
                    </div>

                    <div className='form-group'>
                        <input type="submit" value="Editar reseña" className="btn btn-primary" />
                    </div>
                </form>

            </div>
        )
    }
}
