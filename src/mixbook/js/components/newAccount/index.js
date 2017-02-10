import React, { Component } from 'react';
import { connect } from 'react-redux';
import AccountForm from './accountForm';
import { StyleSheet, View, Image, Text, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import navigateTo from '../../actions/sideBarNav';
import { actions } from 'react-native-navigation-redux-helpers';

const {
  replaceAt,
} = actions;

class NewAccount extends Component {

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

	replaceAt(route) {
    	this.props.replaceAt('newAccount', { key: route }, this.props.navigation.key);
	}

	render() {
		return (
			<KeyboardAvoidingView behavior="padding" style={styles.container}>

				<View style={styles.logoContainer}>
					<Image 
						style={styles.logo}
						source={require('../../../img/drink-emoji.png')} 
						/>
						<Text style={styles.title}>Please enter your information</Text>
				</View>
				<View style ={styles.formContainer}>
					<AccountForm 

					/>
					<View style={styles.Bcontainer}>
					<TouchableOpacity 
						style={styles.buttonContainer}
						onPress={() => this.replaceAt('login')}>
						<Text style={styles.buttonText}>Create Account!</Text>
					</TouchableOpacity>
					</View>
				</View>
			</KeyboardAvoidingView>

		);
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

export default connect(mapStateToProps, bindAction)(NewAccount);