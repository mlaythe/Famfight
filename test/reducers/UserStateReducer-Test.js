import React from 'react';
import { expect } from 'chai';
import * as types from './../../src/actions/actionTypes.js';
import userStateReducer from './../../src/reducers/userStateReducer.js';

describe('User State Reducer', () => {
  
  const initialState = {
    username: '',
    password: '',
    emptyLoginField: false,
  };

  const usernameAddressAction = {
    type: types.USERNAME_ADDRESS_INPUT,
    usernameInput: 'hello@hi.com',
  };

  const passwordInputAction = {
    type: types.PASSWORD_INPUT,
    passwordInput: 'hola',
  };

  const emptySignupFieldAction = {
    type: types.EMPTY_SIGNUP_FIELD,
  };

  it('should return the initial state', () => {
    expect(userStateReducer(undefined, {})).to.eql(initialState);
  });

  it('should handle username address input action', () => {
    expect(userStateReducer(undefined, usernameAddressAction)).to.eql({
      username: 'hello@hi.com',
      password: '',
      emptySignupField: false,
    });
  });

  it('should handle password input action', () => {
    expect(userStateReducer(undefined, passwordInputAction)).to.eql({
      username: '',
      password: 'hola',
      emptySignupField: false,
    });
  });

  it('should handle missing signup password field', () => {
    const testState = {
      username: 'hello@hi.com',
      password: '',
      emptySignupField: false,
    };
    expect(userStateReducer(testState, emptySignupFieldAction)).to.eql({
      username: 'hello@hi.com',
      password: '',
      emptySignupField: true,
    });
  });

  it('should handle missing signup username field', () => {
    const testState = {
      username: '',
      password: 'hola',
      emptySignupField: false,
    };
    expect(userStateReducer(testState, emptySignupFieldAction)).to.eql({
      username: '',
      password: 'hola',
      emptySignupField: true,
    });
  });
});