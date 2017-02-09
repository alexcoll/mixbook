
'use strict';Object.defineProperty(exports,"__esModule",{value:true});

var _react=require('react');var _react2=babelHelpers.interopRequireDefault(_react);
var _reactNative=require('react-native');
var _NativeBaseComponent2=require('../Base/NativeBaseComponent');var _NativeBaseComponent3=babelHelpers.interopRequireDefault(_NativeBaseComponent2);
var _Icon=require('./Icon');var _Icon2=babelHelpers.interopRequireDefault(_Icon);
var _Button=require('./Button');var _Button2=babelHelpers.interopRequireDefault(_Button);
var _computeProps=require('../../Utils/computeProps');var _computeProps2=babelHelpers.interopRequireDefault(_computeProps);
var _Input=require('./Input');var _Input2=babelHelpers.interopRequireDefault(_Input);
var _lodash=require('lodash');var _lodash2=babelHelpers.interopRequireDefault(_lodash);var

InputGroup=function(_NativeBaseComponent){babelHelpers.inherits(InputGroup,_NativeBaseComponent);function InputGroup(){babelHelpers.classCallCheck(this,InputGroup);return babelHelpers.possibleConstructorReturn(this,(InputGroup.__proto__||Object.getPrototypeOf(InputGroup)).apply(this,arguments));}babelHelpers.createClass(InputGroup,[{key:'getInitialStyle',value:function getInitialStyle()












{
return{
textInput:{
backgroundColor:'transparent',
flexDirection:'row',
borderColor:this.props.error?this.getTheme().inputErrorBorderColor:this.props.success?this.getTheme().inputSuccessBorderColor:this.getTheme().inputBorderColor,
paddingRight:5,
alignItems:'center'},

outerBorder:{
position:'relative',
borderColor:'white',
borderWidth:this.getTheme().borderWidth,
borderTopWidth:0,
borderRightWidth:0,
borderLeftWidth:0},

darkborder:{
borderColor:'#000'},

lightborder:{
borderColor:'#fff'},

underline:{
position:'relative',
borderWidth:this.getTheme().borderWidth,
borderTopWidth:0,
borderRightWidth:0,
borderLeftWidth:0},


bordered:{
position:'relative',
borderWidth:this.getTheme().borderWidth},


rounded:{
position:'relative',
borderWidth:this.getTheme().borderWidth,
borderRadius:30}};


}},{key:'prepareRootProps',value:function prepareRootProps()

{
var type={
paddingLeft:this.props.borderType==='rounded'&&!this.props.children.type==_Icon2.default?15:
this.props.children.type==_Icon2.default?this.getTheme().inputPaddingLeftIcon:5};


var defaultStyle=this.props.borderType==='regular'?this.getInitialStyle().bordered:this.props.borderType==='rounded'?this.getInitialStyle().rounded:this.getInitialStyle().underline;

type=_lodash2.default.merge(type,defaultStyle);

var addedProps=_lodash2.default.merge(this.getInitialStyle().textInput,type);

var defaultProps={
style:addedProps,
key:'inpGroup'};


return(0,_computeProps2.default)(this.props,defaultProps);
}},{key:'getIconProps',value:function getIconProps(

icon){
var defaultStyle={
fontSize:this.props.toolbar||this.props.atoolbar?this.getTheme().toolbarIconSize:27,
alignSelf:'center',
lineHeight:this.props.toolbar||this.props.atoolbar?20:undefined,
paddingRight:5,
marginLeft:this.props.toolbar||this.props.atoolbar?5:undefined,
marginTop:this.props.toolbar||this.props.atoolbar?2:undefined};


var defaultProps={
style:defaultStyle,
key:'icon'};


return(0,_computeProps2.default)(icon.props,defaultProps);
}},{key:'getButtonProps',value:function getButtonProps(
button){

var defaultStyle={
alignSelf:'center',
paddingRight:5,
marginLeft:this.props.toolbar||this.props.atoolbar?5:undefined,
height:this.props.toolbar?30:undefined,
fontSize:this.props.toolbar?15:undefined};


var defaultProps={
style:defaultStyle,
key:'button',
inputButton:true};


return(0,_computeProps2.default)(button.props,defaultProps);
}},{key:'renderChildren',value:function renderChildren()


{
var inputProps={};
var newChildren=[];
var childrenArray=_react2.default.Children.toArray(this.props.children);

var iconElement=[];
iconElement=_lodash2.default.remove(childrenArray,function(item){
if(item.type==_Icon2.default){
return true;
}
});

var buttonElement=[];

buttonElement=_lodash2.default.remove(childrenArray,function(item){
if(item.type==_Button2.default){
return true;
}
});

var inp=_lodash2.default.find(childrenArray,function(item){
if(item&&item.type==_Input2.default){
return true;
}
});

if(inp){
inputProps=inp.props;
var clonedInp=_react2.default.cloneElement(
inp,babelHelpers.extends({},

this.inputProps,{
key:'inp',
toolbar:this.props.toolbar&&_reactNative.Platform.OS=='ios'?true:undefined,
editable:this.props.disabled?false:undefined}));


}

if(Array.isArray(this.props.children)){

if(this.props.iconRight&&iconElement.length>0){
if(clonedInp){
newChildren.push(clonedInp);
}
newChildren.push(_react2.default.cloneElement(iconElement[0],this.getIconProps(iconElement[0])));
}else
if(buttonElement.length>0){
newChildren.push(_react2.default.cloneElement(
iconElement[0],babelHelpers.extends({},

this.getIconProps(iconElement[0]),{
key:'icon0'})));


if(clonedInp){
newChildren.push(clonedInp);
}
newChildren.push(_react2.default.cloneElement(
buttonElement[0],babelHelpers.extends({},

this.getButtonProps(buttonElement[0]),{
key:'button1'})));


}else
{
if(iconElement.length>1){
newChildren.push(_react2.default.cloneElement(
iconElement[0],babelHelpers.extends({},

this.getIconProps(iconElement[0]),{
key:'icon0'})));


if(clonedInp){
newChildren.push(clonedInp);
}
newChildren.push(_react2.default.cloneElement(
iconElement[1],babelHelpers.extends({},

this.getIconProps(iconElement[1]),{
key:'icon1'})));


}else{
if(iconElement.length>0){
newChildren.push(_react2.default.cloneElement(iconElement[0],this.getIconProps(iconElement[0])));
}
if(clonedInp){
newChildren.push(clonedInp);
}
}
}
}else

{
if(clonedInp){
newChildren.push(clonedInp);
}
}

return newChildren;
}},{key:'render',value:function render()

{var _this2=this;
return(
_react2.default.createElement(_reactNative.View,babelHelpers.extends({ref:function ref(c){return _this2._root=c;}},this.prepareRootProps()),
this.renderChildren()));


}}]);return InputGroup;}(_NativeBaseComponent3.default);exports.default=InputGroup;