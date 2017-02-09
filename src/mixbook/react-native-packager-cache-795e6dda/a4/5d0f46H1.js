
'use strict';Object.defineProperty(exports,"__esModule",{value:true});

var _react=require('react');var _react2=babelHelpers.interopRequireDefault(_react);
var _Text=require('./Text');var _Text2=babelHelpers.interopRequireDefault(_Text);
var _NativeBaseComponent2=require('../Base/NativeBaseComponent');var _NativeBaseComponent3=babelHelpers.interopRequireDefault(_NativeBaseComponent2);
var _computeProps=require('../../Utils/computeProps');var _computeProps2=babelHelpers.interopRequireDefault(_computeProps);var


H1NB=function(_NativeBaseComponent){babelHelpers.inherits(H1NB,_NativeBaseComponent);function H1NB(){babelHelpers.classCallCheck(this,H1NB);return babelHelpers.possibleConstructorReturn(this,(H1NB.__proto__||Object.getPrototypeOf(H1NB)).apply(this,arguments));}babelHelpers.createClass(H1NB,[{key:'prepareRootProps',value:function prepareRootProps()





{

var type={
color:this.getTheme().textColor,
fontSize:this.getTheme().fontSizeH1,
lineHeight:this.getTheme().lineHeightH1};


var defaultProps={
style:type};


return(0,_computeProps2.default)(this.props,defaultProps);
}},{key:'render',value:function render()
{var _this2=this;
return(
_react2.default.createElement(_Text2.default,babelHelpers.extends({ref:function ref(c){return _this2._root=c;}},this.prepareRootProps()),this.props.children));

}}]);return H1NB;}(_NativeBaseComponent3.default);exports.default=H1NB;