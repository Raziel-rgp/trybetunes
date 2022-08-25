import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

// ajuda de Luis Fernandes Neto 22-a

export default class Album extends Component {
  state = {
    songs: [],
  }

  componentDidMount() {
    this.onSearchSubmit();
  }

  onSearchSubmit = async () => {
    const {
      match: { params: { id } },
    } = this.props;
    this.setState({
      songs: await getMusics(id),
    });
  }

  render() {
    const { songs } = this.state;

    let condition = '';
    if (songs.length > 0) {
      condition = (
        <div>
          <p data-testid="artist-name">
            {songs[0].artistName}
          </p>
          <p data-testid="album-name">
            {songs[0].collectionName}
          </p>
        </div>
      );
    }
    return (
      <div
        data-testid="page-album"
      >
        <Header />
        { condition }
        {songs.map((music) => (
          <div key={ music.collectionId }>
            { music.previewUrl
            && <MusicCard
              trackId={ music.trackId }
              trackName={ music.trackName }
              previewUrl={ music.previewUrl }
              music={ music }
            />}

          </div>
        ))}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
