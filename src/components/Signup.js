import React, { PropTypes } from 'react';
import FormInput from './FormInput.js';
import RectangleButton from './RectangleButton.js';
import ErrorMessage from './ErrorMessage.js';

const Signup = ({ signupFunctions }) => {

  const { updateUsername, updateUserPassword, submitSignupForm } = signupFunctions;
  // const { errorMsgID, errorMsgText } = errorMessage;

  return (
    <div>
      <h1>Signup</h1>
      <form>
        <FormInput
          inputType='username'
          inputID='signupUsernameInput'
          labelText='Username'
          handleChangeFn={updateUsername}
        />
        <FormInput
          inputType='password'
          inputID='signupPasswordInput'
          labelText='Password'
          handleChangeFn={updateUserPassword}
        />
        <RectangleButton
          text='Log In'
          type='submit'
          handleClick={submitSignupForm}
        />
      </form>
    </div>
  );
};

Signup.propTypes = {
  signupFunctions: PropTypes.object,
  // errorMessage: PropTypes.object,
};

export default Signup;