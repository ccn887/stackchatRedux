import { createStore } from 'redux'

const GOT_MESSAGES_FROM_SERVER = 'GOT_MESSAGES_FROM_SERVER';
const initialState = {
  messages: []
}

export const gotMessagesFromServer = messageArr => {
  return { type: GOT_MESSAGES_FROM_SERVER, messages: messageArr }
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case GOT_MESSAGES_FROM_SERVER:
      return Object.assign({}, state, { messages: action.messages })
     default: return state
  }

}

const store = createStore(reducer);
export default store
