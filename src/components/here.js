import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import './here.css';

class Here extends Component {
  render () {
    if (!this.props.here) {
      return (<Redirect to='/not-here' />);
    }

    return (
      <section className='here'>
        <h2>
          Hello!
        </h2>
        <img src='/img/forrest-wave.gif' alt='Waving Forrest Gump' />
      </section>
    );
  }
}

const mapStateToProps = state => ({
  here: state.auth.here
});

// Deal with update blocking - https://reacttraining.com/react-router/web/guides/dealing-with-update-blocking
export default withRouter(connect(mapStateToProps)(Here));
