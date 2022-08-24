import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

// log de atualização(1.4);
// * adicionado test id

export default class Header extends Component {
  // userName vai receber os dados retornados pela função getUser
  // loading vai mudar de estado para false quando acabar a requisição do nome do usuário.
  state = {
    userName: '',
    loading: true,
  }

  // componentDidMount é uma função assincrona que faz a requisição para pegar os dados retornados pela função getUser
  // também muda o estado de loading, para parar o loanding ta tela de carregamento.
  componentDidMount = async () => {
    const nomeUsuario = await getUser();
    this.setState({
      userName: nomeUsuario.name,
    }, () => this.setState({ loading: false }));
  }

  render() {
    const {
      userName,
      loading,
    } = this.state;
    return (
      <header
        data-testid="header-component"
      >
        { loading ? (<div><Loading /></div>) : (
          <div>
            <p data-testid="header-user-name">{ userName }</p>
            <Link data-testid="link-to-search" to="/search">Procurar </Link>
            <Link to="/album/:id"> album </Link>
            <Link data-testid="link-to-favorites" to="/favorites"> Favoritos </Link>
            <Link data-testid="link-to-profile" to="/profile"> Perfil </Link>
            <Link to="profile/edit"> Editar Perfil </Link>
          </div>
        ) }
      </header>
    );
  }
}
