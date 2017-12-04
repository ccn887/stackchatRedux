import React, { Component } from 'react';
import NameEntry from './NameEntry'
import store from '../store'

export default class Navbar extends Component {

  render () {
    return (
      <nav>
        <h3># channelname goes here</h3>
        <NameEntry />
      </nav>
    );
  }
}
