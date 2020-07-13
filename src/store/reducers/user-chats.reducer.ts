import {
  createReducer,
  on,
  Action
} from '@ngrx/store';
import { setUserChats, setSelectedChat, updateChatMessages } from '../actions/actions';

export interface UserChatsReducer {
  chats: any[];
  selectedChat: any,
}

const initialState: UserChatsReducer = {
  chats: [],
  selectedChat: null,
};

const forChats = createReducer(initialState,
  on(setUserChats, (state, { chats }) => {
    return ({ ...state, chats });
  })
);

const forSelectedChat = createReducer(initialState,
  on(setSelectedChat, (state, { chat }) => {
    return ({ ...state, selectedChat: chat });
  })
);

const forUpdateChatMessages = createReducer(initialState,
  on(updateChatMessages, (state, { name, messages }) => {
    const newState = { ...state };
    newState.chats = newState.chats.map(chat => {
      if (chat.name === name) {
        return { ...chat, messages };
      }
      return chat;
    });
    newState.selectedChat = newState.selectedChat ? newState.chats.find(chat => chat.name === state.selectedChat.name) : null;
    return newState;
  })
);

export const userChatsReducer = (state = initialState, action: Action): UserChatsReducer => {
  switch (action.type) {
    case setUserChats.type: {
      return forChats(state, action);
    }
    case setSelectedChat.type: {
      return forSelectedChat(state, action);
    }
    case updateChatMessages.type: {
      return forUpdateChatMessages(state, action);
    }
    default: {
      return state;
    }
  }
}
