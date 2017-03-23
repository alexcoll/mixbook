
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image } from 'react-native';
import { actions } from 'react-native-navigation-redux-helpers';

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
      console.log("isLoggedIn=" + data.userInfo.token);
      if (data.userInfo.token !== "") {
        setTimeout(() => {
          this.replaceAt('mydrinks');
        }, 500);
      } else {
        setTimeout(() => {
          this.replaceAt('login');
        }, 500);
      }
    })
    .catch((error) => {
      console.warn("error getting account isLoggedIn key from local store");
    });


  }

  render() { // eslint-disable-line class-methods-use-this
    return (
      <Image source={splashscreen} style={{ flex: 1, height: null, width: null }} />
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
