
'use strict';Object.defineProperty(exports,"__esModule",{value:true});

var _react=require('react');var _react2=babelHelpers.interopRequireDefault(_react);
var _reactNative=require('react-native');
var _NativeBaseComponent2=require('../Base/NativeBaseComponent');var _NativeBaseComponent3=babelHelpers.interopRequireDefault(_NativeBaseComponent2);
var _computeProps=require('../../Utils/computeProps');var _computeProps2=babelHelpers.interopRequireDefault(_computeProps);
var _Text=require('./Text');var _Text2=babelHelpers.interopRequireDefault(_Text);var


BadgeNB=function(_NativeBaseComponent){babelHelpers.inherits(BadgeNB,_NativeBaseComponent);function BadgeNB(){babelHelpers.classCallCheck(this,BadgeNB);return babelHelpers.possibleConstructorReturn(this,(BadgeNB.__proto__||Object.getPrototypeOf(BadgeNB)).apply(this,arguments));}babelHelpers.createClass(BadgeNB,[{key:'prepareRootProps',value:function prepareRootProps()





{

var type={

backgroundColor:this.props.primary?
this.getTheme().brandPrimary:
this.props.success?
this.getTheme().brandSuccess:
this.props.info?
this.getTheme().brandInfo:
this.props.warning?
this.getTheme().brandWarning:
this.props.danger?
this.getTheme().brandDanger:
this.getTheme().badgeBg,
padding:_reactNative.Platform.OS==='ios'?3:0,
paddingHorizontal:10,
alignSelf:'flex-start',
borderRadius:13.5,
height:27};



var defaultProps={
style:type};


return(0,_computeProps2.default)(this.props,defaultProps);

}},{key:'render',value:function render()
{var _this2=this;
return(
_react2.default.createElement(_reactNative.View,babelHelpers.extends({ref:function ref(c){return _this2._root=c;}},this.prepareRootProps()),
_react2.default.createElement(_Text2.default,{style:[this.props.textStyle,{
color:this.props.textStyle&&this.props.textStyle.color?this.props.textStyle.color:this.getTheme().badgeColor,
fontSize:this.props.textStyle&&this.props.textStyle.fontSize?this.props.textStyle.fontSize:this.getTheme().fontSizeBase,
lineHeight:this.props.textStyle&&this.props.textStyle.lineHeight?this.props.textStyle.lineHeight:this.getTheme().lineHeight-1,
textAlign:'center'}]},
this.props.children)));



}}]);return BadgeNB;}(_NativeBaseComponent3.default);BadgeNB.propTypes={style:_react2.default.PropTypes.object};exports.default=BadgeNB;