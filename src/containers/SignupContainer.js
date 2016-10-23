import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Signup from './../components/Signup.js';
import * as signupActions from './../actions/signupActions.js';
import * as impureActions from './../actions/impureActions.js';

class SignupContainer extends React.Component {

  constructor(props) {
    super(props);

    this.updateUsername = this.updateUsername.bind(this);
    this.updateUserPassword = this.updateUserPassword.bind(this);
    this.submitSignupForm = this.submitSignupForm.bind(this);
    // this.displayErrorMessage = this.displayErrorMessage.bind(this);
  }

  updateUsername(event) {
    const inputValue = event.target.value;
    this.props.signupActions.usernameInputAction(inputValue);
  }

  updateUserPassword(event) {
    const inputValue = event.target.value;
    this.props.signupActions.passwordInputAction(inputValue);
  }

  submitSignupForm(e) {
    e.preventDefault();
    this.props.impureActions.submitSignupAction(this.props.userState.username, this.props.userState.password);
  }

  // displayErrorMessage() {
  //   if (this.props.events.errorFetching) {
  //     return {
  //       errorMsgID: 'signupError',
  //       errorMsgText: 'Incorrect username address or password',
  //     };
  //   } else if (this.props.userState.emptySignupField) {
  //     return {
  //       errorMsgID: 'emptySignupInputError',
  //       errorMsgText: 'All fields are required',
  //     };
  //   }
  //   return {
  //     errorMsgID: 'noError',
  //     errorMsgText: '',
  //   };
  // }

  render() {
    const signupFunctions = {
      updateUsername: this.updateUsername,
      updateUserPassword: this.updateUserPassword,
      submitSignupForm: this.submitSignupForm,
    };

    // const error = this.displayErrorMessage();

    return (
      <div>
        <Signup signupFunctions={signupFunctions} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    userState: state.userState,
    events: state.events,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    signupActions: bindActionCreators(signupActions, dispatch),
    impureActions: bindActionCreators(impureActions, dispatch),
  };
}

SignupContainer.propTypes = {
  signupActions: PropTypes.object,
  impureActions: PropTypes.object,
  userState: PropTypes.object,
  events: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupContainer);