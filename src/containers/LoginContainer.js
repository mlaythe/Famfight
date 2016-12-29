import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Login from './../components/Login.js';
import * as loginActions from './../actions/loginActions.js';
import * as impureActions from './../actions/impureActions.js';

class LoginContainer extends React.Component {

  constructor(props) {
    super(props);

    this.updateUsername = this.updateUsername.bind(this);
    this.updateUserPassword = this.updateUserPassword.bind(this);
    this.submitLoginForm = this.submitLoginForm.bind(this);
    this.displayErrorMessage = this.displayErrorMessage.bind(this);
  }

  updateUsername(event) {
    const inputValue = event.target.value;
    this.props.loginActions.usernameInputAction(inputValue);
  }

  updateUserPassword(event) {
    const inputValue = event.target.value;
    this.props.loginActions.passwordInputAction(inputValue);
  }

  submitLoginForm(e) {
    e.preventDefault();
    this.props.impureActions.submitLoginAction(this.props.userState.username, this.props.userState.password);
  }

  displayErrorMessage() {
    return this.props.userState.error || { errorMsgID: 'noError', errorMsgText: '' };
  }

  render() {
    const loginFunctions = {
      updateUsername: this.updateUsername,
      updateUserPassword: this.updateUserPassword,
      submitLoginForm: this.submitLoginForm,
    };

    const error = this.displayErrorMessage();

    return (
      <div>
        <Login loginFunctions={loginFunctions} errorMessage={error}  />
        <Link to='/signup'>Signup</Link>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    userState: state.reducers.userState,
    events: state.events,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loginActions: bindActionCreators(loginActions, dispatch),
    impureActions: bindActionCreators(impureActions, dispatch),
  };
}

LoginContainer.propTypes = {
  loginActions: PropTypes.object,
  impureActions: PropTypes.object,
  userState: PropTypes.object,
  events: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);