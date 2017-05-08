import * as types from './courses.action.types';

export function deleteCourse() {
  return {
    type: types.DELETE_COURSE
  };
}

export function updateList(list) {
  return {
    type: types.UPDATE_LIST,
    payload: {
      ...list
    }
  };
}

export function updateCourse() {
  return {
    type: types.UPDATE_COURSE
  };
}

export function enableEditMode() {
  return {
    type: types.ENABLE_EDIT_MODE
  };
}

export function disableEditMode() {
  return {
    type: types.DISABLE_EDIT_MODE
  };
}

export function currentCourse(currentCourse) {
  return {
    type: types.CURRENT_COURSE,
    payload: {
      currentCourse
    }
  };
}

export function search(searchQuery) {
  return {
    type: types.SEARCH,
    payload: {
      searchQuery,
      currentPage: 0
    }
  };
}

export function nextPage() {
  return {
    type: types.NEXT_PAGE
  };
}

export function prevPage() {
  return {
    type: types.PREVIOUS_PAGE
  };
}
