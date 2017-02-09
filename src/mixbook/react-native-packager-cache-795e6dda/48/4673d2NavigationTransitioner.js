










'use strict';

var Animated=require('Animated');
var Easing=require('Easing');
var NavigationPropTypes=require('NavigationPropTypes');
var NavigationScenesReducer=require('NavigationScenesReducer');
var React=require('React');
var StyleSheet=require('StyleSheet');
var View=require('View');var





























PropTypes=React.PropTypes;

var DefaultTransitionSpec={
duration:250,
easing:Easing.inOut(Easing.ease),
timing:Animated.timing};var


NavigationTransitioner=function(_React$Component){babelHelpers.inherits(NavigationTransitioner,_React$Component);

















function NavigationTransitioner(props,context){babelHelpers.classCallCheck(this,NavigationTransitioner);var _this=babelHelpers.possibleConstructorReturn(this,(NavigationTransitioner.__proto__||Object.getPrototypeOf(NavigationTransitioner)).call(this,
props,context));



var layout={
height:new Animated.Value(0),
initHeight:0,
initWidth:0,
isMeasured:false,
width:new Animated.Value(0)};


_this.state={
layout:layout,
position:new Animated.Value(_this.props.navigationState.index),
progress:new Animated.Value(1),
scenes:NavigationScenesReducer([],_this.props.navigationState)};


_this._prevTransitionProps=null;
_this._transitionProps=buildTransitionProps(props,_this.state);
_this._isMounted=false;return _this;
}babelHelpers.createClass(NavigationTransitioner,[{key:'componentWillMount',value:function componentWillMount()

{
this._onLayout=this._onLayout.bind(this);
this._onTransitionEnd=this._onTransitionEnd.bind(this);
}},{key:'componentDidMount',value:function componentDidMount()

{
this._isMounted=true;
}},{key:'componentWillUnmount',value:function componentWillUnmount()

{
this._isMounted=false;
}},{key:'componentWillReceiveProps',value:function componentWillReceiveProps(

nextProps){var _this2=this;
var nextScenes=NavigationScenesReducer(
this.state.scenes,
nextProps.navigationState,
this.props.navigationState);


if(nextScenes===this.state.scenes){
return;
}

var nextState=babelHelpers.extends({},
this.state,{
scenes:nextScenes});


this._prevTransitionProps=this._transitionProps;
this._transitionProps=buildTransitionProps(nextProps,nextState);var


position=

nextState.position,progress=nextState.progress;


var transitionUserSpec=nextProps.configureTransition?
nextProps.configureTransition(
this._transitionProps,
this._prevTransitionProps):

null;

var transitionSpec=babelHelpers.extends({},
DefaultTransitionSpec,
transitionUserSpec);var


timing=transitionSpec.timing;
delete transitionSpec.timing;

progress.setValue(0);

var animations=[
timing(
progress,babelHelpers.extends({},

transitionSpec,{
toValue:1}))];




if(nextProps.navigationState.index!==this.props.navigationState.index){
animations.push(
timing(
position,babelHelpers.extends({},

transitionSpec,{
toValue:nextProps.navigationState.index})));



}


this.setState(nextState,function(){
nextProps.onTransitionStart&&nextProps.onTransitionStart(
_this2._transitionProps,
_this2._prevTransitionProps);

Animated.parallel(animations).start(_this2._onTransitionEnd);
});
}},{key:'render',value:function render()

{
return(
React.createElement(View,{
onLayout:this._onLayout,
style:[styles.main,this.props.style]},
this.props.render(this._transitionProps,this._prevTransitionProps)));


}},{key:'_onLayout',value:function _onLayout(

event){var _event$nativeEvent$la=
event.nativeEvent.layout,height=_event$nativeEvent$la.height,width=_event$nativeEvent$la.width;
if(this.state.layout.initWidth===width&&
this.state.layout.initHeight===height){
return;
}
var layout=babelHelpers.extends({},
this.state.layout,{
initHeight:height,
initWidth:width,
isMeasured:true});


layout.height.setValue(height);
layout.width.setValue(width);

var nextState=babelHelpers.extends({},
this.state,{
layout:layout});


this._transitionProps=buildTransitionProps(this.props,nextState);
this.setState(nextState);
}},{key:'_onTransitionEnd',value:function _onTransitionEnd()

{var _this3=this;
if(!this._isMounted){
return;
}

var prevTransitionProps=this._prevTransitionProps;
this._prevTransitionProps=null;

var nextState=babelHelpers.extends({},
this.state,{
scenes:this.state.scenes.filter(isSceneNotStale)});


this._transitionProps=buildTransitionProps(this.props,nextState);

this.setState(nextState,function(){
_this3.props.onTransitionEnd&&_this3.props.onTransitionEnd(
_this3._transitionProps,
prevTransitionProps);

});
}}]);return NavigationTransitioner;}(React.Component);NavigationTransitioner.propTypes={configureTransition:PropTypes.func,navigationState:NavigationPropTypes.navigationState.isRequired,onTransitionEnd:PropTypes.func,onTransitionStart:PropTypes.func,render:PropTypes.func.isRequired};


function buildTransitionProps(
props,
state)
{var

navigationState=
props.navigationState;var


layout=



state.layout,position=state.position,progress=state.progress,scenes=state.scenes;

return{
layout:layout,
navigationState:navigationState,
position:position,
progress:progress,
scenes:scenes,

scene:scenes.find(isSceneActive)};

}

function isSceneNotStale(scene){
return!scene.isStale;
}

function isSceneActive(scene){
return scene.isActive;
}

var styles=StyleSheet.create({
main:{
flex:1}});



module.exports=NavigationTransitioner;