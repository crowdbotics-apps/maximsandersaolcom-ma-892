import React, { Component } from 'react';
// Redux
import { Provider } from 'react-redux';
import reduxStore from './redux/reduxStore';
// Router
import Router from './Router';

const store = reduxStore();

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  } 
}