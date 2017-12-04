import React, { Component } from 'React'
import store, {updateName} from '../store'

export default class NameEntry extends Component {
  constructor() {
    super()
    this.state = store.getState()
  }
  componentDidMount() {
    this.unsubscribe = store.subscribe(() => this.setState(store.getState()))
  }
  componentWillUnmount() {
    this.unsubscribe()
  }

  handleChange(e){
    const action = updateName(e.target.value)
    store.dispatch(action)
  }

  render() {
    return (
      <form className="form-inline">
        <label htmlFor="name">Your name:</label>
        <input
          type="text"
          name="name"
          onChange= {this.handleChange}
          placeholder="Enter your name"
          className="form-control"
        />
      </form>
    )
  }
}
