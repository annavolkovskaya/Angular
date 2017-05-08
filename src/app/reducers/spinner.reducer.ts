import { ActionReducer, Action } from '@ngrx/store';
import { State, intitialState } from '../state/main.state';
import * as types from '../actions/spinner.action.types';

export const spinnerStoreReducer: ActionReducer<State> =
  (state = intitialState, action: Action) => {
    switch (action.type) {

      case types.SHOW_SPINNER: {
        return {
          ...state,
          isSpinnerShown: true
        };
      }

      case types.HIDE_SPINNER: {
        return {
          ...state,
          isSpinnerShown: false,
        };
      }

      default: {
        return state;
      }
    }
  };
