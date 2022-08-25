import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

/* Atualizações 1.8; 1.9; 1.10; 1.11; como era um exercicio grande dividido em 3, resolvi fazer os 3 ao mesmo tempo
  obs: Não irei explicar o loanding, já que já usei algumas vezes e ser bem autoexplicativo
*/
export default class MusicCard extends Component {
  // declaração das variaveis que usei;
  // favSong, salva as musicas que foram marcadas como favoritas pelo usuário
  state = {
    loading: false,
    favSong: [],
  }

  // getListFavSongs verifica se há musicas a no localStorage(digo api), utilizando a função getFavoriteSongs

  componentDidMount() {
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

  // como o nome sugere markFavoriteSong adiciona/remove o "check" da "checkbox"
  // basicamente um handleOnChange, só que modificado para a ocasião

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
    const { music, onChange = this.markFavoriteSong } = this.props; // prop passada em Album, lá terá a explicação do que está sendo passado em outro momento;
    const { loading,
      favSong } = this.state; // states que serão passados
    const {
      trackName,
      previewUrl,
      trackId,
    } = music;

    const favWorkPls = favSong.some((fav) => fav.trackId === music.trackId);
    return (
      <div>
        <p>{ trackName }</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
        <label htmlFor="checkbox">
          <span className="hide-label">Favorita</span>
          <input
            data-testid={ `checkbox-music-${trackId}` }
            type="checkbox"
            name="checkbox"
            id="checkbox"
            checked={ favWorkPls }
            onChange={ onChange }
          />
        </label>
        {loading && <Loading />}
      </div>
    );
  }
}
MusicCard.propTypes = {
  music: PropTypes.shape({
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
    trackId: PropTypes.number.isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
};
