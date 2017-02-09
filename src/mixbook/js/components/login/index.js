import React, { Component } from 'react';
import { connect } from 'react-redux';

import { StyleSheet, View, Image, Text, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import LoginForm from './LoginForm';
import navigateTo from '../../actions/sideBarNav';
import { actions } from 'react-native-navigation-redux-helpers';

const {
  replaceAt,
} = actions;

class Login extends Component {
	
	constructor(props) {
		super(props)
		this.state = {
			username: '',
			password:''
		}
	}

	  static propTypes = {
    openDrawer: React.PropTypes.func,
    replaceAt: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
}

	updateUsername = (text) => {
		this.setState({username: text})
	}

	updatePassword = (text) => {
		this.setState({password: text})
	}

	_login = () => {
		navigator.replace({
        id: 'login',
      });
		{/*alert('username: ' + this.state.username + '\npassword: ' + this.state.password)*/}
	}

	replaceAt(route) {
    	this.props.replaceAt('login', { key: route }, this.props.navigation.key);
	}

	render() {
		return (
			<KeyboardAvoidingView behavior="padding" style={styles.container}>
				<View style={styles.noAccount}>
						<TouchableOpacity 
							style={styles.noAccountingButtonContainer}
							onPress={() => this.replaceAt('mydrinks')}>
						<Text style={styles.noAccountButtonText}>Continue with no account</Text>
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
						onPress={() => this.replaceAt('mydrinks')}>
						<Text style={styles.buttonText}>LOGIN</Text>
					</TouchableOpacity>
					</View>
				</View>
			</KeyboardAvoidingView>

		);
	}

	onSubmitPressed() {
        this.props.navigator.push({
            title: "Recipes",
            component: recipes,
        });
    }

}



const styles = StyleSheet.create({
	noAccount: {
		top: 5,
		left: 5,
		width: 100,
		height: 150
	},
	noAccountButtonText: {
		textAlign: 'center',
		color: '#FFFFFF',
		fontWeight: '400'
	},
	container: {
		flex:1,
		backgroundColor: '#3498db'
	},
	logoContainer: {
		alignItems: 'center',
		flexGrow: 1,
		justifyContent: 'center'
	},
	logo: {
		width:150,
		height:150
	},
	title: {
		color: '#FFF',
		marginTop: 10,
		width: 300,
		fontSize: 20,
		fontWeight: "bold",
		textAlign: 'center',
		opacity: 0.75
	},
	buttonContainer: {
		backgroundColor: '#2980b9',
		paddingVertical: 20,
		
	},
	Bcontainer: {
		padding: 20
	},
	noAccountingButtonContainer: {
		backgroundColor: '#2980b9',
		paddingVertical: 2,
		height: 42
	},
	buttonText: {
		textAlign: 'center',
		color: '#FFFFFF',
		fontWeight: '700'
	}

});


function bindAction(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
    replaceAt: (routeKey, route, key) => dispatch(replaceAt(routeKey, route, key)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(Login);