import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  showActivityDialog,
  hideActivityDialog,
  setDeadline
} from '../actions/activity';
import './activity-dialog.css';

export class ActivityDialog extends Component {
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
    // The total time we will wait before deciding the user is inactive
    const msMain = this.props.timeoutMinutes * 60 * 1000;
    // The amount of time the warning dialog will display
    const msDialog = this.props.dialogMinutes * 60 * 1000;
    // The dialog should be hidden to start with
    this.props.dispatch(hideActivityDialog());
    // Store the inactivity deadline for use in the countdown display
    this.props.dispatch(setDeadline(new Date().getTime() + msMain));
    // Set the user to inactive after the wait
    this.mainTimeout = setTimeout(() => this.notHere(), msMain);
    // Show the dialog for the specified amount of time before taking action
    this.dialogTimeout = setTimeout(() => this.show(), (msMain - msDialog));
  }

  // Clear the timing events
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
    // Clear the dialog timeout
    clearTimeout(this.dialogTimeout);
    this.dialogTimeout = null;
    // Show the dialog
    this.props.dispatch(showActivityDialog());
    // Force a rerender every second to update the dialog countdown display
    this.timeLeftInterval = setInterval(() => this.forceUpdate(), 1000);
  }

  notHere () {
    // Clear the main timeout
    clearTimeout(this.mainTimeout);
    this.mainTimeout = null;
    // Hide the dialog
    this.props.dispatch(hideActivityDialog());
    // Perform the action supplied to props
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
            You will be redirected in <span className='red'>{secondsRemaining}</span> {timeUnit}.
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
