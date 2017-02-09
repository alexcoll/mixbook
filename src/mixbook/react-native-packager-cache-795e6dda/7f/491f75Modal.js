










'use strict';var _container;

var AppContainer=require('AppContainer');
var I18nManager=require('I18nManager');
var Platform=require('Platform');
var React=require('React');
var StyleSheet=require('StyleSheet');
var View=require('View');

var deprecatedPropType=require('deprecatedPropType');
var requireNativeComponent=require('requireNativeComponent');
var RCTModalHostView=requireNativeComponent('RCTModalHostView',null);

var PropTypes=React.PropTypes;var
























































Modal=function(_React$Component){babelHelpers.inherits(Modal,_React$Component);function Modal(){babelHelpers.classCallCheck(this,Modal);return babelHelpers.possibleConstructorReturn(this,(Modal.__proto__||Object.getPrototypeOf(Modal)).apply(this,arguments));}babelHelpers.createClass(Modal,[{key:'render',value:function render()




















































{
if(this.props.visible===false){
return null;
}

var containerStyles={
backgroundColor:this.props.transparent?'transparent':'white'};


var animationType=this.props.animationType;
if(!animationType){

animationType='none';
if(this.props.animated){
animationType='slide';
}
}

var innerChildren=__DEV__?
React.createElement(AppContainer,{rootTag:this.context.rootTag},
this.props.children):

this.props.children;

return(
React.createElement(RCTModalHostView,{
animationType:animationType,
transparent:this.props.transparent,
onRequestClose:this.props.onRequestClose,
onShow:this.props.onShow,
style:styles.modal,
onStartShouldSetResponder:this._shouldSetResponder,
supportedOrientations:this.props.supportedOrientations,
onOrientationChange:this.props.onOrientationChange},

React.createElement(View,{style:[styles.container,containerStyles]},
innerChildren)));



}},{key:'_shouldSetResponder',value:function _shouldSetResponder()


{
return true;
}}]);return Modal;}(React.Component);Modal.propTypes={animationType:PropTypes.oneOf(['none','slide','fade']),transparent:PropTypes.bool,visible:PropTypes.bool,onRequestClose:Platform.OS==='android'?PropTypes.func.isRequired:PropTypes.func,onShow:PropTypes.func,animated:deprecatedPropType(PropTypes.bool,'Use the `animationType` prop instead.'),supportedOrientations:PropTypes.arrayOf(PropTypes.oneOf(['portrait','portrait-upside-down','landscape','landscape-left','landscape-right'])),onOrientationChange:PropTypes.func};Modal.defaultProps={visible:true};Modal.contextTypes={rootTag:React.PropTypes.number};


var side=I18nManager.isRTL?'right':'left';
var styles=StyleSheet.create({
modal:{
position:'absolute'},

container:(_container={
position:'absolute'},babelHelpers.defineProperty(_container,
side,0),babelHelpers.defineProperty(_container,'top',
0),_container)});



module.exports=Modal;