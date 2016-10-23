import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { mount } from 'enzyme';
import { expect } from 'chai';
import nock from 'nock';
import SignupContainer from './../../src/containers/SignupContainer.js';
import reducers from './../../src/reducers/index.js';

const fakeStore = function (injectedState) {
  return createStore(
    reducers,
    injectedState,
    applyMiddleware(thunkMiddleware)
  );
};

describe('Signup Container Component', () => {

  it('should set state with username input on each change', () => {
    const testStore = fakeStore({});
    const wrapper = mount(
      <Provider store={testStore}>
        <LoginContainer />
      </Provider>
    );

    wrapper.find('input [type="text"]').simulate('change', { target: { value: 'a' } });
    expect(testStore.getState().userState.email).to.equal('a');
  });
});