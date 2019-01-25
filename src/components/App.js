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
    const portfolio = (
      <a
        href='https://clintonowen.com'
        target='_blank'
        rel='noopener noreferrer'>
        Clinton Owen
      </a>
    );

    return (
      <React.Fragment>
        <header role='banner'>
          <h1>
            <a
              href='https://github.com/clintonowen/still-there-modal'
              target='_blank'
              rel='noopener noreferrer'>
              Still There Modal
            </a>
          </h1>
        </header>

        <main role='main'>
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
          <p>
            © {portfolio} 2019
          </p>
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
