import * as types from './../actions/actionTypes.js';

const initialState = {
  username: '',
  password: '',
  emptySignupField: false,
};

function userStateReducer(state = initialState, action) {
  switch (action.type) {
    case types.USERNAME_INPUT:
      return Object.assign({}, state, { username: action.usernameInput });
    case types.PASSWORD_INPUT:
      return Object.assign({}, state, { password: action.passwordInput });
    case (types.EMPTY_SIGNUP_FIELD):
      return Object.assign({}, state, { emptySignupField: true });
    default:
      return state;
  }
}

export default userStateReducer;