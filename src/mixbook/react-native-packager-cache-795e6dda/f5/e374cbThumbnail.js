
'use strict';Object.defineProperty(exports,"__esModule",{value:true});

var _react=require('react');var _react2=babelHelpers.interopRequireDefault(_react);
var _reactNative=require('react-native');
var _NativeBaseComponent2=require('../Base/NativeBaseComponent');var _NativeBaseComponent3=babelHelpers.interopRequireDefault(_NativeBaseComponent2);
var _computeProps=require('../../Utils/computeProps');var _computeProps2=babelHelpers.interopRequireDefault(_computeProps);
var _lodash=require('lodash');var _lodash2=babelHelpers.interopRequireDefault(_lodash);var

ThumbnailNB=function(_NativeBaseComponent){babelHelpers.inherits(ThumbnailNB,_NativeBaseComponent);function ThumbnailNB(){babelHelpers.classCallCheck(this,ThumbnailNB);return babelHelpers.possibleConstructorReturn(this,(ThumbnailNB.__proto__||Object.getPrototypeOf(ThumbnailNB)).apply(this,arguments));}babelHelpers.createClass(ThumbnailNB,[{key:'getInitialStyle',value:function getInitialStyle()








{
return{
thumbnail:{
borderRadius:this.props.size?this.props.size/2:15,
width:this.props.size?this.props.size:30,
height:this.props.size?this.props.size:30,
resizeMode:this.props.contain?'contain':undefined}};


}},{key:'prepareRootProps',value:function prepareRootProps()

{
var thumbnailStyle={};
if(this.props.circular){
thumbnailStyle.width=this.props.size;
thumbnailStyle.height=this.props.size;
thumbnailStyle.borderRadius=this.props.size/2;
}else
if(this.props.square){
thumbnailStyle.width=this.props.size;
thumbnailStyle.height=this.props.size;
thumbnailStyle.borderRadius=0;
}

var defaultProps={
style:_lodash2.default.merge(this.getInitialStyle().thumbnail,thumbnailStyle)};


return(0,_computeProps2.default)(this.props,defaultProps);
}},{key:'render',value:function render()

{var _this2=this;
return(
_react2.default.createElement(_reactNative.Image,babelHelpers.extends({ref:function ref(c){return _this2._root=c;}},this.prepareRootProps())));

}}]);return ThumbnailNB;}(_NativeBaseComponent3.default);exports.default=ThumbnailNB;