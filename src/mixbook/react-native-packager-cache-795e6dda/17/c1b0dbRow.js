
'use strict';Object.defineProperty(exports,"__esModule",{value:true});

var _react=require('react');var _react2=babelHelpers.interopRequireDefault(_react);
var _reactNative=require('react-native');

var _computeProps=require('../Utils/computeProps');var _computeProps2=babelHelpers.interopRequireDefault(_computeProps);
var _lodash=require('lodash');var _lodash2=babelHelpers.interopRequireDefault(_lodash);var


RowNB=function(_Component){babelHelpers.inherits(RowNB,_Component);function RowNB(){babelHelpers.classCallCheck(this,RowNB);return babelHelpers.possibleConstructorReturn(this,(RowNB.__proto__||Object.getPrototypeOf(RowNB)).apply(this,arguments));}babelHelpers.createClass(RowNB,[{key:'prepareRootProps',value:function prepareRootProps()
{

var type={
flexDirection:'row',
flex:this.props.size?this.props.size:this.props.style&&this.props.style.height?0:1};


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

}}]);return RowNB;}(_react.Component);exports.default=RowNB;