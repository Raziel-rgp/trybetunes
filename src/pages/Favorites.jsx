import React, { Component } from 'react';
import Header from '../components/Header';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
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

  markFavoriteSong = async (music) => {
    console.log('sla');
    this.setState({
      loading: true },
    async () => {
      await removeSong(music);
      const s = await getFavoriteSongs();
      console.log(s);
      this.setState({
        favSong: s,
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
            Favorita
            { condition }
            {favSong.map((music) => (
              <div key={ music.collectionId }>
                { music.previewUrl
                    && <MusicCard
                      trackId={ music.trackId }
                      trackName={ music.trackName }
                      previewUrl={ music.previewUrl }
                      music={ music }
                      onChange={ () => this.markFavoriteSong(music) }
                    />}
              </div>
            ))}
          </div>
        ) }
      </div>
    );
  }
}
