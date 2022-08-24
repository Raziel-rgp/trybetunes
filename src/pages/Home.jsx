import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Album from './Album';
import Login from './Login';
import Search from './Search';
import Favorites from './Favorites';
import Profile from './Profile';
import Edit from './Edit';
import NotFound from './NotFound';

export default class Home extends Component {
  render() {
    return (
      <BrowserRouter>
        <Route
          exact
          path="/"
          render={ (props) => <Login { ...props } /> }
        />
        <Route exact path="/search" component={ Search } />
        <Route exact path="/album/:id" component={ Album } />
        <Route exact path="/favorites" component={ Favorites } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/profile/edit" component={ Edit } />
        <Route component={ NotFound } />
      </BrowserRouter>
    );
  }
}
