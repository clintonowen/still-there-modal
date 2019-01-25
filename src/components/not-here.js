import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import './not-here.css';

class NotHere extends Component {
  render () {
    if (this.props.here) {
      return (<Redirect to='/here' />);
    }

    return (
      <section>
        <header>Not here</header>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  here: state.activity.here
});

// Deal with update blocking - https://reacttraining.com/react-router/web/guides/dealing-with-update-blocking
export default withRouter(connect(mapStateToProps)(NotHere));
