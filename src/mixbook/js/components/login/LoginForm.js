import React, { Component } from 'react';
import { StyleSheet, View, Image, TextInput, TouchableOpacity, Text } from 'react-native';

export default  LoginForm  = (props) => {
			
		return (
			<View style={styles.container}>
				<TextInput 
					underlineColorAndroid={'transparent'}
					placeholder="Username"
					style={styles.input}
					returnKeyType="next"
					keyboardType="email-address"
					autoCapitalize="none"
					autoCorrect={false}
					onChangeText = {props.updateUsername}
					/>
				<TextInput 
					underlineColorAndroid={'transparent'}
					placeholder="Password"
					style={styles.input}
					secureTextEntry
					returnKeyType="go"
					onChangeText = {props.updatePassword}
					/>
					<TouchableOpacity 
						style={styles.buttonContainer}
						onPress = { () => props.login(props.username, props.password)}>
						<Text style={styles.buttonText}>LOGIN</Text>
					</TouchableOpacity>
			</View>
		);


}
	

const styles = StyleSheet.create({
	container: {
		padding: 20
	},

	input: {
		height: 40,
		backgroundColor: 'rgba(255,255,255,0.7)',
		marginBottom: 20
	},
	buttonContainer: {
		backgroundColor: '#2980b9',
		paddingVertical: 20
	},
	buttonText: {
		textAlign: 'center',
		color: '#FFFFFF',
		fontWeight: '700'
	}

});