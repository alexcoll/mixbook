Object.defineProperty(exports,"__esModule",{value:true});var _react=require('react');var _react2=babelHelpers.interopRequireDefault(_react);
var _reactRedux=require('react-redux');

var _reactNative=require('react-native');
var _LoginForm=require('./LoginForm');var _LoginForm2=babelHelpers.interopRequireDefault(_LoginForm);
var _sideBarNav=require('../../actions/sideBarNav');var _sideBarNav2=babelHelpers.interopRequireDefault(_sideBarNav);
var _reactNativeNavigationReduxHelpers=require('react-native-navigation-redux-helpers');var


_replaceAt=_reactNativeNavigationReduxHelpers.actions.replaceAt;var


Login=function(_Component){babelHelpers.inherits(Login,_Component);

function Login(props){babelHelpers.classCallCheck(this,Login);var _this=babelHelpers.possibleConstructorReturn(this,(Login.__proto__||Object.getPrototypeOf(Login)).call(this,
props));_this.














updateUsername=function(text){
_this.setState({username:text});
};_this.

updatePassword=function(text){
_this.setState({password:text});
};_this.

_login=function(){
navigator.replace({
id:'login'});

{}
};_this.state={username:'',password:''};return _this;}babelHelpers.createClass(Login,[{key:'replaceAt',value:function replaceAt(

route){
this.props.replaceAt('login',{key:route},this.props.navigation.key);
}},{key:'render',value:function render()

{var _this2=this;
return(
_react2.default.createElement(_reactNative.KeyboardAvoidingView,{behavior:'padding',style:styles.container},
_react2.default.createElement(_reactNative.View,{style:styles.logoContainer},
_react2.default.createElement(_reactNative.Image,{
style:styles.logo,
source:require('../../../img/drink-emoji.png')}),

_react2.default.createElement(_reactNative.Text,{style:styles.title},'Welcome To Mixbook!')),

_react2.default.createElement(_reactNative.View,{style:styles.formContainer},
_react2.default.createElement(_LoginForm2.default,{
updateUsername:this.updateUsername,
updatePassword:this.updatePassword,
login:this.login}),

_react2.default.createElement(_reactNative.View,{style:styles.Bcontainer},
_react2.default.createElement(_reactNative.TouchableOpacity,{
style:styles.buttonContainer,
onPress:function onPress(){return _this2.replaceAt('mydrinks');}},
_react2.default.createElement(_reactNative.Text,{style:styles.buttonText},'LOGIN'))))));






}},{key:'onSubmitPressed',value:function onSubmitPressed()

{
this.props.navigator.push({
title:"Recipes",
component:recipes});

}}]);return Login;}(_react.Component);Login.propTypes={openDrawer:_react2.default.PropTypes.func,replaceAt:_react2.default.PropTypes.func,navigation:_react2.default.PropTypes.shape({key:_react2.default.PropTypes.string})};





var styles=_reactNative.StyleSheet.create({
container:{
flex:1,
backgroundColor:'#3498db'},

logoContainer:{
alignItems:'center',
flexGrow:1,
justifyContent:'center'},

logo:{
width:150,
height:150},

title:{
color:'#FFF',
marginTop:10,
width:300,
fontSize:20,
fontWeight:"bold",
textAlign:'center',
opacity:0.75},

buttonContainer:{
backgroundColor:'#2980b9',
paddingVertical:20},

Bcontainer:{
padding:20},

buttonText:{
textAlign:'center',
color:'#FFFFFF',
fontWeight:'700'}});





function bindAction(dispatch){
return{
openDrawer:function(_openDrawer){function openDrawer(){return _openDrawer.apply(this,arguments);}openDrawer.toString=function(){return _openDrawer.toString();};return openDrawer;}(function(){return dispatch(openDrawer());}),
replaceAt:function replaceAt(routeKey,route,key){return dispatch(_replaceAt(routeKey,route,key));}};

}

var mapStateToProps=function mapStateToProps(state){return{
navigation:state.cardNavigation};};exports.default=


(0,_reactRedux.connect)(mapStateToProps,bindAction)(Login);