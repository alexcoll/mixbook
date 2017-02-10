
'use strict';Object.defineProperty(exports,"__esModule",{value:true});

var _react=require('react');var _react2=babelHelpers.interopRequireDefault(_react);
var _NativeBaseComponent2=require('../Base/NativeBaseComponent');var _NativeBaseComponent3=babelHelpers.interopRequireDefault(_NativeBaseComponent2);
var _computeProps=require('../../Utils/computeProps');var _computeProps2=babelHelpers.interopRequireDefault(_computeProps);
var _reactNativeScrollableTabView=require('./../vendor/react-native-scrollable-tab-view');var _reactNativeScrollableTabView2=babelHelpers.interopRequireDefault(_reactNativeScrollableTabView);var

TabNB=function(_NativeBaseComponent){babelHelpers.inherits(TabNB,_NativeBaseComponent);




function TabNB(props){babelHelpers.classCallCheck(this,TabNB);var _this=babelHelpers.possibleConstructorReturn(this,(TabNB.__proto__||Object.getPrototypeOf(TabNB)).call(this,
props));

_this.goToPage=_this.goToPage.bind(_this);return _this;
}babelHelpers.createClass(TabNB,[{key:'goToPage',value:function goToPage(

page){
this._scrollableTabView.goToPage(page);
}},{key:'getInitialStyle',value:function getInitialStyle()

{
return{
tab:{
flex:1}};


}},{key:'prepareRootProps',value:function prepareRootProps()

{

var defaultProps={
style:this.getInitialStyle().tab};


return(0,_computeProps2.default)(this.props,defaultProps);

}},{key:'render',value:function render()

{var _this2=this;
var children=Array.isArray(this.props.children)?this.props.children:[this.props.children];
return(
_react2.default.createElement(_reactNativeScrollableTabView2.default,babelHelpers.extends({ref:function ref(c){_this2._scrollableTabView=c;_this2._root=c;}},this.prepareRootProps()),
children.filter(function(child){return child;})));


}}]);return TabNB;}(_NativeBaseComponent3.default);exports.default=TabNB;