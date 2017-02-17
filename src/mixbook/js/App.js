
import React, { Component } from 'react';
import { StyleSheet, AsyncStorage, Alert } from 'react-native';
//import CodePush from 'react-native-code-push';

import { Container, Content, Text, View } from 'native-base';
import Modal from 'react-native-modalbox';

import AppNavigator from './AppNavigator';
import store from 'react-native-simple-store';

import theme from './themes/base-theme';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { };
    this.setupAsyncStore();
  }


  setupAsyncStore() {
    // Setup recipies store
    store.save('recipes', {
      recipeList: ['Rum & Coke', 'Screwdriver'],
    })

    // Setup alcohol list
    store.save('alcohol', [
        {name: "McCormicks", type: "Vodka", proof: 80},
        {name: "Seagreams", type: "Gin", proof: 76}
    ]);

    // Setup mixer list
    store.save('mixers', [
        {brand: "Red Bull", name: "Energy Drink", type: "Soda"},
        {brand: "Tropicana", name: "Orange Juice", type: "Juice"}
    ]);
    store.get('mixers').then(data => {
      if (data == null) {
        store.save('mixers', []).then(data1 => {
          if (data1 == null) {
            console.warn("error with mixer store");
          }
        });
      }
    }).catch(error => {
      console.warn("error getting mixers key from store");
    });

  }


  render() {
    return <AppNavigator />;
  }
}

export default App;
