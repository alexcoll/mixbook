Object.defineProperty(exports,"__esModule",{value:true});var _react=require('react');var _react2=babelHelpers.interopRequireDefault(_react);
var _reactRedux=require('react-redux');

var _reactNative=require('react-native');
var _LoginForm=require('./LoginForm');var _LoginForm2=babelHelpers.interopRequireDefault(_LoginForm);
var _sideBarNav=require('../../actions/sideBarNav');var _sideBarNav2=babelHelpers.interopRequireDefault(_sideBarNav);var

Login=function(_Component){babelHelpers.inherits(Login,_Component);babelHelpers.createClass(Login,[{key:'navigateTo',value:function navigateTo(





route){
this.props.navigateTo(route,'myrecipes');
}}]);

function Login(){babelHelpers.classCallCheck(this,Login);var _this=babelHelpers.possibleConstructorReturn(this,(Login.__proto__||Object.getPrototypeOf(Login)).call(this));_this.









updateUsername=function(text){
_this.setState({username:text});
};_this.

updatePassword=function(text){
_this.setState({password:text});
};_this.

login=function(){
_this._navigate.bind(_this);
{}
};_this.state={username:'',password:''};return _this;}babelHelpers.createClass(Login,[{key:'render',value:function render()

{
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
login:this.login}))));





}}]);return Login;}(_react.Component);Login.propTypes={navigateTo:_react2.default.PropTypes.func};




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
opacity:0.75}});





function bindAction(dispatch){
return{
openDrawer:function(_openDrawer){function openDrawer(){return _openDrawer.apply(this,arguments);}openDrawer.toString=function(){return _openDrawer.toString();};return openDrawer;}(function(){return dispatch(openDrawer());})};

}

var mapStateToProps=function mapStateToProps(state){return{
navigation:state.cardNavigation};};exports.default=


(0,_reactRedux.connect)(mapStateToProps,bindAction)(Login);