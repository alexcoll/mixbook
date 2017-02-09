
'use strict';Object.defineProperty(exports,"__esModule",{value:true});

var _react=require('react');var _react2=babelHelpers.interopRequireDefault(_react);
var _reactNative=require('react-native');
var _NativeBaseComponent2=require('../Base/NativeBaseComponent');var _NativeBaseComponent3=babelHelpers.interopRequireDefault(_NativeBaseComponent2);
var _computeProps=require('../../Utils/computeProps');var _computeProps2=babelHelpers.interopRequireDefault(_computeProps);var

PickerNB=function(_NativeBaseComponent){babelHelpers.inherits(PickerNB,_NativeBaseComponent);function PickerNB(){babelHelpers.classCallCheck(this,PickerNB);return babelHelpers.possibleConstructorReturn(this,(PickerNB.__proto__||Object.getPrototypeOf(PickerNB)).apply(this,arguments));}babelHelpers.createClass(PickerNB,[{key:'getInitialStyle',value:function getInitialStyle()

{
return{
picker:{},


pickerItem:{}};



}},{key:'prepareRootProps',value:function prepareRootProps()
{

var defaultProps={
style:this.getInitialStyle().picker,
itemStyle:this.getInitialStyle().pickerItem};


return(0,_computeProps2.default)(this.props,defaultProps);

}},{key:'render',value:function render()

{var _this2=this;
return(
_react2.default.createElement(_reactNative.Picker,babelHelpers.extends({ref:function ref(c){return _this2._root=c;}},this.prepareRootProps()),
this.props.children));


}}]);return PickerNB;}(_NativeBaseComponent3.default);exports.default=PickerNB;



PickerNB.Item=_react2.default.createClass({displayName:'Item',

render:function render(){
return(
_react2.default.createElement(_reactNative.Picker.Item,this.props()));

}});