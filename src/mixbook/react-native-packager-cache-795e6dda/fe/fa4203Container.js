
'use strict';Object.defineProperty(exports,"__esModule",{value:true});

var _react=require('react');var _react2=babelHelpers.interopRequireDefault(_react);
var _reactNative=require('react-native');
var _View=require('./View');var _View2=babelHelpers.interopRequireDefault(_View);
var _Header=require('./Header');var _Header2=babelHelpers.interopRequireDefault(_Header);
var _Content=require('./Content');var _Content2=babelHelpers.interopRequireDefault(_Content);
var _Footer=require('./Footer');var _Footer2=babelHelpers.interopRequireDefault(_Footer);
var _Fab=require('./Fab');var _Fab2=babelHelpers.interopRequireDefault(_Fab);
var _NativeBaseComponent2=require('../Base/NativeBaseComponent');var _NativeBaseComponent3=babelHelpers.interopRequireDefault(_NativeBaseComponent2);
var _lodash=require('lodash');var _lodash2=babelHelpers.interopRequireDefault(_lodash);
var _computeProps=require('../../Utils/computeProps');var _computeProps2=babelHelpers.interopRequireDefault(_computeProps);var

Container=function(_NativeBaseComponent){babelHelpers.inherits(Container,_NativeBaseComponent);function Container(){babelHelpers.classCallCheck(this,Container);return babelHelpers.possibleConstructorReturn(this,(Container.__proto__||Object.getPrototypeOf(Container)).apply(this,arguments));}babelHelpers.createClass(Container,[{key:'renderHeader',value:function renderHeader()





{
if(Array.isArray(this.props.children)){
return _lodash2.default.find(this.props.children,function(item){
if(item&&item.type==_Header2.default){
return true;
}
});
}else

{
if(this.props.children&&this.props.children.type==_Header2.default){
return this.props.children;
}
}
}},{key:'renderContent',value:function renderContent()
{
if(Array.isArray(this.props.children)){

return _lodash2.default.filter(this.props.children,function(item){
if(item&&(item.type==_View2.default||item.type==_Content2.default||item.type==_reactNative.Image||item.type==_reactNative.View||item.type==_reactNative.ScrollView||item.type==_Fab2.default)){

return true;
}
});
}else

{
if(this.props.children&&(this.props.children.type==_Content2.default||this.props.children.type==_View2.default||this.props.children.type==_reactNative.View||this.props.children.type==_reactNative.Image||this.props.children.type==_reactNative.ScrollView)){
return this.props.children;
}
}
}},{key:'renderFooter',value:function renderFooter()
{
if(Array.isArray(this.props.children)){
return _lodash2.default.find(this.props.children,function(item){
if(item&&item.type==_Footer2.default){
return true;
}
});
}else

{
if(this.props.children&&this.props.children.type==_Footer2.default){
return this.props.children;
}
}
}},{key:'prepareRootProps',value:function prepareRootProps()
{

var type={
flex:1};


var defaultProps={
style:type};


return(0,_computeProps2.default)(this.props,defaultProps);
}},{key:'render',value:function render()
{var _this2=this;
return(
_react2.default.createElement(_reactNative.View,babelHelpers.extends({ref:function ref(c){return _this2._root=c;}},this.prepareRootProps()),

this.renderHeader(),

this.renderContent(),

this.renderFooter()));




}}]);return Container;}(_NativeBaseComponent3.default);exports.default=Container;