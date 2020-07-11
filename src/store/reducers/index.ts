import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  createReducer,
  on,
  MetaReducer,
  Action
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { setUser } from '../actions/actions';
import { User } from '../type-defs';


export interface AuthReducer {
  user: User;
}

const initialState: AuthReducer = {
  user: null,
};

const actionCreator = createReducer(initialState,
  on(setUser, (state, { user }) => {
    return ({ ...state, user });
  })
);

export const authReducer = (state = initialState, action: Action): AuthReducer => {
  const data = actionCreator(state, action);
  return data;
}

// export const reducers: ActionReducerMap<State> = {
//   authReducer,
// };


export const metaReducers: MetaReducer<AuthReducer>[] = !environment.production ? [] : [];
