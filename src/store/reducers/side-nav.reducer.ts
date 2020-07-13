import {
  createReducer,
  on,
  Action
} from '@ngrx/store';
import { toggleSideNav } from '../actions/actions';

export interface SideNavReducer {
  isOpened: Boolean;
}

const initialState: SideNavReducer = {
  isOpened: true,
};

const actionCreator = createReducer(initialState,
  on(toggleSideNav, (state) => {
    return ({ ...state, isOpened: !state.isOpened });
  })
);

export const sideNavReducer = (state = initialState, action: Action): SideNavReducer => {
  const data = actionCreator(state, action);
  return data;
}
