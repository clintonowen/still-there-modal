import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  showActivityDialog,
  hideActivityDialog,
  setDeadline
} from '../actions/activity';
import './activity-dialog.css';

class ActivityDialog extends Component {
  componentDidMount () {
    this.startWaiting();
  }

  componentWillReceiveProps (nextProps) {
    if (!this.props.userIsActive && nextProps.userIsActive) {
      this.startWaiting();
    } else if (this.props.userIsActive && !nextProps.userIsActive) {
      this.stopWaiting();
    }
  }

  startWaiting () {
    const msMain = this.props.timeoutMinutes * 60 * 1000;
    const msDialog = this.props.dialogMinutes * 60 * 1000;
    this.props.dispatch(hideActivityDialog());
    this.props.dispatch(setDeadline(new Date().getTime() + msMain));
    this.mainTimeout = setTimeout(() => this.notHere(), msMain);
    this.dialogTimeout = setTimeout(() => this.show(), (msMain - msDialog));
  }

  stopWaiting () {
    if (this.mainTimeout) {
      clearTimeout(this.mainTimeout);
      this.mainTimeout = null;
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
    this.dialogTimeout = null;
    this.props.dispatch(showActivityDialog());
    this.timeLeftInterval = setInterval(() => this.forceUpdate(), 1000);
  }

  notHere () {
    this.mainTimeout = null;
    this.props.dispatch(hideActivityDialog());
    this.props.timeoutAction();
  }

  render () {
    if (!this.props.showDialog) {
      return (
        <div className='modal hidden' />
      );
    }

    const now = new Date().getTime();
    const secondsRemaining = Math.ceil((this.props.deadline - now) / 1000);
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
  showDialog: state.activity.showDialog,
  deadline: state.activity.deadline
});

// Deal with update blocking - https://reacttraining.com/react-router/web/guides/dealing-with-update-blocking
export default withRouter(connect(mapStateToProps)(ActivityDialog));
