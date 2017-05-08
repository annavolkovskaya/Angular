import { combineReducers } from '@ngrx/store';
import { authStoreReducer } from './auth.reducer';
import { coursesStoreReducer } from './courses.reducer';
import { spinnerStoreReducer } from './spinner.reducer';

export const combinedReducer = combineReducers({
  authStoreReducer,
  coursesStoreReducer,
  spinnerStoreReducer
});
