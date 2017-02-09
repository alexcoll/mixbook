






















'use strict';

var React=require('react');
var ReactNative=require('react-native');var


I18nManager=




ReactNative.I18nManager,Image=ReactNative.Image,Platform=ReactNative.Platform,StyleSheet=ReactNative.StyleSheet,TouchableOpacity=ReactNative.TouchableOpacity;





var NavigationHeaderBackButton=function NavigationHeaderBackButton(props){return(
React.createElement(TouchableOpacity,{style:styles.buttonContainer,onPress:props.onPress},
React.createElement(Image,{style:styles.button,source:require('./assets/back-icon.png')})));};



NavigationHeaderBackButton.propTypes={
onPress:React.PropTypes.func.isRequired};


var styles=StyleSheet.create({
buttonContainer:{
flex:1,
flexDirection:'row',
alignItems:'center',
justifyContent:'center'},

button:{
height:24,
width:24,
margin:Platform.OS==='ios'?10:16,
resizeMode:'contain',
transform:[{scaleX:I18nManager.isRTL?-1:1}]}});



module.exports=NavigationHeaderBackButton;