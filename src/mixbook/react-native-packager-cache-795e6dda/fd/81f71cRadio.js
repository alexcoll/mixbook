
'use strict';Object.defineProperty(exports,"__esModule",{value:true});

var _react=require('react');var _react2=babelHelpers.interopRequireDefault(_react);
var _reactNative=require('react-native');
var _NativeBaseComponent2=require('../Base/NativeBaseComponent');var _NativeBaseComponent3=babelHelpers.interopRequireDefault(_NativeBaseComponent2);
var _Ionicons=require('react-native-vector-icons/Ionicons');var _Ionicons2=babelHelpers.interopRequireDefault(_Ionicons);var

Radio=function(_NativeBaseComponent){babelHelpers.inherits(Radio,_NativeBaseComponent);function Radio(){babelHelpers.classCallCheck(this,Radio);return babelHelpers.possibleConstructorReturn(this,(Radio.__proto__||Object.getPrototypeOf(Radio)).apply(this,arguments));}babelHelpers.createClass(Radio,[{key:'getInitialStyle',value:function getInitialStyle()

{
return{
radio:{}};

}},{key:'render',value:function render()

{var _this2=this;
return(
_react2.default.createElement(_reactNative.TouchableOpacity,babelHelpers.extends({ref:function ref(c){return _this2._root=c;}},this.props),
_reactNative.Platform.OS==='ios'?
_react2.default.createElement(_Ionicons2.default,{name:this.props.selected?'ios-radio-button-on':'ios-radio-button-off-outline',style:{color:this.props.selected?this.getTheme().radioSelectedColor:this.getTheme().radioColor,lineHeight:this.getTheme().radioBtnSize+4,fontSize:this.getTheme().radioBtnSize}}):

_react2.default.createElement(_Ionicons2.default,{name:this.props.selected?'md-radio-button-on':'md-radio-button-off',style:{color:this.props.selected?this.getTheme().radioSelectedColor:this.getTheme().radioColor,lineHeight:this.getTheme().radioBtnSize+1,fontSize:this.getTheme().radioBtnSize}})));



}}]);return Radio;}(_NativeBaseComponent3.default);exports.default=Radio;