import { createStore, applyMiddleware, compose } from 'redux'
import loggerMiddleware from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import axios from 'axios'
import socket from './socket'



const GOT_MESSAGES_FROM_SERVER = 'GOT_MESSAGES_FROM_SERVER';
const WRITE_MESSAGE = 'WRITE_MESSAGE';
const REMOVE_MESSAGE = 'REMOVE_MESSAGE';
const GOT_NEW_MESSAGE_FROM_SERVER = 'GOT_NEW_MESSAGE_FROM_SERVER';
const UPDATE_NAME = 'UPDATE_NAME'

const initialState = {
  messages: [],
  newMessageEntry: '',
  nameEntry: ''
}

let middy = applyMiddleware(loggerMiddleware, thunkMiddleware)

export const gotMessagesFromServer = messageArr => {
  return { type: GOT_MESSAGES_FROM_SERVER, messages: messageArr }
}

export const writeMessage = messageStr => {
  return { type: WRITE_MESSAGE, newMessageEntry: messageStr }
}
export const updateName = nameStr => {
  return { type: UPDATE_NAME, nameEntry: nameStr }
}
export const gotNewMessage = message => {
  return { type: GOT_NEW_MESSAGE_FROM_SERVER, message: message }
}
export const removeMessage = message => {
  return { type: REMOVE_MESSAGE, message: message.id }
}

export const fetchMessages = () => {

  return function thunk(dispatch) {
    return axios.get('/api/messages')
      .then(res => res.data)
      .then(messages => {
        const action = gotMessagesFromServer(messages)
        dispatch(action)
      })
  }
}

export const postMessages = (message) => {

  return function thunk(dispatch) {
    return axios.post('/api/messages', message)
      .then(res => res.data)
      .then(newMessage => {
        dispatch(gotNewMessage(newMessage))
        socket.emit('new-message', newMessage)
      })
  }
}
export const deleteMessages = (messageId) => {

  return function thunk(dispatch) {
    return axios.delete(`/api/messages/${messageId}`)
      .then(res => res.data)
      .then(message => {
        dispatch(removeMessage(messageId))
      })
  }
}


function reducer(state = initialState, action) {
  switch (action.type) {
    case GOT_MESSAGES_FROM_SERVER:
      return Object.assign({}, state, { messages: action.messages })
    case WRITE_MESSAGE:
      return Object.assign({}, state, { newMessageEntry: action.newMessageEntry })
    case REMOVE_MESSAGE:
      return Object.assign({}, state, { messages: state.messages.filter(message=> message.id !== action.message) })
    case UPDATE_NAME:
      return Object.assign({}, state, { nameEntry: action.nameEntry })
    case GOT_NEW_MESSAGE_FROM_SERVER:
      let newMsgArr = state.messages.concat(action.message)
      return Object.assign({}, state, { messages: state.messages.concat(action.message) })
    default: return state
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(middy))

export default store
