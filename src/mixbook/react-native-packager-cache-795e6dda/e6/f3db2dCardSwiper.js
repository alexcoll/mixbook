
'use strict';Object.defineProperty(exports,"__esModule",{value:true});

var _react=require('react');var _react2=babelHelpers.interopRequireDefault(_react);
var _clamp=require('clamp');var _clamp2=babelHelpers.interopRequireDefault(_clamp);
var _reactNative=require('react-native');
var _NativeBaseComponent2=require('../Base/NativeBaseComponent');var _NativeBaseComponent3=babelHelpers.interopRequireDefault(_NativeBaseComponent2);
var _View=require('./View');var _View2=babelHelpers.interopRequireDefault(_View);


var SWIPE_THRESHOLD=120;var

CardSwiper=function(_NativeBaseComponent){babelHelpers.inherits(CardSwiper,_NativeBaseComponent);

function CardSwiper(props){babelHelpers.classCallCheck(this,CardSwiper);var _this=babelHelpers.possibleConstructorReturn(this,(CardSwiper.__proto__||Object.getPrototypeOf(CardSwiper)).call(this,
props));
_this.state={
pan:new _reactNative.Animated.ValueXY(),
enter:new _reactNative.Animated.Value(0.5)};return _this;

}babelHelpers.createClass(CardSwiper,[{key:'componentDidMount',value:function componentDidMount()

{
this._animateEntrance();
}},{key:'_animateEntrance',value:function _animateEntrance()

{
_reactNative.Animated.spring(
this.state.enter,
{toValue:1,friction:8}).
start();
}},{key:'componentWillMount',value:function componentWillMount()

{var _this2=this;
this._panResponder=_reactNative.PanResponder.create({
onMoveShouldSetResponderCapture:function onMoveShouldSetResponderCapture(){return true;},
onMoveShouldSetPanResponderCapture:function onMoveShouldSetPanResponderCapture(){return true;},

onPanResponderGrant:function onPanResponderGrant(e,gestureState){
_this2.state.pan.setOffset({x:_this2.state.pan.x._value,y:_this2.state.pan.y._value});
_this2.state.pan.setValue({x:0,y:0});
},

onPanResponderMove:_reactNative.Animated.event([
null,{dx:this.state.pan.x,dy:this.state.pan.y}]),


onPanResponderRelease:function onPanResponderRelease(e,_ref){var vx=_ref.vx,vy=_ref.vy;
_this2.state.pan.flattenOffset();
var velocity;

if(vx>=0){
velocity=(0,_clamp2.default)(vx,3,5);
}else if(vx<0){
velocity=(0,_clamp2.default)(vx*-1,3,5)*-1;
}

if(Math.abs(_this2.state.pan.x._value)>SWIPE_THRESHOLD){
if(velocity>0){
_this2.props.onSwipeRight();
}else{
_this2.props.onSwipeLeft();
}
_reactNative.Animated.decay(_this2.state.pan,{
velocity:{x:velocity,y:vy},
deceleration:0.98}).
start(_this2._resetState.bind(_this2));
}else{
_reactNative.Animated.spring(_this2.state.pan,{
toValue:{x:0,y:0},
friction:4}).
start();
}
}});

}},{key:'_resetState',value:function _resetState()

{
this.state.pan.setValue({x:0,y:0});
this.state.enter.setValue(0);
this._animateEntrance();
}},{key:'render',value:function render()

{var _this3=this;var _state=

this.state,pan=_state.pan,enter=_state.enter;var _ref2=

[pan.x,pan.y],translateX=_ref2[0],translateY=_ref2[1];

var rotate=pan.x.interpolate({inputRange:[-300,0,300],outputRange:['-30deg','0deg','30deg']});
var opacity=pan.x.interpolate({inputRange:[-150,0,150],outputRange:[0.5,1,0.5]});
var scale=enter;

var animatedCardStyles={transform:[{translateX:translateX},{translateY:translateY},{rotate:rotate},{scale:scale}],opacity:opacity};



return(
_react2.default.createElement(_View2.default,{ref:function ref(c){return _this3._root=c;}},
_react2.default.createElement(_reactNative.Animated.View,babelHelpers.extends({style:animatedCardStyles},this._panResponder.panHandlers),
this.props.children)));



}}]);return CardSwiper;}(_NativeBaseComponent3.default);exports.default=CardSwiper;