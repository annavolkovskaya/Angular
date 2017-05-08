import { ActionReducer, Action } from '@ngrx/store';
import { State, intitialState } from '../state/main.state';
import * as types from '../actions/courses.action.types';

export const coursesStoreReducer: ActionReducer<State> =
  (state = intitialState, action: Action) => {
    switch (action.type) {

      case types.DELETE_COURSE:
      case types.UPDATE_COURSE: {
        return {
          ...state,
          coursesNeedUpdate: true
        };
      }

      case types.UPDATE_LIST: {
        return {
          ...state,
          ...action.payload,
          coursesNeedUpdate: false,
          isSpinnerShown: false
        };
      }

      case types.ENABLE_EDIT_MODE: {
        return {
          ...state,
          editCourseMode: true
        };
      }

      case types.DISABLE_EDIT_MODE: {
        return {
          ...state,
          editCourseMode: false,
          currentCourse: null
        };
      }

      case types.CURRENT_COURSE: {
        return {
          ...state,
          ...action.payload
        };
      }

      case types.SEARCH: {
        return {
          ...state,
          ...action.payload,
          coursesNeedUpdate: true
        };
      }

      case types.NEXT_PAGE: {
        return {
          ...state,
          currentPage: ++state.currentPage,
          coursesNeedUpdate: true
        };
      }

      case types.PREVIOUS_PAGE: {
        return {
          ...state,
          currentPage: --state.currentPage,
          coursesNeedUpdate: true
        };
      }

      default: {
        return state;
      }
    }
  };
