
'use strict';Object.defineProperty(exports,"__esModule",{value:true});

var _react=require('react');var _react2=babelHelpers.interopRequireDefault(_react);
var _reactNative=require('react-native');
var _NativeBaseComponent2=require('../Base/NativeBaseComponent');var _NativeBaseComponent3=babelHelpers.interopRequireDefault(_NativeBaseComponent2);
var _computeProps=require('../../Utils/computeProps');var _computeProps2=babelHelpers.interopRequireDefault(_computeProps);
var _Icon=require('./Icon');var _Icon2=babelHelpers.interopRequireDefault(_Icon);
var _Text=require('./Text');var _Text2=babelHelpers.interopRequireDefault(_Text);
var _View=require('./View');var _View2=babelHelpers.interopRequireDefault(_View);
var _Button=require('./Button');var _Button2=babelHelpers.interopRequireDefault(_Button);
var _Thumbnail=require('./Thumbnail');var _Thumbnail2=babelHelpers.interopRequireDefault(_Thumbnail);var

CardItemNB=function(_NativeBaseComponent){babelHelpers.inherits(CardItemNB,_NativeBaseComponent);function CardItemNB(){babelHelpers.classCallCheck(this,CardItemNB);return babelHelpers.possibleConstructorReturn(this,(CardItemNB.__proto__||Object.getPrototypeOf(CardItemNB)).apply(this,arguments));}babelHelpers.createClass(CardItemNB,[{key:'getInitialStyle',value:function getInitialStyle()







{
return{
listItem:{
borderBottomWidth:this.getTheme().borderWidth,
padding:this.imagePresent()&&!this.ifShowCase()?0:
this.getTheme().listItemPadding,
backgroundColor:this.getTheme().listBg,
justifyContent:this.buttonPresent()?'space-between':'flex-start',
flexDirection:this.thumbnailPresent()||this.iconPresent()||this.notePresent()&&this.ifShowCase()?'row':'column',
borderColor:this.getTheme().listBorderColor},

listItemDivider:{
borderBottomWidth:this.getTheme().borderWidth,
padding:this.getTheme().listItemPadding,
backgroundColor:'transparent',
paddingVertical:this.getTheme().listItemPadding+2,
justifyContent:this.buttonPresent()?'space-between':'flex-start',
flexDirection:'row',
borderColor:'transparent'},

itemText:{
fontSize:this.ifShowCase()?14:15,
marginTop:this.ifShowCase()?10:0,
color:this.getContextForegroundColor(),
flex:1},

dividerItemText:{
fontSize:17,
fontWeight:'500',
color:this.getContextForegroundColor(),
flex:1},

itemIcon:{
fontSize:this.getTheme().iconFontSize,
color:this.getContextForegroundColor()},

itemNote:{
fontSize:15,
color:this.getTheme().listNoteColor,
fontWeight:'100',
flex:1},

itemSubNote:{
fontSize:15,
color:'#999'},

thumbnail:{
alignSelf:'center'},

fullImage:{
alignSelf:'stretch',
height:this.ifShowCase()?120:300}};


}},{key:'getRightStyle',value:function getRightStyle()
{
return{
right:{
flex:1,
paddingLeft:10,
backgroundColor:'transparent'},

right2:{
flex:1,
flexDirection:'row',
paddingLeft:10,
alignItems:'center',
justifyContent:'space-between',
backgroundColor:'transparent'},

right3:{
flex:1,
flexDirection:'column',
paddingLeft:10,
justifyContent:'flex-start',
backgroundColor:'transparent'}};


}},{key:'thumbnailPresent',value:function thumbnailPresent()

{
var thumbnailComponentPresent=false;
_react2.default.Children.forEach(this.props.children,function(child){
if(child&&child.type===_Thumbnail2.default){
thumbnailComponentPresent=true;
}
});

return thumbnailComponentPresent;
}},{key:'imagePresent',value:function imagePresent()

{
var imagePresent=false;
_react2.default.Children.forEach(this.props.children,function(child){
if(child&&child.type===_reactNative.Image){
imagePresent=true;
}
});

return imagePresent;
}},{key:'iconPresent',value:function iconPresent()

{
var iconComponentPresent=false;
_react2.default.Children.forEach(this.props.children,function(child){
if(child&&child.type===_Icon2.default){
iconComponentPresent=true;
}
});

return iconComponentPresent;
}},{key:'buttonPresent',value:function buttonPresent()

{
var buttonComponentPresent=false;
_react2.default.Children.forEach(this.props.children,function(child){
if(child&&child.type===_Button2.default){
buttonComponentPresent=true;
}
});

return buttonComponentPresent;
}},{key:'ifShowCase',value:function ifShowCase()

{
return!!this.props.cardBody;
}},{key:'notePresent',value:function notePresent()

{
var notePresent=false;

_react2.default.Children.forEach(this.props.children,function(child){
if(child&&child.type===_Text2.default&&child.props.note){
notePresent=true;
}
});

return notePresent;
}},{key:'squareThumbs',value:function squareThumbs()

{
var squareThumbs=false;
if(this.thumbnailPresent()){
_react2.default.Children.forEach(this.props.children,function(child){
if(child&&child.props.square){
squareThumbs=true;
}
});
}

return squareThumbs;
}},{key:'getChildProps',value:function getChildProps(

child){
var defaultProps={};
if(child.type===_reactNative.Image&&!Array.isArray(this.props.children)){
defaultProps={
resizeMode:'cover',
style:this.getInitialStyle().fullImage};

}else
if(child.type===_Button2.default){
defaultProps={
style:this.getInitialStyle().itemButton};

}else
if(child.type===_Text2.default){
if(this.props.header||this.props.footer){
defaultProps={
style:this.getInitialStyle().dividerItemText};

}else if(child.props.note&&this.thumbnailPresent()){
defaultProps={
style:this.getInitialStyle().itemSubNote};

}else if(child.props.note){
defaultProps={
style:this.getInitialStyle().itemNote};

}else{
defaultProps={
style:this.getInitialStyle().itemText};

}
}else if(child.type===_Icon2.default){
defaultProps={
style:this.getInitialStyle().itemIcon};

}else if(child.type===_Thumbnail2.default){
defaultProps={
style:this.getInitialStyle().thumbnail};

}else if(child.type===_reactNative.Image){
defaultProps={
style:this.getInitialStyle().fullImage};

}else{
defaultProps={
foregroundColor:this.getContextForegroundColor()};

}

return(0,_computeProps2.default)(child.props,defaultProps);
}},{key:'prepareRootProps',value:function prepareRootProps()

{
var defaultProps={};

if(this.props.header||this.props.footer){
defaultProps={
style:this.getInitialStyle().listItemDivider};

}else{
defaultProps={
style:this.getInitialStyle().listItem};

}

return(0,_computeProps2.default)(this.props,defaultProps);
}},{key:'renderChildren',value:function renderChildren()




{var _this2=this;
var newChildren=[];
var childrenArray=_react2.default.Children.toArray(this.props.children);
childrenArray=childrenArray.filter(function(child){return!!child;});

if(!this.thumbnailPresent()&&!this.iconPresent()){
newChildren=childrenArray.map(function(child,i){return(
_react2.default.cloneElement(child,babelHelpers.extends({},_this2.getChildProps(child),{key:i})));});

}else{
newChildren=[];
if(!Array.isArray(this.props.children)){
newChildren.push(
_react2.default.createElement(_View2.default,{key:'cardItem',style:{justifyContent:'flex-start'}},
_react2.default.cloneElement(childrenArray,this.getChildProps(childrenArray))));


}else{
newChildren.push(
_react2.default.cloneElement(childrenArray[0],this.getChildProps(childrenArray[0])));
newChildren.push(
_react2.default.createElement(_View2.default,{key:'cardItem',style:this.notePresent()?this.getRightStyle().right:this.squareThumbs()?this.getRightStyle().right3:this.getRightStyle().right2},
childrenArray.slice(1).map(function(child,i){return(
_react2.default.cloneElement(child,babelHelpers.extends({},_this2.getChildProps(child),{key:i})));})));



}
}

return newChildren;
}},{key:'render',value:function render()


{var _this3=this;
return(
_react2.default.createElement(_reactNative.TouchableOpacity,babelHelpers.extends({
ref:function ref(c){_this3._root=c;}},this.prepareRootProps(),{
activeOpacity:this.props.button?0.2:1}),

this.renderChildren()));


}}]);return CardItemNB;}(_NativeBaseComponent3.default);exports.default=CardItemNB;