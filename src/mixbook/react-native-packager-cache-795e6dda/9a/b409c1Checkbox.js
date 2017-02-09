
'use strict';Object.defineProperty(exports,"__esModule",{value:true});

var _react=require('react');var _react2=babelHelpers.interopRequireDefault(_react);
var _reactNative=require('react-native');
var _NativeBaseComponent2=require('../Base/NativeBaseComponent');var _NativeBaseComponent3=babelHelpers.interopRequireDefault(_NativeBaseComponent2);
var _Ionicons=require('react-native-vector-icons/Ionicons');var _Ionicons2=babelHelpers.interopRequireDefault(_Ionicons);var

CheckBox=function(_NativeBaseComponent){babelHelpers.inherits(CheckBox,_NativeBaseComponent);function CheckBox(){babelHelpers.classCallCheck(this,CheckBox);return babelHelpers.possibleConstructorReturn(this,(CheckBox.__proto__||Object.getPrototypeOf(CheckBox)).apply(this,arguments));}babelHelpers.createClass(CheckBox,[{key:'getInitialStyle',value:function getInitialStyle()

{
return{
checkbox:{
borderRadius:_reactNative.Platform.OS==='ios'?13:2,
overflow:'hidden',
width:this.getTheme().checkboxSize,
height:this.getTheme().checkboxSize,
borderWidth:_reactNative.Platform.OS==='ios'?1:2,
paddingLeft:_reactNative.Platform.OS==='ios'?5:2,
paddingBottom:_reactNative.Platform.OS==='ios'?0:5,
borderColor:this.getTheme().checkboxBgColor,
backgroundColor:this.props.checked?this.getTheme().checkboxBgColor:'transparent'}};


}},{key:'render',value:function render()

{var _this2=this;
return(
_react2.default.createElement(_reactNative.TouchableOpacity,babelHelpers.extends({ref:function ref(c){return _this2._root=c;},style:this.getInitialStyle().checkbox},this.props),
_react2.default.createElement(_Ionicons2.default,{name:_reactNative.Platform.OS==='ios'?'ios-checkmark-outline':'md-checkmark',style:{color:this.props.checked?this.getTheme().checkboxTickColor:'transparent',lineHeight:_reactNative.Platform.OS==='ios'?this.getTheme().checkboxSize/0.93:this.getTheme().checkboxSize-5,marginTop:_reactNative.Platform.OS==='ios'?undefined:1,fontSize:_reactNative.Platform.OS==='ios'?this.getTheme().checkboxSize/0.8:this.getTheme().checkboxSize/1.2}})));


}}]);return CheckBox;}(_NativeBaseComponent3.default);exports.default=CheckBox;