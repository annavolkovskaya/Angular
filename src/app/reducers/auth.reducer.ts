import { ActionReducer, Action } from '@ngrx/store';
import { State, intitialState } from '../state/main.state';
import * as types from '../actions/auth.action.types';

export const authStoreReducer: ActionReducer<State> =
  (state = intitialState, action: Action) => {
    switch (action.type) {

      case types.LOGIN: {
        const { payload: { username } } = action;
        return {
          ...state,
          isLoggedIn: true,
          username
        };
      }

      case types.LOGOUT: {
        return {
          ...state,
          isLoggedIn: false,
          username: ''
        };
      }

      default: {
        return state;
      }
    }
  };
