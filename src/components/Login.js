import React, { PropTypes } from 'react';
import FormInput from './FormInput.js';
import RectangleButton from './RectangleButton.js';
import ErrorMessage from './ErrorMessage.js';

const Login = ({ loginFunctions, errorMessage }) => {

  const { updateUsername, updateUserPassword, submitLoginForm } = loginFunctions;
  const { errorMsgID, errorMsgText } = errorMessage;

  return (
    <div>
      <h1>Login</h1>
      <ErrorMessage
        errorMsgID={errorMsgID}
        errorMsgText={errorMsgText}
      />
      <form>
        <FormInput
          inputType='username'
          inputID='loginUsernameInput'
          labelText='Username'
          handleChangeFn={updateUsername}
        />
        <FormInput
          inputType='password'
          inputID='loginPasswordInput'
          labelText='Password'
          handleChangeFn={updateUserPassword}
        />
        <RectangleButton
          text='Login'
          type='submit'
          handleClick={submitLoginForm}
        />
      </form>
    </div>
  );
};

Login.propTypes = {
  loginFunctions: PropTypes.object,
  errorMessage: PropTypes.object,
};

export default Login;