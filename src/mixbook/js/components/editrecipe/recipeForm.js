import React, { Component } from 'react';
import { StyleSheet, View, Image, TextInput, TouchableOpacity, Text } from 'react-native';

export default  RecipeForm  = (props) => {

	return (
		<View style={styles.container}>
			<TextInput
				underlineColorAndroid={'transparent'}
				placeholder="Recipe Name"
				style={styles.input}
				returnKeyType="next"
				autoCapitalize="none"
				autoCorrect={false}
				onChangeText = {props.recipeName}
			/>
			<TextInput
				underlineColorAndroid={'transparent'}
				placeholder="Directions"
				style={styles.input}
				returnKeyType="next"
				onChangeText = {props.directions}
			/>
			<TextInput
				underlineColorAndroid={'transparent'}
				placeholder="Difficulty 0-5"
				style={styles.input}
				returnKeyType="go"
				onChangeText = {props.difficulty}
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
