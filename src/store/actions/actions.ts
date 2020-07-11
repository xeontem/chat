import { createAction, props } from '@ngrx/store';
import { User } from '../type-defs';

export const setUser = createAction('[User] Set', props<{ user: User }>());
