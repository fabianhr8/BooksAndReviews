import React, { Component } from 'react';
import axios from 'axios';

export default class NuevoUsuario extends Component {
    constructor(props) {
        super(props);

        // Bind methods so that the word 'this' refers to the class
        this.cambioEnNombre = this.cambioEnNombre.bind(this);
        this.alEnviar = this.alEnviar.bind(this);

        this.state = {
            nombre: ''
        }
    }

    cambioEnNombre(e) {
        this.setState({
            nombre: e.target.value
        });
    }

    async alEnviar(e) {
        // Evitar que cargue otra pagina
        e.preventDefault();

        const usuario = {
            nombre: this.state.nombre
        }

        // Crear usuario
        try {
            await axios.post('http://localhost:5000/usuarios/agregar', usuario);
            window.location = '/usuarios';
        } catch (err) {
            console.log('OH NO!!!!');
            console.log(err);
        }
    }

    render () {
        return (
            <div>
                <h3>Agregar usuario</h3>
                <form onSubmit={this.alEnviar}>
                    <div className='form-group'>
                        <label>Nombre: </label>
                        <input type='text' required className='form-control' value={this.state.nombre}
                        onChange={this.cambioEnNombre} />
                    </div>

                    <div className='form-group'>
                        <input type="submit" value="Crear nuevo usuario" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}