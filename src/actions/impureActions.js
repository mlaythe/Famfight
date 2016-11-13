import axios from 'axios';
import { requestUserInfoAction, receiveUserInfoAction, failureUserInfoAction } from './fetchEventActions.js';
import { emptySignupFieldAction } from './signupActions.js';
import { browserHistory } from 'react-router';

axios.defaults.adapter = require('axios/lib/adapters/http');

export function createUserInfoAction(username, password) {
  return function (dispatch) {
    return axios.post('http://localhost:8080/user/signup', { username, password })
      .then((response) => {
        if (!response.data.id_token) {
          throw new Error('Error signing up user.');
        }

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
    if (username && password) {
      dispatch(createUserInfoAction(username, password));
    } else {
      dispatch(emptySignupFieldAction());
    }
    return;
  };
}