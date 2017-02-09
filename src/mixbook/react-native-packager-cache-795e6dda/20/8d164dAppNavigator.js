Object.defineProperty(exports,"__esModule",{value:true});
var _react=require('react');var _react2=babelHelpers.interopRequireDefault(_react);
var _reactNative=require('react-native');
var _reactRedux=require('react-redux');
var _nativeBase=require('native-base');
var _reactNativeNavigationReduxHelpers=require('react-native-navigation-redux-helpers');

var _drawer=require('./actions/drawer');

var _home=require('./components/home/');var _home2=babelHelpers.interopRequireDefault(_home);
var _recipes=require('./components/recipes/');var _recipes2=babelHelpers.interopRequireDefault(_recipes);
var _mydrinks=require('./components/mydrinks/');var _mydrinks2=babelHelpers.interopRequireDefault(_mydrinks);
var _ingredients=require('./components/ingredients/');var _ingredients2=babelHelpers.interopRequireDefault(_ingredients);
var _account=require('./components/account/');var _account2=babelHelpers.interopRequireDefault(_account);
var _login=require('./components/login/');var _login2=babelHelpers.interopRequireDefault(_login);
var _settings=require('./components/settings/');var _settings2=babelHelpers.interopRequireDefault(_settings);
var _splashscreen=require('./components/splashscreen/');var _splashscreen2=babelHelpers.interopRequireDefault(_splashscreen);
var _sidebar=require('./components/sidebar');var _sidebar2=babelHelpers.interopRequireDefault(_sidebar);
var _baseTheme=require('./themes/base-theme');var _baseTheme2=babelHelpers.interopRequireDefault(_baseTheme);var


_popRoute=_reactNativeNavigationReduxHelpers.actions.popRoute;var



NavigationCardStack=_reactNative.NavigationExperimental.CardStack;var


AppNavigator=function(_Component){babelHelpers.inherits(AppNavigator,_Component);function AppNavigator(){babelHelpers.classCallCheck(this,AppNavigator);return babelHelpers.possibleConstructorReturn(this,(AppNavigator.__proto__||Object.getPrototypeOf(AppNavigator)).apply(this,arguments));}babelHelpers.createClass(AppNavigator,[{key:'componentDidMount',value:function componentDidMount()











{var _this2=this;
_reactNative.BackAndroid.addEventListener('hardwareBackPress',function(){
var routes=_this2.props.navigation.routes;

if(routes[routes.length-1].key==='home'){
return false;
}

_this2.props.popRoute(_this2.props.navigation.key);
return true;
});
}},{key:'componentDidUpdate',value:function componentDidUpdate()

{
if(this.props.drawerState==='opened'){
this.openDrawer();
}

if(this.props.drawerState==='closed'){
this._drawer.close();
}
}},{key:'popRoute',value:function popRoute()

{
this.props.popRoute();
}},{key:'openDrawer',value:function openDrawer()

{
this._drawer.open();
}},{key:'closeDrawer',value:function closeDrawer()

{
if(this.props.drawerState==='opened'){
this.props.closeDrawer();
}
}},{key:'_renderScene',value:function _renderScene(

props){
switch(props.scene.route.key){
case'splashscreen':
return _react2.default.createElement(_splashscreen2.default,null);
case'login':
return _react2.default.createElement(_login2.default,null);
case'home':
return _react2.default.createElement(_home2.default,null);
case'mydrinks':
return _react2.default.createElement(_mydrinks2.default,null);
case'ingredients':
return _react2.default.createElement(_ingredients2.default,null);
case'recipes':
return _react2.default.createElement(_recipes2.default,null);
case'settings':
return _react2.default.createElement(_settings2.default,null);
case'account':
return _react2.default.createElement(_account2.default,null);
default:
return _react2.default.createElement(_home2.default,null);}

}},{key:'render',value:function render()

{var _this3=this;
return(
_react2.default.createElement(_nativeBase.Drawer,{
ref:function ref(_ref){_this3._drawer=_ref;},
type:'overlay',
tweenDuration:150,
content:_react2.default.createElement(_sidebar2.default,{navigator:this._navigator}),
tapToClose:true,
acceptPan:false,
onClose:function onClose(){return _this3.closeDrawer();},
openDrawerOffset:0.2,
panCloseMask:0.2,
styles:{
drawer:{
shadowColor:'#000000',
shadowOpacity:0.8,
shadowRadius:3}},


tweenHandler:function tweenHandler(ratio){
return{
drawer:{shadowRadius:ratio<0.2?ratio*5*5:5},
main:{
opacity:(2-ratio)/2}};


},
negotiatePan:true},

_react2.default.createElement(_reactNative.StatusBar,{
backgroundColor:_baseTheme2.default.statusBarColor,
barStyle:'default'}),

_react2.default.createElement(NavigationCardStack,{
navigationState:this.props.navigation,
renderOverlay:this._renderOverlay,
renderScene:this._renderScene})));



}}]);return AppNavigator;}(_react.Component);AppNavigator.propTypes={drawerState:_react2.default.PropTypes.string,popRoute:_react2.default.PropTypes.func,closeDrawer:_react2.default.PropTypes.func,navigation:_react2.default.PropTypes.shape({key:_react2.default.PropTypes.string,routes:_react2.default.PropTypes.array})};


var bindAction=function bindAction(dispatch){return{
closeDrawer:function closeDrawer(){return dispatch((0,_drawer.closeDrawer)());},
popRoute:function popRoute(key){return dispatch(_popRoute(key));}};};


var mapStateToProps=function mapStateToProps(state){return{
drawerState:state.drawer.drawerState,
navigation:state.cardNavigation};};exports.default=


(0,_reactRedux.connect)(mapStateToProps,bindAction)(AppNavigator);