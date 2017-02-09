Object.defineProperty(exports,"__esModule",{value:true});var _react=require('react');var _react2=babelHelpers.interopRequireDefault(_react);
var _reactNative=require('react-native');exports.default=

LoginForm=function LoginForm(props){

return(
_react2.default.createElement(_reactNative.View,{style:styles.container},
_react2.default.createElement(_reactNative.TextInput,{
underlineColorAndroid:'transparent',
placeholder:'Username',
style:styles.input,
returnKeyType:'next',
keyboardType:'email-address',
autoCapitalize:'none',
autoCorrect:false,
onChangeText:props.updateUsername}),

_react2.default.createElement(_reactNative.TextInput,{
underlineColorAndroid:'transparent',
placeholder:'Password',
style:styles.input,
secureTextEntry:true,
returnKeyType:'go',
onChangeText:props.updatePassword})));






};


var styles=_reactNative.StyleSheet.create({
container:{
padding:20},


input:{
height:40,
backgroundColor:'rgba(255,255,255,0.7)',
marginBottom:20}});