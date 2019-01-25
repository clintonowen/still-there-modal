import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { setHereTrue } from '../actions/auth';
import './not-here.css';

export class NotHere extends Component {
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
          Goodbye :(
        </h2>
        <img src='/img/forrest-goodbye.gif' alt='Tired Forrest Gump' />
        <br />
        <button onClick={() => this.goHere()}>I'm back!</button>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  here: state.auth.here
});

// Deal with update blocking - https://reacttraining.com/react-router/web/guides/dealing-with-update-blocking
export default withRouter(connect(mapStateToProps)(NotHere));
