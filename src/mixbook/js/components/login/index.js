import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Image, Text, KeyboardAvoidingView, TouchableOpacity, Alert, Linking } from 'react-native';

import * as GLOBAL from '../../globals';

import LoginForm from './LoginForm';
import navigateTo from '../../actions/sideBarNav';
import { actions } from 'react-native-navigation-redux-helpers';

import styles from './styles';

import store from 'react-native-simple-store';

const {
  replaceAt,
} = actions;

class Login extends Component {

  static propTypes = {
    openDrawer: React.PropTypes.func,
    replaceAt: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    })
  }

  constructor(props) {
    super(props);
    this.state = {
      inputUsername: '',
      inputPassword: ''
    };
  }

  replaceAt(route) {
    this.props.replaceAt('login', { key: route }, this.props.navigation.key);
  }

  updateUsername = (text) => {
    this.setState({inputUsername: text})
  }

  updatePassword = (text) => {
    this.setState({inputPassword: text})
  }

  checkInput() {
    if (this.state.inputUsername == '') {
      Alert.alert(
        "Invalid Username",
        'Username field cannot be blank',
        [
          {text: 'Dismiss', style: 'cancel'}
        ],
        { cancelable: true }
      );
      return false;
    }

    if (this.state.inputPassword == '') {
      Alert.alert(
        "Invalid Password",
        'Password field cannot be blank',
        [
          {text: 'Dismiss', style: 'cancel'}
        ],
        { cancelable: true }
      );
      return false;
    }

    return true;
  }


  showServerErrorAlert(response) {
    Alert.alert(
      "Server Error",
      "Got response: " + response.status + " " + response.statusText,
      [
        {text: 'Dismiss', style: 'cancel'}
      ],
      { cancelable: true }
    );
  }


  showBadInfoAlert() {
    Alert.alert(
      "Authenitcation Failed",
      'Incorrect Email/Password, please try again.',
      [
        {text: 'Dismiss', style: 'cancel'}
      ],
      { cancelable: true }
    );
  }


  submitToServer() {
    global.username = this.state.inputUsername;
    console.log(`${GLOBAL.API.BASE_URL}/mixbook/auth`);
    fetch(GLOBAL.API.BASE_URL + '/mixbook/auth', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.inputUsername,
        password: this.state.inputPassword
      })
    })
    .then(async (response) => {
      if (response.status == 200) {
        var json = await response.json();
        this.updateDatabase(json.token);
        return;
      } else if (response.status === 401) {
        this.showBadInfoAlert();
        return;
      } else {
        this.showServerErrorAlert(response);
        return;
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }


  updateDatabase(token: string) {
    // Get user profile information
    fetch(`${GLOBAL.API.BASE_URL}/mixbook/user/getUserInfo`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': token,
      }
    })
    .then(async (response) => {
      if (response.status == 200) {
        var json = await response.json();
        store.save('account', {
          isLoggedIn: true,
          isGuest: false,
          token: token,
          userInfo: {
            username: json.username,
            email: json.email,
            firstName: json.firstName,
            lastName: json.lastName
          }
        })
        .then(() => {
          this.replaceAt('mydrinks');
        })
        .catch((error) => {
          console.warn("error updating account local store");
          console.warn(error.message);
        });
        return;
      } else {
        this.showServerErrorAlert(response);
        return;
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }


  onSubmitLogin() {
    if (this.checkInput()) {
      this.submitToServer();
    }
  }


  onSubmitNoAccount() {
    store.save('account', {
      isLoggedIn: true,
      isGuest: true,
      token: "",
      userInfo: {
        username: "guest_user",
        email: "guest@mymixbook.com",
        firstName: "Guest",
        lastName: "User",
      }
    }).then(() => {
      store.save('inventory', []);
      store.save('recipes', []);
      this.replaceAt('mydrinks');
    }).catch((error) => {
      console.warn("error updating account local store");
      console.warn(error.message);
    })
  }


  onSubmitCreateAccount() {
    this.replaceAt('newAccount');
  }


  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.noAccount}>
          <TouchableOpacity
            style={styles.noAccountingButtonContainer}
            onPress={() => this.onSubmitNoAccount()}
          >
            <Text style={styles.noAccountButtonText}>Continue With No Account</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.newAccount}>
          <TouchableOpacity
            style={styles.newAccountButtonContainer}
            onPress={() => this.onSubmitCreateAccount()}>
            <Text style={styles.noAccountButtonText}>Create An Account</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require('../../../img/drink-emoji.png')}
          />
          <Text style={styles.title}>Welcome To Mixbook!</Text>
        </View>
        <View style ={styles.formContainer}>
          <LoginForm
            updateUsername = {this.updateUsername}
            updatePassword = {this.updatePassword}
            login = {this.login}
          />
          <View style={styles.Bcontainer}>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => this.onSubmitLogin()}
            >
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.Bcontainer}>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={ ()=> Linking.openURL('https://mymixbook.com/mixbook/user/requestReset')}
            >
              <Text style={styles.buttonText}>Forgot Password</Text>
            </TouchableOpacity>
          </View>

        </View>
      </KeyboardAvoidingView>
    );
  }

  onSubmitPressed() {
    this.props.navigator.push({
      title: "Recipes",
      component: recipes
    });
  }

}

  function bindAction(dispatch) {
    return {
      openDrawer: () => dispatch(openDrawer()),
      replaceAt: (routeKey, route, key) => dispatch(replaceAt(routeKey, route, key))
    };
  }

  const mapStateToProps = state => ({
    navigation: state.cardNavigation
  });

  export default connect(mapStateToProps, bindAction)(Login);
