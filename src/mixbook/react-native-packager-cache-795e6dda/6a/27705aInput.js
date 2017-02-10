
'use strict';Object.defineProperty(exports,"__esModule",{value:true});
var _react=require('react');var _react2=babelHelpers.interopRequireDefault(_react);
var _reactNative=require('react-native');
var _NativeBaseComponent2=require('../Base/NativeBaseComponent');var _NativeBaseComponent3=babelHelpers.interopRequireDefault(_NativeBaseComponent2);
var _computeProps=require('../../Utils/computeProps');var _computeProps2=babelHelpers.interopRequireDefault(_computeProps);var

Input=function(_NativeBaseComponent){babelHelpers.inherits(Input,_NativeBaseComponent);function Input(){babelHelpers.classCallCheck(this,Input);return babelHelpers.possibleConstructorReturn(this,(Input.__proto__||Object.getPrototypeOf(Input)).apply(this,arguments));}babelHelpers.createClass(Input,[{key:'getInitialStyle',value:function getInitialStyle()





{
return{
input:{
height:this.props.toolbar?30:this.getTheme().inputHeightBase,
color:this.getTheme().inputColor,
paddingLeft:5,
paddingRight:5,
fontSize:this.getTheme().inputFontSize,
lineHeight:this.getTheme().inputLineHeight,
marginTop:this.props.inlineLabel?_reactNative.Platform.OS==='ios'?undefined:5:undefined}};


}},{key:'prepareRootProps',value:function prepareRootProps()

{
var defaultProps={
style:this.getInitialStyle().input};


return(0,_computeProps2.default)(this.props,defaultProps);
}},{key:'render',value:function render()
{var _this2=this;

return(
_react2.default.createElement(_reactNative.View,{style:{flex:1}},
_react2.default.createElement(_reactNative.TextInput,babelHelpers.extends({ref:function ref(c){_this2._textInput=c;_this2._root=c;}},this.prepareRootProps(),{placeholderTextColor:this.props.placeholderTextColor?this.props.placeholderTextColor:this.getTheme().inputColorPlaceholder,underlineColorAndroid:'rgba(0,0,0,0)'}))));


}}]);return Input;}(_NativeBaseComponent3.default);exports.default=Input;