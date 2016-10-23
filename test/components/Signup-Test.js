// import React from 'react';
// import { mount } from 'enzyme';
// import { expect } from 'chai';
// import sinon from 'sinon';
// import Login from './../../src/components/Login/Login.js';
// import FormInput from './../../src/components/FormInputs/FormInput.js';
// import RectangleButton from './../../src/components/RectangleButton/RectangleButton.js';
// import ErrorMessage from './../../src/components/ErrorMessage/ErrorMessage.js';

// describe('Login Component', () => {

//   const loginFunctions = {
//     updateUserEmail: sinon.spy(),
//     updateUserPassword: sinon.spy(),
//     submitLoginForm: sinon.spy(),
//   };
//   const error = {
//     errorMsgID: 'noError',
//     errorMsgText: '',
//   };
//   const wrapper = mount(<Login loginFunctions={loginFunctions} errorMessage={error} />);

//   it('should render two form input components', () => {
//     expect(wrapper.find(FormInput)).to.have.length(2);
//   });

//   it('should render one email input', () => {
//     expect(wrapper.find('input [type="email"]')).to.have.length(1);
//   });

//   it('should render one password input', () => {
//     expect(wrapper.find('input [type="password"]')).to.have.length(1);
//   });

//   it('should render a login header', () => {
//     expect(wrapper.find('h1')).to.have.length(1);
//   });

//   it('should render a submit button', () => {
//     expect(wrapper.find(RectangleButton)).to.have.length(1);
//   });

//   it('should render a form', () => {
//     expect(wrapper.find('form')).to.have.length(1);
//   });

//   it('should render an error message component', () => {
//     expect(wrapper.find(ErrorMessage)).to.have.length(1);
//   });

//   it('should render empty error message if no error', () => {
//     const error = {
//       errorMsgID: 'noError',
//       errorMsgText: '',
//     };
//     const wrapper = mount(<Login loginFunctions={loginFunctions} errorMessage={error} />);
//     expect(wrapper.find('#noError').text()).to.equal(error.errorMsgText);
//   });

//   it('should render an errorMessage with the id and text passed to it by props', () => {
//     const error = {
//       errorMsgID: 'testError',
//       errorMsgText: 'testText',
//     };
//     const wrapper = mount(<Login loginFunctions={loginFunctions} errorMessage={error} />);
//     expect(wrapper.find(`#${error.errorMsgID}`).text()).to.equal(error.errorMsgText);
//   });

//   it('should call updateUserEmail function on email input change', () => {
//     wrapper.find('input [type="email"]').simulate('change');
//     expect(loginFunctions.updateUserEmail.callCount).to.equal(1);
//   });

//   it('should call updateUserPassword function on password input change', () => {
//     wrapper.find('input [type="password"]').simulate('change');
//     expect(loginFunctions.updateUserPassword.callCount).to.equal(1);
//   });

//   it('should call submitLoginForm function when login form is submitted', () => {
//     wrapper.find('button').simulate('click');
//     expect(loginFunctions.submitLoginForm.callCount).to.equal(1);
//   });
// });