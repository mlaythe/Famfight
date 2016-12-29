import axios from 'axios';
import { requestUserInfoAction, receiveUserInfoAction, failureUserInfoAction } from './fetchEventActions.js';
import { signupErrorAction } from './signupActions.js';
import { loginErrorAction } from './loginActions.js';
import { browserHistory } from 'react-router';

axios.defaults.adapter = require('axios/lib/adapters/http');

export function createUserInfoAction(username, password) {
  return function (dispatch) {
    return axios.post('http://localhost:8080/user/signup', { username, password })
      .then((response) => {
        if (!response.data.id_token) {
          throw new Error('Error signing up user.');
        }

        localStorage.setItem('token', response.data.id_token);
        browserHistory.push('/home');
      })
      .catch((error) => {
        console.log('inside catch', error);
        if (error.response) {
          dispatch(failureUserInfoAction());
        } else {
          console.log('inside error');
          throw new Error('Error preparing ajax request');
        }
      });
  };
}

export function loginUserAction(username, password) {
  return function (dispatch) {
    return axios.post('http://localhost:8080/user/login', { username, password })
      .then((response) => {
        if (!response.data.id_token) {
          throw new Error('Error logging in user.');
        }

        localStorage.setItem('token', response.data.id_token);
        browserHistory.push('/home');
      })
      .catch((error) => {
        console.log('inside catch', error);
        if (error.response) {
          dispatch(failureUserInfoAction());
        } else {
          console.log('inside error');
          throw new Error('Error preparing ajax request');
        }
      });
  };
}

export function submitSignupAction(username, password) {
  return function (dispatch) {
    if (!username && !password) {
      dispatch(signupErrorAction({
        errorMsgID: 'emptyUsernamePasswordFieldError',
        errorMsgText: 'Missing username and password',
      }));
    } else if (!username) {
      dispatch(signupErrorAction({
        errorMsgID: 'emptyUsernameFieldError',
        errorMsgText: 'Missing username',
      }));
    } else if (!password) {
      dispatch(signupErrorAction({
        errorMsgID: 'emptyPasswordFieldError',
        errorMsgText: 'Missing password',
      }));
    } else {
      dispatch(createUserInfoAction(username, password));
    }

    return;
  };
}

export function submitLoginAction(username, password) {
  return function (dispatch) {
    if (!username && !password) {
      dispatch(loginErrorAction({
        errorMsgID: 'emptyUsernamePasswordFieldError',
        errorMsgText: 'Missing username and password',
      }));
    } else if (!username) {
      dispatch(loginErrorAction({
        errorMsgID: 'emptyUsernameFieldError',
        errorMsgText: 'Missing username',
      }));
    } else if (!password) {
      dispatch(loginErrorAction({
        errorMsgID: 'emptyPasswordFieldError',
        errorMsgText: 'Missing password',
      }));
    } else {
      dispatch(loginUserAction(username, password));
    }

    return;
  };
}