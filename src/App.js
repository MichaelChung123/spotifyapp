import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    data: null,
    users: [],
    loaded: false
  };

  componentDidMount() {
    fetch('/users')
      .then((response) => { return response.json() })
      .then((data) => {
        this.setState({
          users: data,
          loaded: true
        })
      });
  };

  render() {
    let users = this.state.users.map((item, i) => {
      return <p>{item.name}</p>
    });

    return (
      <div>
        {
          this.state.loaded ? (
            <div className="App">
              <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title">Welcome to React</h1>
              </header>
              {users}
            </div>
          ) : (
              <div>
                <p>L O A D I N G . . .</p>
              </div>
            )
        }
      </div>
    );
  }
}

export default App;