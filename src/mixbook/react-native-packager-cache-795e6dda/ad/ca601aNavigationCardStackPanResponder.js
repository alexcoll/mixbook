










'use strict';

var Animated=require('Animated');
var I18nManager=require('I18nManager');
var NavigationAbstractPanResponder=require('NavigationAbstractPanResponder');

var clamp=require('clamp');






var emptyFunction=function emptyFunction(){};




var ANIMATION_DURATION=250;






var POSITION_THRESHOLD=1/3;




var RESPOND_THRESHOLD=15;




var DISTANCE_THRESHOLD=100;




var Directions={
'HORIZONTAL':'horizontal',
'VERTICAL':'vertical'};var


























NavigationCardStackPanResponder=function(_NavigationAbstractPa){babelHelpers.inherits(NavigationCardStackPanResponder,_NavigationAbstractPa);






function NavigationCardStackPanResponder(
direction,
props)
{babelHelpers.classCallCheck(this,NavigationCardStackPanResponder);var _this=babelHelpers.possibleConstructorReturn(this,(NavigationCardStackPanResponder.__proto__||Object.getPrototypeOf(NavigationCardStackPanResponder)).call(this));

_this._isResponding=false;
_this._isVertical=direction===Directions.VERTICAL;
_this._props=props;
_this._startValue=0;








_this._addNativeListener(_this._props.layout.width);
_this._addNativeListener(_this._props.layout.height);
_this._addNativeListener(_this._props.position);return _this;
}babelHelpers.createClass(NavigationCardStackPanResponder,[{key:'onMoveShouldSetPanResponder',value:function onMoveShouldSetPanResponder(

event,gesture){
var props=this._props;

if(props.navigationState.index!==props.scene.index){
return false;
}

var layout=props.layout;
var isVertical=this._isVertical;
var index=props.navigationState.index;
var currentDragDistance=gesture[isVertical?'dy':'dx'];
var currentDragPosition=gesture[isVertical?'moveY':'moveX'];
var maxDragDistance=isVertical?
layout.height.__getValue():
layout.width.__getValue();

var positionMax=isVertical?
props.gestureResponseDistance:




props.gestureResponseDistance||30;

if(positionMax!=null&&currentDragPosition>positionMax){
return false;
}

return(
Math.abs(currentDragDistance)>RESPOND_THRESHOLD&&
maxDragDistance>0&&
index>0);

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
}

var props=this._props;
var layout=props.layout;
var isVertical=this._isVertical;
var axis=isVertical?'dy':'dx';
var index=props.navigationState.index;
var distance=isVertical?
layout.height.__getValue():
layout.width.__getValue();
var currentValue=I18nManager.isRTL&&axis==='dx'?
this._startValue+gesture[axis]/distance:
this._startValue-gesture[axis]/distance;

var value=clamp(
index-1,
currentValue,
index);


props.position.setValue(value);
}},{key:'onPanResponderRelease',value:function onPanResponderRelease(

event,gesture){var _this3=this;
if(!this._isResponding){
return;
}

this._isResponding=false;

var props=this._props;
var isVertical=this._isVertical;
var axis=isVertical?'dy':'dx';
var index=props.navigationState.index;
var distance=I18nManager.isRTL&&axis==='dx'?
-gesture[axis]:
gesture[axis];

props.position.stopAnimation(function(value){
_this3._reset();

if(!props.onNavigateBack){
return;
}

if(
distance>DISTANCE_THRESHOLD||
value<=index-POSITION_THRESHOLD)
{
props.onNavigateBack();
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
duration:ANIMATION_DURATION,
useNativeDriver:props.position.__isNative}).

start();
}},{key:'_addNativeListener',value:function _addNativeListener(

animatedValue){
if(!animatedValue.__isNative){
return;
}

if(Object.keys(animatedValue._listeners).length===0){
animatedValue.addListener(emptyFunction);
}
}}]);return NavigationCardStackPanResponder;}(NavigationAbstractPanResponder);


function createPanHandlers(
direction,
props)
{
var responder=new NavigationCardStackPanResponder(direction,props);
return responder.panHandlers;
}

function forHorizontal(
props)
{
return createPanHandlers(Directions.HORIZONTAL,props);
}

function forVertical(
props)
{
return createPanHandlers(Directions.VERTICAL,props);
}

module.exports={

ANIMATION_DURATION:ANIMATION_DURATION,
DISTANCE_THRESHOLD:DISTANCE_THRESHOLD,
POSITION_THRESHOLD:POSITION_THRESHOLD,
RESPOND_THRESHOLD:RESPOND_THRESHOLD,


Directions:Directions,


forHorizontal:forHorizontal,
forVertical:forVertical};