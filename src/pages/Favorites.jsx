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

  songRemoved = () => {
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

  markFavoriteSong = async (i, music) => {
    const { target } = i;
    const { name, checked } = target;
    this.setState({
      [name]: checked,
      loading: true },
    async () => {
      if (checked) {
        await addSong(music);
      } else {
        await removeSong(music);
        this.componentDidUpdate = () => {
          this.getListfavSongs();
        };
      }
      this.setState({
        favSong: await getFavoriteSongs(),
        loading: false });
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
      <div data-testid="page-favorites">
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
                    onChange={ () => this.songRemoved() }
                  />}
              </div>
            ))}
          </div>
        ) }
      </div>
    );
  }
}
