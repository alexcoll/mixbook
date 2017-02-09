import React, { Component } from 'react';
import { connect } from 'react-redux';

import { StyleSheet, View, Image, Text, KeyboardAvoidingView } from 'react-native';
import LoginForm from './LoginForm';
import navigateTo from '../../actions/sideBarNav';

class Login extends Component {
	
  static propTypes = {
    navigateTo: React.PropTypes.func,
  }

  navigateTo(route) {
    this.props.navigateTo(route, 'myrecipes');
  }

	constructor() {
		super()
		this.state = {
			username: '',
			password:''
		}
	}

	

	updateUsername = (text) => {
		this.setState({username: text})
	}

	updatePassword = (text) => {
		this.setState({password: text})
	}

	login = () => {
		this._navigate.bind(this)
		{/*alert('username: ' + this.state.username + '\npassword: ' + this.state.password)*/}
	}

	render() {
		return (
			<KeyboardAvoidingView behavior="padding" style={styles.container}>
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
				</View>
			</KeyboardAvoidingView>

		);
	}

}


const styles = StyleSheet.create({
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
	}

});


function bindAction(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(Login);