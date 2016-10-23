import { expect } from 'chai';
import { usernameInputAction, passwordInputAction, emptyLoginFieldAction } from './../../src/actions/loginActions.js';
import * as types from './../../src/actions/actionTypes.js';

describe('Login Actions', () => {

  it('should create an action that a user is inputting an username address', () => {
    const usernameInput = 'hello@hi.com';
    const expectedAction = {
      type: types.USERNAME_ADDRESS_INPUT,
      usernameInput,
    };
    expect(usernameInputAction(usernameInput)).to.eql(expectedAction);
  });

  it('should create an action that a user is inputting a password', () => {
    const passwordInput = 'hola';
    const expectedAction = {
      type: types.PASSWORD_INPUT,
      passwordInput,
    };
    expect(passwordInputAction(passwordInput)).to.eql(expectedAction);
  });

  it('should create an action that a login field has been left blank', () => {
    const expectedAction = {
      type: types.EMPTY_LOGIN_FIELD,
    };
    expect(emptyLoginFieldAction()).to.eql(expectedAction);
  });
});