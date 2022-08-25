import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from '../components/Loading';

export default class Profile extends Component {
  state = {
    name: '',
    email: '',
    image: '../images/user-icon.png',
    description: '',
    loading: true,
  }

  componentDidMount() {
    this.getUserInfo();
  }

  getUserInfo = async () => {
    const infoUsuario = await getUser();
    this.setState({
      name: infoUsuario.name,
      email: infoUsuario.email,
      image: infoUsuario.image,
      description: infoUsuario.description,
    }, () => this.setState({ loading: false }));
  }

  render() {
    const { loading,
      name,
      email,
      image,
      description } = this.state;
    return (
      <div
        data-testid="page-profile"
      >
        <Header />
        <br />
        { loading ? (<Loading />) : (
          <div>
            <div>
              <img
                src={ image }
                alt="."
                data-testid="profile-image"
              />
              <Link to="/profile/edit">Editar perfil</Link>
            </div>
            <p>
              {name}
            </p>
            <p>
              {description}
            </p>
            <p>
              {email}
            </p>
            <p>
              descição:
              {image}
            </p>
          </div>
        ) }
      </div>
    );
  }
}
