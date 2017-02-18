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


	submitToServer() {
		return fetch('https://activitize.net/mixbook/user/createUser', {
  		method: 'POST',
  		headers: {
    		'Accept': 'application/json',
    		'Content-Type': 'application/json',
  		},
  		body: JSON.stringify({
				username: "test",
				password: "test",
				firstName: "Test",
				lastName: "User",
				email: "test@example.com"
			})
		});
	}


	onSubmit() {
		// Make sure all of the input fields are filled out and valid
		if (this.state.inputFirstName == '') {
			alert('Please enter your first name');
			return;
		}
		if (this.state.inputLastName == '') {
			alert('Please enter your last name');
			return;
		}
		if (this.state.inputEmail.indexOf('@') == -1 || this.state.inputEmail.indexOf('.') == -1) {
			alert('Please enter a valid email');
			return;
		}
		if (this.state.inputPassword1 == '' || this.state.inputPassword2 == '') {
			alert('Please enter a password');
			return;
		}
		if (this.state.inputPassword1 != this.state.inputPassword2) {
			alert('Please enter matching passwords');
			return;
		}

		// Send create account request to the server
		var result = true;


    // Go back to login screen if successful
    if (result) {
    	this.replaceAt('login');
    	Alert.alert(
        "Account Created",
        'Please log in with your new credentials',
        [
          {text: 'Dismiss', style: 'cancel'}
        ],
        { cancelable: true }
      );
		} else {
			Alert.alert(
        "Create Account Failed",
        'Something went wrong on the server. Please try again. Maybe someone already is using that email?',
        [
          {text: 'Dismiss', style: 'cancel'}
        ],
        { cancelable: true }
      );
		}
	}


	render() {
		return (
			<KeyboardAvoidingView behavior="padding" style={styles.container}>
				<View style={styles.noAccount}>
					<TouchableOpacity
						style={styles.noAccountingButtonContainer}
						onPress={() => this.replaceAt('login')}
					>
						<Text style={styles.noAccountButtonText}>Go back to login screen</Text>
					</TouchableOpacity>
				</View>

				<View style={styles.logoContainer}>
					<Image
						style={styles.logo}
						source={require('../../../img/drink-emoji.png')}
						/>
						<Text style={styles.title}>Create a Mixbook account:</Text>
				</View>

				<View style ={styles.formContainer}>
					<AccountForm
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
			</KeyboardAvoidingView>

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
