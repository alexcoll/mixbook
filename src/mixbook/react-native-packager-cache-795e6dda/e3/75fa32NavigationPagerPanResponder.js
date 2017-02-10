










'use strict';

var Animated=require('Animated');
var NavigationAbstractPanResponder=require('NavigationAbstractPanResponder');
var NavigationCardStackPanResponder=require('NavigationCardStackPanResponder');
var I18nManager=require('I18nManager');

var clamp=require('clamp');var



















ANIMATION_DURATION=



NavigationCardStackPanResponder.ANIMATION_DURATION,POSITION_THRESHOLD=NavigationCardStackPanResponder.POSITION_THRESHOLD,RESPOND_THRESHOLD=NavigationCardStackPanResponder.RESPOND_THRESHOLD,Directions=NavigationCardStackPanResponder.Directions;




var DISTANCE_THRESHOLD=50;





var VELOCITY_THRESHOLD=1.5;var















NavigationPagerPanResponder=function(_NavigationAbstractPa){babelHelpers.inherits(NavigationPagerPanResponder,_NavigationAbstractPa);






function NavigationPagerPanResponder(
direction,
props)
{babelHelpers.classCallCheck(this,NavigationPagerPanResponder);var _this=babelHelpers.possibleConstructorReturn(this,(NavigationPagerPanResponder.__proto__||Object.getPrototypeOf(NavigationPagerPanResponder)).call(this));

_this._isResponding=false;
_this._isVertical=direction===Directions.VERTICAL;
_this._props=props;
_this._startValue=0;return _this;
}babelHelpers.createClass(NavigationPagerPanResponder,[{key:'onMoveShouldSetPanResponder',value:function onMoveShouldSetPanResponder(

event,gesture){
var props=this._props;

if(props.navigationState.index!==props.scene.index){
return false;
}

var layout=props.layout;
var isVertical=this._isVertical;
var axis=isVertical?'dy':'dx';
var index=props.navigationState.index;
var distance=isVertical?
layout.height.__getValue():
layout.width.__getValue();

return(
Math.abs(gesture[axis])>RESPOND_THRESHOLD&&
distance>0&&
index>=0);

}},{key:'onPanResponderGrant',value:function onPanResponderGrant()

{var _this2=this;
this._isResponding=false;
this._props.position.stopAnimation(function(value){
_this2._isResponding=true;
_this2._startValue=value;
});
}},{key:'onPanResponderMove',value:function onPanResponderMove(

event,gesture){
if(!this._isResponding){
return;
}var _props=






this._props,layout=_props.layout,navigationState=_props.navigationState,position=_props.position,scenes=_props.scenes;

var isVertical=this._isVertical;
var axis=isVertical?'dy':'dx';
var index=navigationState.index;
var distance=isVertical?
layout.height.__getValue():
layout.width.__getValue();
var currentValue=I18nManager.isRTL&&axis==='dx'?
this._startValue+gesture[axis]/distance:
this._startValue-gesture[axis]/distance;

var prevIndex=Math.max(
0,
index-1);


var nextIndex=Math.min(
index+1,
scenes.length-1);


var value=clamp(
prevIndex,
currentValue,
nextIndex);


position.setValue(value);
}},{key:'onPanResponderRelease',value:function onPanResponderRelease(

event,gesture){var _this3=this;
if(!this._isResponding){
return;
}

this._isResponding=false;var _props2=






this._props,navigationState=_props2.navigationState,onNavigateBack=_props2.onNavigateBack,onNavigateForward=_props2.onNavigateForward,position=_props2.position;

var isVertical=this._isVertical;
var axis=isVertical?'dy':'dx';
var velocityAxis=isVertical?'vy':'vx';
var index=navigationState.index;
var distance=I18nManager.isRTL&&axis==='dx'?
-gesture[axis]:
gesture[axis];
var moveSpeed=I18nManager.isRTL&&velocityAxis==='vx'?
-gesture[velocityAxis]:
gesture[velocityAxis];

position.stopAnimation(function(value){
_this3._reset();
if(
distance>DISTANCE_THRESHOLD||
value<=index-POSITION_THRESHOLD||
moveSpeed>VELOCITY_THRESHOLD)
{
onNavigateBack&&onNavigateBack();
return;
}

if(
distance<-DISTANCE_THRESHOLD||
value>=index+POSITION_THRESHOLD||
moveSpeed<-VELOCITY_THRESHOLD)
{
onNavigateForward&&onNavigateForward();
}
});
}},{key:'onPanResponderTerminate',value:function onPanResponderTerminate()

{
this._isResponding=false;
this._reset();
}},{key:'_reset',value:function _reset()

{
var props=this._props;
Animated.timing(
props.position,
{
toValue:props.navigationState.index,
duration:ANIMATION_DURATION}).

start();
}}]);return NavigationPagerPanResponder;}(NavigationAbstractPanResponder);


function createPanHandlers(
direction,
props)
{
var responder=new NavigationPagerPanResponder(direction,props);
return responder.panHandlers;
}

function forHorizontal(
props)
{
return createPanHandlers(Directions.HORIZONTAL,props);
}

module.exports={
forHorizontal:forHorizontal};