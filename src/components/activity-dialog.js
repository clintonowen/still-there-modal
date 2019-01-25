import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  showActivityDialog,
  hideActivityDialog,
  setHereFalse,
  setDeadline
} from '../actions/activity';
import './activity-dialog.css';

class ActivityDialog extends Component {
  componentDidMount () {
    this.startWaiting();
  }

  componentWillReceiveProps (nextProps) {
    if (!this.props.here && nextProps.here) {
      this.startWaiting();
    } else if (this.props.here && !nextProps.here) {
      this.stopWaiting();
    }
  }

  startWaiting () {
    this.props.dispatch(hideActivityDialog());
    this.props.dispatch(setDeadline(new Date().getTime() + 15000));
    this.hereTimeout = setTimeout(() => this.notHere(), 15000);
    this.showTimeout = setTimeout(() => this.show(), 10000);
  }

  stopWaiting () {
    if (this.hereTimeout) {
      clearTimeout(this.hereTimeout);
      this.hereTimeout = null;
    }
    if (this.timeLeftInterval) {
      clearInterval(this.timeLeftInterval);
      this.timeLeftInterval = null;
    }
  }

  restartWaiting () {
    this.stopWaiting();
    this.startWaiting();
  }

  show () {
    this.showTimeout = null;
    this.props.dispatch(showActivityDialog());
    this.timeLeftInterval = setInterval(() => this.forceUpdate(), 1000);
  }

  notHere () {
    this.hereTimeout = null;
    this.props.dispatch(hideActivityDialog());
    this.props.dispatch(setHereFalse());
  }

  render () {
    if (!this.props.showDialog) {
      return (
        <div className='modal hidden' />
      );
    }

    const now = new Date().getTime();
    const secondsRemaining = Math.floor((this.props.deadline - now) / 1000) + 1;
    const timeUnit = secondsRemaining > 1 ? 'seconds' : 'second';

    return (
      <div className='modal'>
        <div className='activity-dialog'>
          <h2>Are you still there?</h2>
          <p>
            You have {secondsRemaining} {timeUnit} to respond.
          </p>
          <button onClick={() => this.restartWaiting()}>
            I'm still here
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  here: state.activity.here,
  showDialog: state.activity.showDialog,
  deadline: state.activity.deadline
});

// Deal with update blocking - https://reacttraining.com/react-router/web/guides/dealing-with-update-blocking
export default withRouter(connect(mapStateToProps)(ActivityDialog));
