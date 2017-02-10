
'use strict';Object.defineProperty(exports,"__esModule",{value:true});

var _react=require('react');var _react2=babelHelpers.interopRequireDefault(_react);
var _reactNativeKeyboardAwareScrollView=require('react-native-keyboard-aware-scroll-view');
var _NativeBaseComponent2=require('../Base/NativeBaseComponent');var _NativeBaseComponent3=babelHelpers.interopRequireDefault(_NativeBaseComponent2);
var _computeProps=require('../../Utils/computeProps');var _computeProps2=babelHelpers.interopRequireDefault(_computeProps);var


Content=function(_NativeBaseComponent){babelHelpers.inherits(Content,_NativeBaseComponent);function Content(){babelHelpers.classCallCheck(this,Content);return babelHelpers.possibleConstructorReturn(this,(Content.__proto__||Object.getPrototypeOf(Content)).apply(this,arguments));}babelHelpers.createClass(Content,[{key:'prepareRootProps',value:function prepareRootProps()







{

var type={
backgroundColor:'transparent',
flex:1};


var defaultProps={
style:type,
resetScrollToCoords:this.props.disableKBDismissScroll?null:{
x:0,
y:0}};



return(0,_computeProps2.default)(this.props,defaultProps);
}},{key:'render',value:function render()

{var _this2=this;
var contentContainerStyle=this.props.contentContainerStyle||{};
contentContainerStyle.padding=this.props.padder?this.getTheme().contentPadding:0;
return(
_react2.default.createElement(_reactNativeKeyboardAwareScrollView.KeyboardAwareScrollView,babelHelpers.extends({automaticallyAdjustContentInsets:false,ref:function ref(c){_this2._scrollview=c;_this2._root=c;}},this.prepareRootProps(),{contentContainerStyle:contentContainerStyle}),this.props.children));

}}]);return Content;}(_NativeBaseComponent3.default);exports.default=Content;