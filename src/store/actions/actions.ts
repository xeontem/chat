import { createAction, props } from '@ngrx/store';
import { User } from '../type-defs';

export const setUser = createAction('[User] Set', props<{ user: User }>());

export const toggleSideNav = createAction('[SideNav] Toggle');

export const setUserChats = createAction('[Chats] Set chats', props<{ chats: any[] }>());

export const setSelectedChat = createAction('[Chats] Set selected chat', props<{ chat: any }>());

export const updateChatMessages = createAction('[Chats] update chat messages', props<{ name: String, messages: any[] }>());
