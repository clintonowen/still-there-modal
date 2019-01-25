import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Here from './here';
import NotHere from './not-here';
import './App.css';

class App extends Component {
  render () {
    return (
      <React.Fragment>
        <header />
        <main>
          <Route exact path='/' render={() => (<Redirect to='/here' />)} />
          <Route exact path='/here' component={Here} />
          <Route exact path='/not-here' component={NotHere} />
        </main>
        <footer />
      </React.Fragment>
    );
  }
}

// Deal with update blocking - https://reacttraining.com/react-router/web/guides/dealing-with-update-blocking
export default App;
