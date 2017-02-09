Object.defineProperty(exports,"__esModule",{value:true});
var _react=require('react');var _react2=babelHelpers.interopRequireDefault(_react);
var _reactNative=require('react-native');
var _reactNativeCodePush=require('react-native-code-push');var _reactNativeCodePush2=babelHelpers.interopRequireDefault(_reactNativeCodePush);

var _nativeBase=require('native-base');
var _reactNativeModalbox=require('react-native-modalbox');var _reactNativeModalbox2=babelHelpers.interopRequireDefault(_reactNativeModalbox);

var _AppNavigator=require('./AppNavigator');var _AppNavigator2=babelHelpers.interopRequireDefault(_AppNavigator);
var _ProgressBar=require('./components/loaders/ProgressBar');var _ProgressBar2=babelHelpers.interopRequireDefault(_ProgressBar);

var _baseTheme=require('./themes/base-theme');var _baseTheme2=babelHelpers.interopRequireDefault(_baseTheme);

var styles=_reactNative.StyleSheet.create({
container:{
flex:1,
width:null,
height:null},

modal:{
justifyContent:'center',
alignItems:'center'},

modal1:{
height:300}});var



App=function(_Component){babelHelpers.inherits(App,_Component);

function App(props){babelHelpers.classCallCheck(this,App);var _this=babelHelpers.possibleConstructorReturn(this,(App.__proto__||Object.getPrototypeOf(App)).call(this,
props));
_this.state={
showDownloadingModal:false,
showInstalling:false,
downloadProgress:0};return _this;

}babelHelpers.createClass(App,[{key:'componentDidMount',value:function componentDidMount()

{var _this2=this;
_reactNativeCodePush2.default.sync({updateDialog:true,installMode:_reactNativeCodePush2.default.InstallMode.IMMEDIATE},
function(status){
switch(status){
case _reactNativeCodePush2.default.SyncStatus.DOWNLOADING_PACKAGE:
_this2.setState({showDownloadingModal:true});
_this2._modal.open();
break;
case _reactNativeCodePush2.default.SyncStatus.INSTALLING_UPDATE:
_this2.setState({showInstalling:true});
break;
case _reactNativeCodePush2.default.SyncStatus.UPDATE_INSTALLED:
_this2._modal.close();
_this2.setState({showDownloadingModal:false});
break;
default:
break;}

},
function(_ref){var receivedBytes=_ref.receivedBytes,totalBytes=_ref.totalBytes;
_this2.setState({downloadProgress:receivedBytes/totalBytes*100});
});

}},{key:'render',value:function render()

{var _this3=this;
if(this.state.showDownloadingModal){
return(
_react2.default.createElement(_nativeBase.Container,{theme:_baseTheme2.default,style:{backgroundColor:_baseTheme2.default.defaultBackgroundColor}},
_react2.default.createElement(_nativeBase.Content,{style:styles.container},
_react2.default.createElement(_reactNativeModalbox2.default,{
style:[styles.modal,styles.modal1],
backdrop:false,
ref:function ref(c){_this3._modal=c;},
swipeToClose:false},

_react2.default.createElement(_nativeBase.View,{style:{flex:1,alignSelf:'stretch',justifyContent:'center',padding:20}},
this.state.showInstalling?
_react2.default.createElement(_nativeBase.Text,{style:{color:_baseTheme2.default.brandPrimary,textAlign:'center',marginBottom:15,fontSize:15}},'Installing update...'):


_react2.default.createElement(_nativeBase.View,{style:{flex:1,alignSelf:'stretch',justifyContent:'center',padding:20}},
_react2.default.createElement(_nativeBase.Text,{style:{color:_baseTheme2.default.brandPrimary,textAlign:'center',marginBottom:15,fontSize:15}},'Downloading update... ',
parseInt(this.state.downloadProgress,10)+' %'),

_react2.default.createElement(_ProgressBar2.default,{color:'theme.brandPrimary',progress:parseInt(this.state.downloadProgress,10)})))))));







}

return _react2.default.createElement(_AppNavigator2.default,null);
}}]);return App;}(_react.Component);exports.default=


App;