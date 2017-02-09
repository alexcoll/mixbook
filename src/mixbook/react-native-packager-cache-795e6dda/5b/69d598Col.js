
'use strict';Object.defineProperty(exports,"__esModule",{value:true});

var _react=require('react');var _react2=babelHelpers.interopRequireDefault(_react);
var _reactNative=require('react-native');
var _computeProps=require('../Utils/computeProps');var _computeProps2=babelHelpers.interopRequireDefault(_computeProps);
var _lodash=require('lodash');var _lodash2=babelHelpers.interopRequireDefault(_lodash);var


ColumnNB=function(_Component){babelHelpers.inherits(ColumnNB,_Component);function ColumnNB(){babelHelpers.classCallCheck(this,ColumnNB);return babelHelpers.possibleConstructorReturn(this,(ColumnNB.__proto__||Object.getPrototypeOf(ColumnNB)).apply(this,arguments));}babelHelpers.createClass(ColumnNB,[{key:'prepareRootProps',value:function prepareRootProps()
{

var type={
flexDirection:'column',
flex:this.props.size?this.props.size:this.props.style&&this.props.style.width?0:1};


var defaultProps={
style:type};

return(0,_computeProps2.default)(this.props,defaultProps);

}},{key:'setNativeProps',value:function setNativeProps(

nativeProps){
this._root.setNativeProps(nativeProps);
}},{key:'render',value:function render()

{var _this2=this;
return(
_react2.default.createElement(_reactNative.View,babelHelpers.extends({
ref:function ref(component){return _this2._root=component;}},
this.props,
this.prepareRootProps()),
this.props.children));

}}]);return ColumnNB;}(_react.Component);exports.default=ColumnNB;