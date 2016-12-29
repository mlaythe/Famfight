import * as types from './../actions/actionTypes.js';

const initialState = {
  username: '',
  password: '',
  error: '',
};

function userStateReducer(state = initialState, action) {
  switch (action.type) {
    case types.USERNAME_INPUT:
      return Object.assign({}, state, { username: action.usernameInput });
    case types.PASSWORD_INPUT:
      return Object.assign({}, state, { password: action.passwordInput });
    case (types.ERROR):
      return Object.assign({}, state, { error: action.error });
    default:
      return state;
  }
}

export default userStateReducer;