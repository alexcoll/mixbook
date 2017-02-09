
'use strict';Object.defineProperty(exports,"__esModule",{value:true});

var _react=require('react');var _react2=babelHelpers.interopRequireDefault(_react);
var _reactNative=require('react-native');
var _NativeBaseComponent2=require('../Base/NativeBaseComponent');var _NativeBaseComponent3=babelHelpers.interopRequireDefault(_NativeBaseComponent2);
var _Text=require('./Text');var _Text2=babelHelpers.interopRequireDefault(_Text);
var _View=require('./View');var _View2=babelHelpers.interopRequireDefault(_View);
var _computeProps=require('../../Utils/computeProps');var _computeProps2=babelHelpers.interopRequireDefault(_computeProps);var


Title=function(_NativeBaseComponent){babelHelpers.inherits(Title,_NativeBaseComponent);function Title(){babelHelpers.classCallCheck(this,Title);return babelHelpers.possibleConstructorReturn(this,(Title.__proto__||Object.getPrototypeOf(Title)).apply(this,arguments));}babelHelpers.createClass(Title,[{key:'prepareRootProps',value:function prepareRootProps()





{

var type={
color:this.getTheme().toolbarTextColor,
fontSize:this.getTheme().titleFontSize,
fontFamily:this.getTheme().btnFontFamily,
fontWeight:_reactNative.Platform.OS==='ios'?'500':undefined,
alignSelf:_reactNative.Platform.OS==='ios'?'center':'flex-start'};


var defaultProps={
style:type};


return(0,_computeProps2.default)(this.props,defaultProps);

}},{key:'render',value:function render()

{var _this2=this;
return(
_react2.default.createElement(_View2.default,{style:{justifyContent:'center'}},_react2.default.createElement(_Text2.default,babelHelpers.extends({ref:function ref(c){return _this2._root=c;}},this.prepareRootProps()),this.props.children)));

}}]);return Title;}(_NativeBaseComponent3.default);exports.default=Title;