










'use strict';












var Animated=require('Animated');
var React=require('React');var

PropTypes=React.PropTypes;


var action=PropTypes.shape({
type:PropTypes.string.isRequired});



var animatedValue=PropTypes.instanceOf(Animated.Value);


var navigationRoute=PropTypes.shape({
key:PropTypes.string.isRequired});



var navigationState=PropTypes.shape({
index:PropTypes.number.isRequired,
routes:PropTypes.arrayOf(navigationRoute)});



var layout=PropTypes.shape({
height:animatedValue,
initHeight:PropTypes.number.isRequired,
initWidth:PropTypes.number.isRequired,
isMeasured:PropTypes.bool.isRequired,
width:animatedValue});



var scene=PropTypes.shape({
index:PropTypes.number.isRequired,
isActive:PropTypes.bool.isRequired,
isStale:PropTypes.bool.isRequired,
key:PropTypes.string.isRequired,
route:navigationRoute.isRequired});



var SceneRendererProps={
layout:layout.isRequired,
navigationState:navigationState.isRequired,
position:animatedValue.isRequired,
progress:animatedValue.isRequired,
scene:scene.isRequired,
scenes:PropTypes.arrayOf(scene).isRequired};


var SceneRenderer=PropTypes.shape(SceneRendererProps);


var panHandlers=PropTypes.shape({
onMoveShouldSetResponder:PropTypes.func.isRequired,
onMoveShouldSetResponderCapture:PropTypes.func.isRequired,
onResponderEnd:PropTypes.func.isRequired,
onResponderGrant:PropTypes.func.isRequired,
onResponderMove:PropTypes.func.isRequired,
onResponderReject:PropTypes.func.isRequired,
onResponderRelease:PropTypes.func.isRequired,
onResponderStart:PropTypes.func.isRequired,
onResponderTerminate:PropTypes.func.isRequired,
onResponderTerminationRequest:PropTypes.func.isRequired,
onStartShouldSetResponder:PropTypes.func.isRequired,
onStartShouldSetResponderCapture:PropTypes.func.isRequired});





function extractSceneRendererProps(
props)
{
return{
layout:props.layout,
navigationState:props.navigationState,
position:props.position,
progress:props.progress,
scene:props.scene,
scenes:props.scenes};

}

module.exports={

extractSceneRendererProps:extractSceneRendererProps,


SceneRendererProps:SceneRendererProps,


SceneRenderer:SceneRenderer,
action:action,
navigationState:navigationState,
navigationRoute:navigationRoute,
panHandlers:panHandlers};