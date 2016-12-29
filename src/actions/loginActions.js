import * as types from './actionTypes.js';

export function usernameInputAction(input) {
  return {
    type: types.USERNAME_INPUT,
    usernameInput: input,
  };
}

export function passwordInputAction(input) {
  return {
    type: types.PASSWORD_INPUT,
    passwordInput: input,
  };
}

export function loginErrorAction(input) {
  return {
    type: types.ERROR,
    error: input,
  };
}