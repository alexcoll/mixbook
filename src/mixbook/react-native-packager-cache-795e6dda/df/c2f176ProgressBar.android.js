Object.defineProperty(exports,"__esModule",{value:true});
var _react=require('react');var _react2=babelHelpers.interopRequireDefault(_react);
var _ProgressBarAndroid=require('ProgressBarAndroid');var _ProgressBarAndroid2=babelHelpers.interopRequireDefault(_ProgressBarAndroid);
var _NativeBaseComponent2=require('native-base/Components/Base/NativeBaseComponent');var _NativeBaseComponent3=babelHelpers.interopRequireDefault(_NativeBaseComponent2);
var _computeProps=require('native-base/Utils/computeProps');var _computeProps2=babelHelpers.interopRequireDefault(_computeProps);var


SpinnerNB=function(_NativeBaseComponent){babelHelpers.inherits(SpinnerNB,_NativeBaseComponent);function SpinnerNB(){babelHelpers.classCallCheck(this,SpinnerNB);return babelHelpers.possibleConstructorReturn(this,(SpinnerNB.__proto__||Object.getPrototypeOf(SpinnerNB)).apply(this,arguments));}babelHelpers.createClass(SpinnerNB,[{key:'prepareRootProps',value:function prepareRootProps()

{
var type={
height:40};


var defaultProps={
style:type};


return(0,_computeProps2.default)(this.props,defaultProps);
}},{key:'render',value:function render()


{var _this2=this;
var getColor=function getColor(){
if(_this2.props.color){
return _this2.props.color;
}else if(_this2.props.inverse){
return _this2.getTheme().inverseProgressColor;
}

return _this2.getTheme().defaultProgressColor;
};

return(
_react2.default.createElement(_ProgressBarAndroid2.default,babelHelpers.extends({},
this.prepareRootProps(),{
styleAttr:'Horizontal',
indeterminate:false,
progress:this.props.progress?this.props.progress/100:0.5,
color:getColor()})));


}}]);return SpinnerNB;}(_NativeBaseComponent3.default);exports.default=SpinnerNB;