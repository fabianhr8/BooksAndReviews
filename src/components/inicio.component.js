import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export default class Inicio extends Component {
    constructor(props) {
        super(props);
    }

    cambioEnNombre(e) {
        this.setState({
            nombre: e.target.value
        });
    }

    render () {
        return (
            <div>
                <h3>Inicio</h3>
                <Redirect to="/libros" />
            </div>
        )
    }
}