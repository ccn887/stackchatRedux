import React, { Component } from 'react';
import store, {writeMessage, gotNewMessage, postMessages} from '../store'
import axios from 'axios'
import socket from '../socket'

export default class NewMessageEntry extends Component {
  constructor(){
    super()
    this.state = store.getState()
    this.submitHandler = this.submitHandler.bind(this)
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => this.setState(store.getState()))
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  handleChange(e){
    const action = writeMessage(e.target.value)
    store.dispatch(action)
  }

  submitHandler(e){
    e.preventDefault()
    const channelId = +this.props.currentId
    const content = this.state.newMessageEntry
    const author = this.state.message.author

    const thunk = postMessages({content: content, channelId: channelId, author: author})


    store.dispatch(thunk)
  }

  render () {
    return (
      <form onSubmit={this.submitHandler} id="new-message-form">
        <div className="input-group input-group-lg">
          <input
            className="form-control"
            type="text"
            name="content"
            value={this.state.newMessageEntry}
            onChange={this.handleChange}
            placeholder="Say something nice..."
          />
          <span className="input-group-btn">
            <button className="btn btn-default" type="submit">Chat!</button>
          </span>
        </div>
      </form>
    );
  }
}
