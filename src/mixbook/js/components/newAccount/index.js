import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Image, Text, KeyboardAvoidingView, TouchableOpacity, Alert } from 'react-native';

import { actions } from 'react-native-navigation-redux-helpers';

import AccountForm from './accountForm';
import navigateTo from '../../actions/sideBarNav';

import styles from './styles';

const {
  replaceAt,
} = actions;

class NewAccount extends Component {

	static propTypes = {
    	openDrawer: React.PropTypes.func,
    	replaceAt: React.PropTypes.func,
    	navigation: React.PropTypes.shape({
      		key: React.PropTypes.string,
    	}),
	}


	constructor(props) {
		super(props)
		this.state = {
			inputUsername: '',
			inputFirstName: '',
			inputLastName:'',
			inputEmail:'',
			inputPassword1:'',
			inputPassword2:''
		}
	}


	replaceAt(route) {
		this.props.replaceAt('newAccount', { key: route }, this.props.navigation.key);
	}


	updateUsername = (text) => {
		this.setState({inputUsername: text})
	}

	updateFirstName = (text) => {
		this.setState({inputFirstName: text})
	}

	updateLastName = (text) => {
		this.setState({inputLastName: text})
	}

	updateEmail = (text) => {
		this.setState({inputEmail: text})
	}

	updatePassword1 = (text) => {
		this.setState({inputPassword1: text})
	}

	updatePassword2 = (text) => {
		this.setState({inputPassword2: text})
	}


	checkInput() {
    if (this.state.inputUsername == '') {
			alert('Please enter a username');
			return false;
		}
    if (this.state.inputFirstName == '') {
			alert('Please enter your first name');
			return false;
		}
		if (this.state.inputLastName == '') {
			alert('Please enter your last name');
			return false;
		}
		if (this.state.inputEmail.indexOf('@') == -1 || this.state.inputEmail.indexOf('.') == -1) {
			alert('Please enter a valid email address');
			return false;
		}
		if (this.state.inputPassword1 == '' || this.state.inputPassword2 == '') {
			alert('Please enter a password');
			return false;
		}


    return true;
  }


	showServerErrorAlert(response) {
    Alert.alert(
      "Server/Network Error",
      "Got response: " + response.status + " " + response.statusText,
      [
        {text: 'Dismiss', style: 'cancel'}
      ],
      { cancelable: true }
    );
  }


  showServerInvalidAlert(json) {
  	Alert.alert(
      "Error",
      json.errorMessage,
      [
        {text: 'Dismiss', style: 'cancel'}
      ],
      { cancelable: true }
    );
  }


  submitToServer() {
    return fetch('https://activitize.net/mixbook/user/createUser', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.inputUsername,
				password: this.state.inputPassword1,
				firstName: this.state.inputFirstName,
				lastName: this.state.inputLastName,
				email: this.state.inputEmail
      })
    })
    .then(async (response) => {
      if (response.status == 200) {
        var json = await response.json();
        if (json.responseStatus == "OK") {
        	this.goToLogin();
        } else {
        	this.showServerInvalidAlert(json);
        }
      } else if (response.status == 401) {
        this.showBadInfoAlert();
        return;
      } else {
        return;
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }


  onSubmit() {
    // Do some simple input syntax checking
    if (this.checkInput()) {
      // Send info to server
      this.submitToServer();
    }
  }


	goToLogin() {
    // Go back to login screen if successful
    this.replaceAt('login');
    Alert.alert(
      "Account Created",
      'Please log in with your new credentials',
	    [
        {text: 'Dismiss', style: 'cancel'}
      ],
	    { cancelable: true }
    );
	}


	render() {
		return (
			<View behavior="padding" style={styles.container}>
				<View style={styles.noAccount}>
					<TouchableOpacity
						style={styles.noAccountingButtonContainer}
						onPress={() => this.replaceAt('login')}
					>
						<Text style={styles.noAccountButtonText}>Go back to login screen</Text>
					</TouchableOpacity>
				</View>

				<View style={styles.logoContainer}>
					{/*<Image
						style={styles.logo}
						source={require('../../../img/drink-emoji.png')}
					/>*/}
						<Text style={styles.title}>Create a Mixbook account:</Text>
				</View>

				<View style ={styles.formContainer}>
					<AccountForm
						updateUsername = {this.updateUsername}
						updateFirstName = {this.updateFirstName}
						updateLastName = {this.updateLastName}
						updateEmail = {this.updateEmail}
						updatePassword1 = {this.updatePassword1}
						updatePassword2 = {this.updatePassword2}
					/>
					<View style={styles.Bcontainer}>
						<TouchableOpacity
							style={styles.buttonContainer}
							onPress={() => this.onSubmit()}
						>
							<Text style={styles.buttonText}>Create Account!</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>

		);
	}
}


function bindAction(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
    replaceAt: (routeKey, route, key) => dispatch(replaceAt(routeKey, route, key)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(NewAccount);
