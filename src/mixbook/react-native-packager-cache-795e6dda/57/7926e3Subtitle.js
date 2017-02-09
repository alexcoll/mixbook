
'use strict';Object.defineProperty(exports,"__esModule",{value:true});

var _react=require('react');var _react2=babelHelpers.interopRequireDefault(_react);
var _reactNative=require('react-native');
var _NativeBaseComponent2=require('../Base/NativeBaseComponent');var _NativeBaseComponent3=babelHelpers.interopRequireDefault(_NativeBaseComponent2);var


Subtitle=function(_NativeBaseComponent){babelHelpers.inherits(Subtitle,_NativeBaseComponent);function Subtitle(){babelHelpers.classCallCheck(this,Subtitle);return babelHelpers.possibleConstructorReturn(this,(Subtitle.__proto__||Object.getPrototypeOf(Subtitle)).apply(this,arguments));}babelHelpers.createClass(Subtitle,[{key:'render',value:function render()

{var _this2=this;
return(
_react2.default.createElement(_reactNative.View,null,_react2.default.createElement(_reactNative.Text,{ref:function ref(c){return _this2._root=c;},style:{color:this.getTheme().subtitleColor,fontSize:this.getTheme().subTitleFontSize,alignSelf:_reactNative.Platform.OS==='ios'?'center':'flex-start'}},this.props.children)));

}}]);return Subtitle;}(_NativeBaseComponent3.default);exports.default=Subtitle;