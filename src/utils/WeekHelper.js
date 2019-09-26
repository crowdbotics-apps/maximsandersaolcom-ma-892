import React from 'react';
import { AsyncStorage, AppState } from 'react-native';
import moment from 'moment';

export default class WeekHelper {
  constructor(id, userEmail, callbackAppChange) {
    this.id = id;
    this.userEmail = userEmail;
    this.setListeners();
    this.appState = '';
    this.callback = callbackAppChange;
  }

  setListeners = async () => {
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  handleAppStateChange = (nextAppState) => {
    if (this.appState.match(/inactive|background/) && nextAppState === 'active') {
      this.checkIsExisting(this.id)
        .then((isExisting) => {
          this.callback(isExisting);
        });
    }
    this.appState = nextAppState;
  };

  checkIsExisting = async (id) => {
    const isExisting = await AsyncStorage.getItem(`@id:${id}`);
    if (isExisting !== null) {
      const parseData = JSON.parse(isExisting);
      return parseData;
    }
    return false;
  }

  addToStorage = async (id, userEmail, date) => {
    const jsonStringify = JSON.stringify({ id, userEmail, date: moment(new Date(date)) });
    return AsyncStorage.setItem(`@id:${id}`, jsonStringify);
  }

  removeAll = () => {
    this.id = '';
    this.userEmal = '';
    this.appState = '';
    AppState.removeEventListener('change', this.handleAppStateChange);
  }
}

let instance = null;
WeekHelper.getInstance = (id, userEmail, callbackAppChange) => {
  if (instance === null) {
    instance = new WeekHelper(id, userEmail, callbackAppChange);
  }
  return instance;
};
