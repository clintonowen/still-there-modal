import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import ActivityDialog from './activity-dialog';
import Here from './here';
import NotHere from './not-here';
import './App.css';

class App extends Component {
  render () {
    return (
      <React.Fragment>
        <header>
          <h1>Still There Modal</h1>
        </header>
        <main>
          <ActivityDialog />
          <Route exact path='/' render={() => (<Redirect to='/here' />)} />
          <Route exact path='/here' component={Here} />
          <Route exact path='/not-here' component={NotHere} />
        </main>
        <footer role='contentinfo'>
          <p id='copyright'>© Clinton Owen 2019</p>
        </footer>
      </React.Fragment>
    );
  }
}

// Deal with update blocking - https://reacttraining.com/react-router/web/guides/dealing-with-update-blocking
export default App;
