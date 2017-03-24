import React, { Component } from 'react';
import { StyleSheet, View, Image, TextInput, TouchableOpacity, Text } from 'react-native';

export default AccountForm = (props) => {
		return (
		<View style={styles.container}>
			<TextInput
				underlineColorAndroid={'transparent'}
				placeholder="Username"
				style={styles.input}
				returnKeyType="next"
				autoCorrect={false}
				onChangeText = {props.updateUsername}
			/>
			<TextInput
				underlineColorAndroid={'transparent'}
				placeholder="First Name"
				style={styles.input}
				returnKeyType="next"
				autoCorrect={false}
				onChangeText = {props.updateFirstName}
			/>
			<TextInput
				underlineColorAndroid={'transparent'}
				placeholder="Last Name"
				style={styles.input}
				returnKeyType="next"
				autoCorrect={false}
				onChangeText = {props.updateLastName}
			/>
			<TextInput
				underlineColorAndroid={'transparent'}
				placeholder="Email"
				style={styles.input}
				returnKeyType="next"
				autoCapitalize="none"
				autoCorrect={false}
				onChangeText={props.updateEmail}
			/>
			<TextInput
				underlineColorAndroid={'transparent'}
				placeholder="Password"
				style={styles.input}
				secureTextEntry
				returnKeyType="go"
				autoCapitalize="none"
				autoCorrect={false}
				onChangeText={props.updatePassword1}
			/>
			<TextInput
				underlineColorAndroid={'transparent'}
				placeholder="Enter Password Again"
				style={styles.input}
				secureTextEntry
				returnKeyType="go"
				autoCapitalize="none"
				autoCorrect={false}
				onChangeText={props.updatePassword2}
			/>
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
});
