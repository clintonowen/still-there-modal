import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { setHereTrue } from '../actions/activity';
import './not-here.css';

class NotHere extends Component {
  goHere () {
    this.props.dispatch(setHereTrue());
  }

  render () {
    if (this.props.here) {
      return (<Redirect to='/here' />);
    }

    return (
      <section className='not-here'>
        <h2>
          You're not here :(
        </h2>
        <button onClick={() => this.goHere()}>I'm here</button>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  here: state.activity.here
});

// Deal with update blocking - https://reacttraining.com/react-router/web/guides/dealing-with-update-blocking
export default withRouter(connect(mapStateToProps)(NotHere));
