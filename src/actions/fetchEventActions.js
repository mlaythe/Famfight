import * as types from './actionTypes.js';

// Login
export function requestUserInfoAction() {
  return {
    type: types.FETCH_USER_INFO_REQUEST,
  };
}

export function receiveUserInfoAction(events) {
  return {
    type: types.FETCH_USER_INFO_SUCCESS,
    events,
  };
}

export function failureUserInfoAction() {
  return {
    type: types.FETCH_USER_INFO_FAILURE,
  };
}