
'use strict';Object.defineProperty(exports,"__esModule",{value:true});

var _react=require('react');var _react2=babelHelpers.interopRequireDefault(_react);
var _reactNative=require('react-native');
var _NativeBaseComponent2=require('../Base/NativeBaseComponent');var _NativeBaseComponent3=babelHelpers.interopRequireDefault(_NativeBaseComponent2);
var _computeProps=require('../../Utils/computeProps');var _computeProps2=babelHelpers.interopRequireDefault(_computeProps);var

Textarea=function(_NativeBaseComponent){babelHelpers.inherits(Textarea,_NativeBaseComponent);function Textarea(){babelHelpers.classCallCheck(this,Textarea);return babelHelpers.possibleConstructorReturn(this,(Textarea.__proto__||Object.getPrototypeOf(Textarea)).apply(this,arguments));}babelHelpers.createClass(Textarea,[{key:'getInitialStyle',value:function getInitialStyle()





{
return{
input:{
height:this.props.rowSpan*25,
color:this.getTheme().textColor,
paddingLeft:5,
paddingRight:5,
fontSize:18}};


}},{key:'getBorderStyle',value:function getBorderStyle()
{
return{
underline:{
borderTopWidth:0,
borderRightWidth:0,
borderLeftWidth:0,
marginTop:5},


bordered:{
marginTop:5},


rounded:{
borderRadius:30,
marginTop:5}};


}},{key:'prepareRootProps',value:function prepareRootProps()

{

var defaultProps={
style:this.getInitialStyle().input};


return(0,_computeProps2.default)(this.props,defaultProps);

}},{key:'render',value:function render()

{var _this2=this;

return(
_react2.default.createElement(_reactNative.View,{style:{flex:1}},
_react2.default.createElement(_reactNative.TextInput,babelHelpers.extends({ref:function ref(c){return _this2._root=c;}},this.prepareRootProps(),{multiline:true,placeholderTextColor:this.getTheme().inputColorPlaceholder,underlineColorAndroid:'rgba(0,0,0,0)'}))));


}}]);return Textarea;}(_NativeBaseComponent3.default);exports.default=Textarea;