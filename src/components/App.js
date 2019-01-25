import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { setHereFalse } from '../actions/auth';
import ActivityDialog from './activity-dialog';
import Here from './here';
import NotHere from './not-here';
import './App.css';

class App extends Component {
  handleNotHere () {
    this.props.dispatch(setHereFalse());
  }

  render () {
    return (
      <React.Fragment>
        <header>
          <h1>Still There Modal</h1>
        </header>
        <main>
          <ActivityDialog
            timeoutMinutes={(15 / 60)}
            dialogMinutes={(5 / 60)}
            timeoutAction={() => this.handleNotHere()}
            userIsActive={this.props.here}
          />
          <Route exact path='/' render={() => (<Redirect to='/here' />)} />
          <Route exact path='/here' component={Here} />
          <Route exact path='/not-here' component={NotHere} />
        </main>
        <footer role='contentinfo'>
          <p id='copyright'>© <a href='https://clintonowen.com' target='_blank'>Clinton Owen</a> 2019</p>
        </footer>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  here: state.auth.here
});

// Deal with update blocking - https://reacttraining.com/react-router/web/guides/dealing-with-update-blocking
export default withRouter(connect(mapStateToProps)(App));
