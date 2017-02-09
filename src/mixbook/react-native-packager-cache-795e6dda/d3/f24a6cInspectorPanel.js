










'use strict';

var React=require('React');
var StyleSheet=require('StyleSheet');
var Text=require('Text');
var View=require('View');
var ElementProperties=require('ElementProperties');
var PerformanceOverlay=require('PerformanceOverlay');
var TouchableHighlight=require('TouchableHighlight');
var NetworkOverlay=require('NetworkOverlay');

var PropTypes=React.PropTypes;var

InspectorPanel=function(_React$Component){babelHelpers.inherits(InspectorPanel,_React$Component);function InspectorPanel(){babelHelpers.classCallCheck(this,InspectorPanel);return babelHelpers.possibleConstructorReturn(this,(InspectorPanel.__proto__||Object.getPrototypeOf(InspectorPanel)).apply(this,arguments));}babelHelpers.createClass(InspectorPanel,[{key:'renderWaiting',value:function renderWaiting()
{
if(this.props.inspecting){
return(
React.createElement(Text,{style:styles.waitingText},'Tap something to inspect it'));



}
return React.createElement(Text,{style:styles.waitingText},'Nothing is inspected');
}},{key:'render',value:function render()

{
var contents;
if(this.props.inspected){
contents=
React.createElement(ElementProperties,{
style:this.props.inspected.style,
frame:this.props.inspected.frame,
source:this.props.inspected.source,
hierarchy:this.props.hierarchy,
selection:this.props.selection,
setSelection:this.props.setSelection});


}else if(this.props.perfing){
contents=
React.createElement(PerformanceOverlay,null);

}else if(this.props.networking){
contents=
React.createElement(NetworkOverlay,null);

}else{
contents=
React.createElement(View,{style:styles.waiting},
this.renderWaiting());


}
return(
React.createElement(View,{style:styles.container},
!this.props.devtoolsIsOpen&&contents,
React.createElement(View,{style:styles.buttonRow},
React.createElement(Button,{
title:'Inspect',
pressed:this.props.inspecting,
onClick:this.props.setInspecting}),

React.createElement(Button,{title:'Perf',
pressed:this.props.perfing,
onClick:this.props.setPerfing}),

React.createElement(Button,{title:'Network',
pressed:this.props.networking,
onClick:this.props.setNetworking}),

React.createElement(Button,{title:'Touchables',
pressed:this.props.touchTargetting,
onClick:this.props.setTouchTargetting}))));




}}]);return InspectorPanel;}(React.Component);


InspectorPanel.propTypes={
devtoolsIsOpen:PropTypes.bool,
inspecting:PropTypes.bool,
setInspecting:PropTypes.func,
inspected:PropTypes.object,
perfing:PropTypes.bool,
setPerfing:PropTypes.func,
touchTargetting:PropTypes.bool,
setTouchTargetting:PropTypes.func,
networking:PropTypes.bool,
setNetworking:PropTypes.func};var


Button=function(_React$Component2){babelHelpers.inherits(Button,_React$Component2);function Button(){babelHelpers.classCallCheck(this,Button);return babelHelpers.possibleConstructorReturn(this,(Button.__proto__||Object.getPrototypeOf(Button)).apply(this,arguments));}babelHelpers.createClass(Button,[{key:'render',value:function render()
{var _this3=this;
return(
React.createElement(TouchableHighlight,{onPress:function onPress(){return _this3.props.onClick(!_this3.props.pressed);},style:[
styles.button,
this.props.pressed&&styles.buttonPressed]},

React.createElement(Text,{style:styles.buttonText},this.props.title)));


}}]);return Button;}(React.Component);


var styles=StyleSheet.create({
buttonRow:{
flexDirection:'row'},

button:{
backgroundColor:'rgba(0, 0, 0, 0.3)',
margin:2,
height:30,
justifyContent:'center',
alignItems:'center'},

buttonPressed:{
backgroundColor:'rgba(255, 255, 255, 0.3)'},

buttonText:{
textAlign:'center',
color:'white',
margin:5},

container:{
backgroundColor:'rgba(0, 0, 0, 0.7)'},

waiting:{
height:100},

waitingText:{
fontSize:20,
textAlign:'center',
marginVertical:20,
color:'white'}});



module.exports=InspectorPanel;