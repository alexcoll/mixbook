import { cardStackReducer } from 'react-native-navigation-redux-helpers';

import store from 'react-native-simple-store';


const initialState = {
  key: 'global',
  index: 0,
  routes: [
    {
      key: 'login',
      index: 0,
    },
  ],
};

module.exports = cardStackReducer(initialState);
