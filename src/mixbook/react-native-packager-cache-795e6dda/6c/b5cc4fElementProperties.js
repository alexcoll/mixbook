










'use strict';

var BoxInspector=require('BoxInspector');
var React=require('React');
var StyleInspector=require('StyleInspector');
var StyleSheet=require('StyleSheet');
var Text=require('Text');
var TouchableHighlight=require('TouchableHighlight');
var TouchableWithoutFeedback=require('TouchableWithoutFeedback');
var View=require('View');

var flattenStyle=require('flattenStyle');
var mapWithSeparator=require('mapWithSeparator');
var openFileInEditor=require('openFileInEditor');

var PropTypes=React.PropTypes;var

ElementProperties=function(_React$Component){babelHelpers.inherits(ElementProperties,_React$Component);function ElementProperties(){babelHelpers.classCallCheck(this,ElementProperties);return babelHelpers.possibleConstructorReturn(this,(ElementProperties.__proto__||Object.getPrototypeOf(ElementProperties)).apply(this,arguments));}babelHelpers.createClass(ElementProperties,[{key:'render',value:function render()






















{var _this2=this;
var style=flattenStyle(this.props.style);

var selection=this.props.selection;
var openFileButton;
var source=this.props.source;var _ref=
source||{},fileName=_ref.fileName,lineNumber=_ref.lineNumber;
if(fileName&&lineNumber){
var parts=fileName.split('/');
var fileNameShort=parts[parts.length-1];
openFileButton=
React.createElement(TouchableHighlight,{
style:styles.openButton,
onPress:openFileInEditor.bind(null,fileName,lineNumber)},
React.createElement(Text,{style:styles.openButtonTitle,numberOfLines:1},
fileNameShort,':',lineNumber));



}


return(
React.createElement(TouchableWithoutFeedback,null,
React.createElement(View,{style:styles.info},
React.createElement(View,{style:styles.breadcrumb},
mapWithSeparator(
this.props.hierarchy,
function(item,i){return(
React.createElement(TouchableHighlight,{
key:'item-'+i,
style:[styles.breadItem,i===selection&&styles.selected],

onPress:function onPress(){return _this2.props.setSelection(i);}},
React.createElement(Text,{style:styles.breadItemText},
getInstanceName(item))));},



function(i){return(
React.createElement(Text,{key:'sep-'+i,style:styles.breadSep},'\u25B8'));})),





React.createElement(View,{style:styles.row},
React.createElement(View,{style:styles.col},
React.createElement(StyleInspector,{style:style}),
openFileButton),



React.createElement(BoxInspector,{style:style,frame:this.props.frame})))));




}}]);return ElementProperties;}(React.Component);ElementProperties.propTypes={hierarchy:PropTypes.array.isRequired,style:PropTypes.oneOfType([PropTypes.object,PropTypes.array,PropTypes.number]),source:PropTypes.shape({fileName:PropTypes.string,lineNumber:PropTypes.number})};


function getInstanceName(instance){
if(instance.getName){
return instance.getName();
}
if(instance.constructor&&instance.constructor.displayName){
return instance.constructor.displayName;
}
return'Unknown';
}

var styles=StyleSheet.create({
breadSep:{
fontSize:8,
color:'white'},

breadcrumb:{
flexDirection:'row',
flexWrap:'wrap',
alignItems:'flex-start',
marginBottom:5},

selected:{
borderColor:'white',
borderRadius:5},

breadItem:{
borderWidth:1,
borderColor:'transparent',
marginHorizontal:2},

breadItemText:{
fontSize:10,
color:'white',
marginHorizontal:5},

row:{
flexDirection:'row',
alignItems:'center',
justifyContent:'space-between'},

col:{
flex:1},

info:{
padding:10},

path:{
color:'white',
fontSize:9},

openButton:{
padding:10,
backgroundColor:'#000',
marginVertical:5,
marginRight:5,
borderRadius:2},

openButtonTitle:{
color:'white',
fontSize:8}});



module.exports=ElementProperties;