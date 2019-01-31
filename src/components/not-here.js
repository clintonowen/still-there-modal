import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import './not-here.css';

export class NotHere extends Component {
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
        <button onClick={() => this.props.setHere(true)}>
          I'm back!
        </button>
      </section>
    );
  }
}

// Deal with update blocking - https://reacttraining.com/react-router/web/guides/dealing-with-update-blocking
export default withRouter(NotHere);
