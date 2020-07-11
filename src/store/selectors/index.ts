import { createSelector } from '@ngrx/store';
import { AuthReducer } from '../reducers/index';

export const selectAuth = (state: { authReducer: AuthReducer }) => {
  return state.authReducer;
};

export const selectUser = createSelector(
  selectAuth,
  (state: AuthReducer) => state.user
);
