
'use strict';Object.defineProperty(exports,"__esModule",{value:true});

var _react=require('react');var _react2=babelHelpers.interopRequireDefault(_react);
var _reactNative=require('react-native');
var _View=require('./View');var _View2=babelHelpers.interopRequireDefault(_View);
var _NativeBaseComponent2=require('../Base/NativeBaseComponent');var _NativeBaseComponent3=babelHelpers.interopRequireDefault(_NativeBaseComponent2);
var _computeProps=require('../../Utils/computeProps');var _computeProps2=babelHelpers.interopRequireDefault(_computeProps);var

Footer=function(_NativeBaseComponent){babelHelpers.inherits(Footer,_NativeBaseComponent);function Footer(){babelHelpers.classCallCheck(this,Footer);return babelHelpers.possibleConstructorReturn(this,(Footer.__proto__||Object.getPrototypeOf(Footer)).apply(this,arguments));}babelHelpers.createClass(Footer,[{key:'getInitialStyle',value:function getInitialStyle()





{
return{
navbar:{
flexDirection:'row',
alignItems:'center',
justifyContent:!Array.isArray(this.props.children)?'center':'space-between',
height:this.getTheme().footerHeight,
backgroundColor:this.getTheme().footerDefaultBg,
borderTopWidth:_reactNative.Platform.OS=='ios'?1:undefined,
borderColor:_reactNative.Platform.OS=='ios'?'#cbcbcb':undefined}};


}},{key:'prepareRootProps',value:function prepareRootProps()

{

var defaultProps={
style:this.getInitialStyle().navbar};


return(0,_computeProps2.default)(this.props,defaultProps);

}},{key:'render',value:function render()

{var _this2=this;

return(
_react2.default.createElement(_View2.default,babelHelpers.extends({ref:function ref(c){return _this2._root=c;}},this.prepareRootProps()),
!Array.isArray(this.props.children)&&
_react2.default.createElement(_View2.default,{style:{flex:1,alignItems:'center'}},
this.props.children),


Array.isArray(this.props.children)&&
_react2.default.createElement(_View2.default,{style:{flex:1,alignItems:'center',justifyContent:'flex-start',flexDirection:'row'}},
this.props.children[0]),


Array.isArray(this.props.children)&&
_react2.default.createElement(_View2.default,{style:{flex:3,alignSelf:'center'}},
this.props.children[1]),


Array.isArray(this.props.children)&&
_react2.default.createElement(_View2.default,{style:{flex:1,alignItems:'center',justifyContent:'flex-end',flexDirection:'row'}},
this.props.children[2])));



}}]);return Footer;}(_NativeBaseComponent3.default);exports.default=Footer;