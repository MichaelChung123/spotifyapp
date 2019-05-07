import React, { Component } from 'react';
import './App.css';
import SpotifyWebApi from 'spotify-web-api-js';

const spotifyApi = new SpotifyWebApi();

class App extends Component {
  constructor() {
    super();
    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
    }
    this.state = {
      loggedIn: token ? true : false,
      nowPlaying: { name: 'Not Checked', albumArt: '', artistId: '' },
      top10: null,
      loaded: false
    }
  }

  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    return hashParams;
  }

  getNowPlaying = () => {
    spotifyApi.getMyCurrentPlaybackState()
      .then((response) => {
        console.log("Response: ", response);
        // console.log('id', response.item.artists[0].id);
        this.setState({
          nowPlaying: {
            name: response.item.name,
            albumArt: response.item.album.images[0].url,
            artistId: response.item.artists[0].id
          }
        });
      })
  }

  getTopTrack = () => {
    spotifyApi.getArtistTopTracks(this.state.nowPlaying.artistId, 'GB')
      .then((response) => {
        this.setState({
          top10: response.tracks,
          loaded: true
        });
      }, function (err) {
        console.log('Something went wrong!', err);
      });
  }

  render() {
    let top10 = '';

    if (this.state.loaded) {
      top10 = this.state.top10.map((item, i) => {
        return <p key={i}>{item.name}</p>
      });
    }


    return (
      <div className="App">
        <a href='http://localhost:8888' > Login to Spotify </a>
        <div>
          Now Playing: {this.state.nowPlaying.name}
        </div>
        <div>
          <img src={this.state.nowPlaying.albumArt} style={{ height: 150 }} />
        </div>
        <div>
          {top10}
        </div>
        {this.state.loggedIn &&
          <button onClick={this.getNowPlaying}>
            Check Now Playing
            <button onClick={this.getTopTrack}>
              List Top Tracks
           </button>
          </button>
        }
      </div>
    );
  }
}

export default App;
