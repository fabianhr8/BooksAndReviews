import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; 

export const Libro = props => {
    return (
        <tr>
            <td>
                <Link to={{pathname: `/libros/actual`, libroId: props.libro._id}}>
                    {props.libro.titulo}
                </Link>            
            </td>
            <td>
                <Link to={{pathname: `/usuarios/actual`, usuarioId: props.libro.usuarioId}}>
                    {props.libro.usuarioNombre}
                </Link>
            </td>
            <td>{props.libro.calificacion}</td>
        </tr>
    )
}

export default class ExerciseList extends Component {
    constructor(props) {
        super(props);

        // Bind methods so that the word 'this' refers to the class
        // this.deleteExercise = this.deleteExercise.bind(this);

        this.state = { libros: [] };
    }

    // Esta ciclo de vida (React lifecycle) corre antes de que cualquier cosa aparezca en pantalla
    componentDidMount() {
        axios.get('http://localhost:5000/libros/')
            .then(res => {
                this.setState({ libros: res.data });
            })
            .catch(err => console.log(err));
    }

    librosLista() {
        return this.state.libros.map(libroActual => {
            return (<Libro libro={libroActual} key={libroActual._id} />)
        })
    }

    render () {
        return (
            <div>
                <h3>Libros reseñados</h3>
                <table className='table'>
                    <thead className='thead-light'>
                        <tr>
                            <th>Titulo</th>
                            <th>Usuario</th>
                            <th>Calificación</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.librosLista() }
                    </tbody>
                </table>
            </div>
        )
    }
}