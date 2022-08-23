import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Header extends Component {
  render() {
    return (
      <header
        data-testid="header-component"
      >
        <Link to="/">Home </Link>
        <Link to="/search"> Procurar </Link>
        <Link to="/album/:id"> album </Link>
        <Link to="/favorites"> Favoritos </Link>
        <Link to="/profile"> Perfil </Link>
        <Link to="profile/edit"> Editar Perfil </Link>
      </header>
    );
  }
}
