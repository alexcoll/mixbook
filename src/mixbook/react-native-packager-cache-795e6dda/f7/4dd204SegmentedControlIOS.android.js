











'use strict';

var React=require('React');
var StyleSheet=require('StyleSheet');
var Text=require('Text');
var View=require('View');var

DummySegmentedControlIOS=function(_React$Component){babelHelpers.inherits(DummySegmentedControlIOS,_React$Component);function DummySegmentedControlIOS(){babelHelpers.classCallCheck(this,DummySegmentedControlIOS);return babelHelpers.possibleConstructorReturn(this,(DummySegmentedControlIOS.__proto__||Object.getPrototypeOf(DummySegmentedControlIOS)).apply(this,arguments));}babelHelpers.createClass(DummySegmentedControlIOS,[{key:'render',value:function render()
{
return(
React.createElement(View,{style:[styles.dummy,this.props.style]},
React.createElement(Text,{style:styles.text},'SegmentedControlIOS is not supported on this platform!')));




}}]);return DummySegmentedControlIOS;}(React.Component);


var styles=StyleSheet.create({
dummy:{
width:120,
height:50,
backgroundColor:'#ffbcbc',
borderWidth:1,
borderColor:'red',
alignItems:'center',
justifyContent:'center'},

text:{
color:'#333333',
margin:5,
fontSize:10}});



module.exports=DummySegmentedControlIOS;