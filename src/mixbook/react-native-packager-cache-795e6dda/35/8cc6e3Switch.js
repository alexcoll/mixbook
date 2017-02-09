
'use strict';Object.defineProperty(exports,"__esModule",{value:true});

var _react=require('react');var _react2=babelHelpers.interopRequireDefault(_react);
var _reactNative=require('react-native');
var _NativeBaseComponent2=require('../Base/NativeBaseComponent');var _NativeBaseComponent3=babelHelpers.interopRequireDefault(_NativeBaseComponent2);
var _computeProps=require('../../Utils/computeProps');var _computeProps2=babelHelpers.interopRequireDefault(_computeProps);var

SwitchNB=function(_NativeBaseComponent){babelHelpers.inherits(SwitchNB,_NativeBaseComponent);function SwitchNB(){babelHelpers.classCallCheck(this,SwitchNB);return babelHelpers.possibleConstructorReturn(this,(SwitchNB.__proto__||Object.getPrototypeOf(SwitchNB)).apply(this,arguments));}babelHelpers.createClass(SwitchNB,[{key:'getInitialStyle',value:function getInitialStyle()





{
return{
switch:{}};



}},{key:'prepareRootProps',value:function prepareRootProps()
{
var defaultProps={
style:this.getInitialStyle().switch};


return(0,_computeProps2.default)(this.props,defaultProps);
}},{key:'render',value:function render()

{var _this2=this;
return(
_react2.default.createElement(_reactNative.Switch,babelHelpers.extends({ref:function ref(c){return _this2._root=c;}},this.prepareRootProps())));

}}]);return SwitchNB;}(_NativeBaseComponent3.default);exports.default=SwitchNB;