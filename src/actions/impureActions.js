import axios from 'axios';
import { requestUserInfoAction, receiveUserInfoAction, failureUserInfoAction } from './fetchEventActions.js';
import { emptySignupFieldAction } from './signupActions.js';

axios.defaults.adapter = require('axios/lib/adapters/http');

export function fetchUserInfoAction(username, password) {
  return function (dispatch) {
    dispatch(requestUserInfoAction());
    return axios.post('http://localhost:8080/user/login', { username, password })
      .then((response) => {
        dispatch(receiveUserInfoAction(response.data.events));
      })
      .catch((error) => {
        console.log('inside catch');
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
  console.log(username);
  console.log('pass', password);
  return function (dispatch) {
    if (username && password) {
      dispatch(fetchUserInfoAction(username, password));
    } else {
      dispatch(emptySignupFieldAction());
    }
    return;
  };
}