import { createSelector } from '@ngrx/store';
import { AuthReducer } from '../reducers/index';
import { SideNavReducer } from '../reducers/side-nav.reducer';
import { UserChatsReducer } from '../reducers/user-chats.reducer';

export const selectAuth = (state) => {
  return state.authReducer;
};

export const selectSideNav = (state) => {
  return state.sideNavReducer;
};

export const selectUserChatsReducer = (state) => {
  return state.userChatsReducer;
};

export const selectUser = createSelector(
  selectAuth,
  (state: AuthReducer) => state.user,
);

export const selectIsSideNavOpened = createSelector(
  selectSideNav,
  (state: SideNavReducer) => state.isOpened,
);

export const selectUserChats = createSelector(
  selectUserChatsReducer,
  (state: UserChatsReducer) => state.chats,
);

export const selectSelectedChat = createSelector(
  selectUserChatsReducer,
  (state: UserChatsReducer) => state.selectedChat,
);
