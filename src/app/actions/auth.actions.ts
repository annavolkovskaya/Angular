import * as types from './auth.action.types';

export function login(username) {
  return {
    type: types.LOGIN,
    payload: {
      username
    }
  };
}

export function logout() {
  return {
    type: types.LOGOUT
  };
}
