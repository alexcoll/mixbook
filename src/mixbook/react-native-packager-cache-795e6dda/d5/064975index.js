Object.defineProperty(exports,"__esModule",{value:true});var _react=require('react');var _react2=babelHelpers.interopRequireDefault(_react);
var _reactNative=require('react-native');
var _reactRedux=require('react-redux');
var _nativeBase=require('native-base');

var _drawer=require('../../actions/drawer');
var _baseTheme=require('../../themes/base-theme');var _baseTheme2=babelHelpers.interopRequireDefault(_baseTheme);
var _styles=require('./styles');var _styles2=babelHelpers.interopRequireDefault(_styles);

var launchscreenBg=require('../../../img/launchscreen-bg.png');
var launchscreenLogo=require('../../../img/logo-mixbook.jpg');var

Home=function(_Component){babelHelpers.inherits(Home,_Component);function Home(){babelHelpers.classCallCheck(this,Home);return babelHelpers.possibleConstructorReturn(this,(Home.__proto__||Object.getPrototypeOf(Home)).apply(this,arguments));}babelHelpers.createClass(Home,[{key:'render',value:function render()





{
return(
_react2.default.createElement(_nativeBase.Container,{theme:_baseTheme2.default},
_react2.default.createElement(_reactNative.Image,{source:launchscreenBg,style:_styles2.default.imageContainer},
_react2.default.createElement(_nativeBase.View,{style:_styles2.default.logoContainer},
_react2.default.createElement(_reactNative.Image,{source:launchscreenLogo,style:_styles2.default.logo})),

_react2.default.createElement(_nativeBase.View,{style:{alignItems:'center',marginBottom:50,backgroundColor:'transparent'}},
_react2.default.createElement(_nativeBase.H3,{style:_styles2.default.text},'Mixbook'),
_react2.default.createElement(_nativeBase.View,{style:{marginTop:8}}),
_react2.default.createElement(_nativeBase.H3,{style:_styles2.default.text},'Mixology application'),
_react2.default.createElement(_nativeBase.H3,{style:_styles2.default.text},'(c) 2017 by The Boys of 103')),

_react2.default.createElement(_nativeBase.View,null,
_react2.default.createElement(_nativeBase.Button,{
style:{backgroundColor:'#6FAF98',alignSelf:'center'},
onPress:this.props.openDrawer},'Lets Go!')))));







}}]);return Home;}(_react.Component);Home.propTypes={openDrawer:_react2.default.PropTypes.func};


function bindActions(dispatch){
return{
openDrawer:function openDrawer(){return dispatch((0,_drawer.openDrawer)());}};

}

var mapStateToProps=function mapStateToProps(state){return{
navigation:state.cardNavigation};};exports.default=


(0,_reactRedux.connect)(mapStateToProps,bindActions)(Home);