import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

// Atualização 1.6.4 corrigi o nome da versão lol
// criando variaveis

export default class Search extends Component {
  state = {
    isSubmiteButtonDisabled: true,
    name: '',
    loading: false,
    albumList: [],
    albumArtist: '',
  }

  /*   componentDidMount() {
    this.onSearchSubmit();
  } */

  onSearchSubmit = async () => {
    const { name } = this.state;
    this.setState({
      albumArtist: name,
      loading: true,
      albumList: await searchAlbumsAPI(name) }, () => {
      this.setState({ name: '', loading: false });
    });
  }

  handleOnChange = ({ target }) => {
    const { name } = target;
    const value = (target.type === 'checkbox') ? target.checked : target.value;
    this.setState({
      [name]: value,
    }, this.buttonDisabled);
  }

  buttonDisabled = () => {
    const { name } = this.state;
    const condition1 = 2;
    if (name.length >= condition1) {
      this.setState({ isSubmiteButtonDisabled: false });
    }
  }

  /*   saveListAlbumSearch() {
    this.setState(({ albumList, albumObj }) => ({
      albumList: [...albumList, albumObj],
    }));
  }
 */
  render() {
    const {
      isSubmiteButtonDisabled,
      name,
      albumList,
      loading,
      albumArtist,
    } = this.state;
    let condition = '';
    if (albumList.length > 0) {
      condition = (
        <p>
          {`Resultado de álbuns de: ${albumArtist}`}
        </p>);
    } else if (albumList.length === 0) {
      condition = (
        <p>
          Nenhum álbum foi encontrado
        </p>);
    }
    return (
      <div
        data-testid="page-search"
      >
        <Header />
        <br />
        <section>
          <label htmlFor="formId">
            <form className="form" id="formId">
              <input
                data-testid="search-artist-input"
                type="text"
                name="name"
                value={ name }
                onChange={ this.handleOnChange }
              />
              <br />
              <button
                data-testid="search-artist-button"
                type="button"
                onClick={ this.onSearchSubmit }
                disabled={ isSubmiteButtonDisabled }
              >
                Entrar
              </button>
            </form>

          </label>
          {
            loading
              ? <Loading />
              : condition
          }
          {albumList.map((album) => (
            <div key={ album.collectionId }>
              <Link
                to={ `/album/${album.collectionId}` }
                data-testid={ `link-to-album-${album.collectionId}` }
              >
                <img src={ album.artworkUrl100 } alt="albumImage" />
                <p>{album.collectionName}</p>
                <p>{album.artistName}</p>
              </Link>
            </div>
          ))}

        </section>
      </div>
    );
  }
}
