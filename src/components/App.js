import React, { Component } from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import ActivityDialog from './activity-dialog';
import Here from './here';
import NotHere from './not-here';
import './App.css';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      here: true,
      showDialog: false
    };
  }

  handleSetHere (here) {
    this.setState({ here });
  }

  handleSetShowDialog (showDialog) {
    this.setState({ showDialog });
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
            timeoutAction={() => this.handleSetHere(false)}
            userIsActive={this.state.here}
            showDialog={this.state.showDialog}
            setShowDialog={showDialog => this.handleSetShowDialog(showDialog)}
          />
          <Route exact path='/' render={() => (<Redirect to='/here' />)} />
          <Route
            exact path='/here'
            render={props => <Here {...props} here={this.state.here} />} />
          <Route
            exact path='/not-here'
            render={props => <NotHere
              {...props}
              here={this.state.here}
              setHere={here => this.handleSetHere(here)} />
            } />
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

// Deal with update blocking - https://reacttraining.com/react-router/web/guides/dealing-with-update-blocking
export default withRouter(App);
