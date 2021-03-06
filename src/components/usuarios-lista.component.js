import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; 

export const Usuario = props => {
    return (
        <tr>
            <td>
                <Link to={{pathname: `/usuarios/actual`, usuarioId: props.usuario._id}}>
                    {props.usuario.nombre}
                </Link>
            </td>
        </tr>
    )
}

export default class UsuariosLista extends Component {
    constructor(props) {
        super(props);

        // Bind methods so that the word 'this' refers to the class
        // this.deleteExercise = this.deleteExercise.bind(this);

        this.state = { usuarios: [] };
    }

    // Esta ciclo de vida (React lifecycle) corre antes de que cualquier cosa aparezca en pantalla
    async componentDidMount() {
        try {
            const res = await axios.get('http://localhost:5000/usuarios/');
            this.setState({ usuarios: res.data });
        } catch (err) {
            console.log('OH NO!!!!');
            console.log(err);
        }
    }

    usuariosLista() {
        // Hacer esto para cada usuario dentro de state.usuarios
        return this.state.usuarios.map(usuarioActual => {
            return (<Usuario usuario={usuarioActual} key={usuarioActual._id} />)
        })
    }

    render () {
        return (

            <div>
                <h3>Usuarios</h3>
                <table className='table'>
                    <thead className='thead-light'>
                        <tr>
                            <th>Nombre de usuario</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.usuariosLista() }
                    </tbody>
                </table>
            </div>
        )
    }
}