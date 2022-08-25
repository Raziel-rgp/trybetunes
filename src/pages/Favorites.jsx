import React, { Component } from 'react';
import Header from '../components/Header';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';

export default class Favorites extends Component {
  state = {
    loading: true,
    favSong: [],
  }

  componentDidMount() {
    this.getListfavSongs();
  }

  shouldComponentUpdate(nextProps, nextState) {
    this.getListfavSongs();
    return true;
  }

  componentDidUpdate(prevProps, prevState) {
    this.getListfavSongs();
  }

  getListfavSongs = async () => {
    this.setState({ loading: true,
      favSong: await getFavoriteSongs(),
    },
    () => {
      this.setState({
        loading: false,
      });
    });
  }

  markFavoriteSong = async ({ target }) => {
    const { name, checked } = target;
    const { music } = this.props;
    this.setState({
      [name]: checked,
      loading: true },
    async () => {
      if (checked) { // caso checked seja verdadeiro... (para deixar mais claro, caso a checkbox tenha sido marcada, ele adicionará a musica aos favoritos)
        await addSong(music); // ...chama a função que salva a musica favorita.
      } else { // caso contrário... (para deixar mais claro, caso seja desmarcado a checkbox ele removerá a musica dos favoritos)
        await removeSong(music); // ...chama a função que remove a musica salva
      }
      this.setState({
        favSong: await getFavoriteSongs(), // Ele adiciona as musicas que acabaram de ser salvas usando a função getFavoritesSongs
        loading: false }); // remove loading
    });
  }

  render() {
    const {
      loading,
      favSong,
    } = this.state;
    let condition = '';
    if (favSong.length > 0) {
      condition = (
        <div>
          <p data-testid="artist-name">
            {favSong[0].artistName}
          </p>
          <p data-testid="album-name">
            {favSong[0].collectionName}
          </p>
        </div>
      );
    }
    return (
      <div>
        <Header />
        { loading ? (<Loading />) : (
          <div>
            { condition }
            {favSong.map((music) => (
              <div key={ music.collectionId }>
                { music.previewUrl
                  && <MusicCard
                    trackId={ music.trackId }
                    trackName={ music.trackName }
                    previewUrl={ music.previewUrl }
                    music={ music }
                    onChange={ (i) => this.markFavoriteSong(i, music) }
                  />}
              </div>
            ))}
          </div>
        ) }
      </div>
    );
  }
}
