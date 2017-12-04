import React, {Component} from 'react';
import store, { removeMessage, deleteMessages } from '../store'

export default class Message extends Component {
  constructor(){
    super()
    this.state = store.getState()
    this.clickHandler = this.clickHandler.bind(this)
  }

  componentDidMount() {

    this.unsubscribeFromStore = store.subscribe(() => this.setState(store.getState()))
  }

  componentWillUnmount() {

    this.unsubscribeFromStore()
  }
clickHandler(e){
  const thunk = deleteMessages(e);
  store.dispatch(thunk);
 store.dispatch(removeMessage(this.props.message))
}

  render() {
    const message = this.props.message;
    return (
      <li className="media">
        <div className="media-left">
          <a href="#">
            <img className="media-object" src={message.author.image} alt="image" />
          </a>
        </div>
        <div className="media-body">
          <h4 className="media-heading">{message.author.name}</h4>
          {message.content}
          <button onClick={() => {this.clickHandler(message.id)} }>DELETE!</button>
        </div>
      </li>
    );
  }
}
