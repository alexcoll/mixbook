import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, Alert, View } from 'react-native';
import { actions } from 'react-native-navigation-redux-helpers';

import * as GLOBAL from '../../globals';

import store from 'react-native-simple-store';

const splashscreen = require('../../../img/splashscreen.png');

const {
  replaceAt,
} = actions;

class SplashScreen extends Component {

  static propTypes = {
    replaceAt: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    })
  }

  replaceAt(route) {
    this.props.replaceAt('splashscreen', { key: route }, this.props.navigation.key);
  }

  componentWillMount() {
    store.get('account')
    .then((data) => {
      console.log("isLoggedIn=" + data.token);
      
      if (data.token !== "") {
        // Get user profile information
        fetch(`${GLOBAL.API.BASE_URL}/mixbook/user/getUserInfo?username=${data.userInfo.username}`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Authorization': data.token,
          }
        })
        .then(async (response) => {
          if (response.status == 200) {
            var json = await response.json();
            // Store account details into local store
            store.update('account', {
              userInfo: {
                username: json.username,
                email: json.email,
                firstName: json.firstName,
                lastName: json.lastName,
              }
            })
            .then(() => {
              store.save('inventory', []);
              this.replaceAt('mydrinks');
            })
            .catch((error) => {
              console.warn("error updating account local store");
              console.warn(error.message);
            });


          } else {
            Alert.alert("Server connection error");
            console.warn(response);
            this.replaceAt('login');
          }
        })
        .catch((error) => {
          console.error(error);
          this.replaceAt('login');
        });
      } else {
        this.replaceAt('login');
      }
    })
    .catch((error) => {
      // console.warn("error getting account isLoggedIn key from local store");
      // console.warn(error);
      this.replaceAt('login');
    });


  }

  render() { // eslint-disable-line class-methods-use-this
    return (
      <View>
      </View>
    );
  }
}

function bindAction(dispatch) {
  return {
    replaceAt: (routeKey, route, key) => dispatch(replaceAt(routeKey, route, key))
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation
});

export default connect(mapStateToProps, bindAction)(SplashScreen);
