import * as types from './actionTypes.js';

export function usernameInputAction(input) {
  return {
    type: types.USERNAME_ADDRESS_INPUT,
    usernameInput: input,
  };
}

export function passwordInputAction(input) {
  return {
    type: types.PASSWORD_INPUT,
    passwordInput: input,
  };
}

export function emptyLoginFieldAction() {
  return {
    type: types.EMPTY_LOGIN_FIELD,
  };
}