
'use strict';Object.defineProperty(exports,"__esModule",{value:true});

var _react=require('react');var _react2=babelHelpers.interopRequireDefault(_react);
var _reactNative=require('react-native');
var _NativeBaseComponent2=require('../Base/NativeBaseComponent');var _NativeBaseComponent3=babelHelpers.interopRequireDefault(_NativeBaseComponent2);
var _computeProps=require('../../Utils/computeProps');var _computeProps2=babelHelpers.interopRequireDefault(_computeProps);var


TextNB=function(_NativeBaseComponent){babelHelpers.inherits(TextNB,_NativeBaseComponent);function TextNB(){babelHelpers.classCallCheck(this,TextNB);return babelHelpers.possibleConstructorReturn(this,(TextNB.__proto__||Object.getPrototypeOf(TextNB)).apply(this,arguments));}babelHelpers.createClass(TextNB,[{key:'prepareRootProps',value:function prepareRootProps()





{

var type={
color:this.getContextForegroundColor(),
fontSize:this.getTheme().fontSizeBase,
lineHeight:this.getTheme().lineHeight,
fontFamily:this.getTheme().fontFamily};


var defaultProps={
style:type};


return(0,_computeProps2.default)(this.props,defaultProps);

}},{key:'render',value:function render()
{var _this2=this;
return(
_react2.default.createElement(_reactNative.Text,babelHelpers.extends({ref:function ref(c){return _this2._root=c;}},this.prepareRootProps()),this.props.children));

}}]);return TextNB;}(_NativeBaseComponent3.default);exports.default=TextNB;