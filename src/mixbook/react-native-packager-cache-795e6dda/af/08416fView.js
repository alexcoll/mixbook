
'use strict';Object.defineProperty(exports,"__esModule",{value:true});

var _react=require('react');var _react2=babelHelpers.interopRequireDefault(_react);
var _reactNative=require('react-native');
var _NativeBaseComponent2=require('../Base/NativeBaseComponent');var _NativeBaseComponent3=babelHelpers.interopRequireDefault(_NativeBaseComponent2);var


ViewNB=function(_NativeBaseComponent){babelHelpers.inherits(ViewNB,_NativeBaseComponent);function ViewNB(){babelHelpers.classCallCheck(this,ViewNB);return babelHelpers.possibleConstructorReturn(this,(ViewNB.__proto__||Object.getPrototypeOf(ViewNB)).apply(this,arguments));}babelHelpers.createClass(ViewNB,[{key:'render',value:function render()




{var _this2=this;
return(
_react2.default.createElement(_reactNative.View,babelHelpers.extends({ref:function ref(c){return _this2._root=c;},style:{padding:this.props.padder?this.getTheme().contentPadding:0,flex:1}},this.props)));

}}]);return ViewNB;}(_NativeBaseComponent3.default);exports.default=ViewNB;