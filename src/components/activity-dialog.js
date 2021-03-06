import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './activity-dialog.css';

export class ActivityDialog extends Component {
  constructor (props) {
    super(props);
    this.state = {
      deadline: null,
      timeLeft: null
    };
  }

  componentDidMount () {
    this.startWaiting();
  }

  componentDidUpdate (prevProps) {
    if (!prevProps.userIsActive && this.props.userIsActive) {
      this.startWaiting();
    } else if (prevProps.userIsActive && !this.props.userIsActive) {
      this.stopWaiting();
    }
  }

  startWaiting () {
    // The total time we will wait before deciding the user is inactive
    const msMain = this.props.timeoutMinutes * 60 * 1000;
    // The amount of time the warning dialog will display
    const msDialog = this.props.dialogMinutes * 60 * 1000;
    // The dialog should be hidden to start with
    this.props.setShowDialog(false);
    // Store the inactivity deadline for use in the countdown display
    this.setState({
      deadline: new Date().getTime() + msMain,
      timeLeft: msDialog / 1000
    });
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
    this.setState({
      timeLeft: null
    });
  }

  restartWaiting () {
    this.stopWaiting();
    this.startWaiting();
  }

  show () {
    // Update the `timeLeft` every second for the countdown display
    this.timeLeftInterval = setInterval(() => {
      const now = new Date().getTime();
      const timeLeft = Math.ceil((this.state.deadline - now) / 1000);
      this.setState({ timeLeft });
    }, 1000);
    // Clear the dialog timeout
    clearTimeout(this.dialogTimeout);
    this.dialogTimeout = null;
    // Show the dialog
    this.props.setShowDialog(true);
  }

  notHere () {
    // Clear the main timeout
    clearTimeout(this.mainTimeout);
    this.mainTimeout = null;
    // Hide the dialog
    this.props.setShowDialog(false);
    // Perform the action supplied to props
    this.props.timeoutAction();
  }

  render () {
    if (!this.props.showDialog) {
      return (
        <div className='modal hidden' />
      );
    }

    const timeUnit = this.state.timeLeft > 1 ? 'seconds' : 'second';

    return (
      <div className='modal'>
        <div className='activity-dialog'>
          <h2>Are you still there?</h2>
          <p>
            You will be redirected in <span className='red'>{this.state.timeLeft}</span> {timeUnit}.
          </p>
          <button onClick={() => this.restartWaiting()}>
            I'm still here
          </button>
        </div>
      </div>
    );
  }
}

// Deal with update blocking - https://reacttraining.com/react-router/web/guides/dealing-with-update-blocking
export default withRouter(ActivityDialog);
