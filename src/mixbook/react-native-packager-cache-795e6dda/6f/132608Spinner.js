
'use strict';Object.defineProperty(exports,"__esModule",{value:true});

var _react=require('react');var _react2=babelHelpers.interopRequireDefault(_react);
var _reactNative=require('react-native');
var _NativeBaseComponent2=require('../Base/NativeBaseComponent');var _NativeBaseComponent3=babelHelpers.interopRequireDefault(_NativeBaseComponent2);
var _computeProps=require('../../Utils/computeProps');var _computeProps2=babelHelpers.interopRequireDefault(_computeProps);var


SpinnerNB=function(_NativeBaseComponent){babelHelpers.inherits(SpinnerNB,_NativeBaseComponent);function SpinnerNB(){babelHelpers.classCallCheck(this,SpinnerNB);return babelHelpers.possibleConstructorReturn(this,(SpinnerNB.__proto__||Object.getPrototypeOf(SpinnerNB)).apply(this,arguments));}babelHelpers.createClass(SpinnerNB,[{key:'prepareRootProps',value:function prepareRootProps()

{

var type={
height:80};


var defaultProps={
style:type};


return(0,_computeProps2.default)(this.props,defaultProps);

}},{key:'render',value:function render()


{var _this2=this;
return(
_react2.default.createElement(_reactNative.ActivityIndicator,babelHelpers.extends({ref:function ref(c){return _this2._root=c;}},this.prepareRootProps(),{color:this.props.color?this.props.color:this.props.inverse?
this.getTheme().inverseSpinnerColor:
this.getTheme().defaultSpinnerColor,
size:this.props.size?this.props.size:'large'})));

}}]);return SpinnerNB;}(_NativeBaseComponent3.default);exports.default=SpinnerNB;