































'use strict';

var NativeAnimatedModule=require('NativeModules').NativeAnimatedModule;
var NavigationCard=require('NavigationCard');
var NavigationCardStackPanResponder=require('NavigationCardStackPanResponder');
var NavigationCardStackStyleInterpolator=require('NavigationCardStackStyleInterpolator');
var NavigationPropTypes=require('NavigationPropTypes');
var NavigationTransitioner=require('NavigationTransitioner');
var React=require('React');
var StyleSheet=require('StyleSheet');
var View=require('View');var

PropTypes=React.PropTypes;var
Directions=NavigationCardStackPanResponder.Directions;var















































































NavigationCardStack=function(_React$Component){babelHelpers.inherits(NavigationCardStack,_React$Component);










































































function NavigationCardStack(props,context){babelHelpers.classCallCheck(this,NavigationCardStack);var _this=babelHelpers.possibleConstructorReturn(this,(NavigationCardStack.__proto__||Object.getPrototypeOf(NavigationCardStack)).call(this,
props,context));_this.


















_configureTransition=function(){
var isVertical=_this.props.direction==='vertical';
var animationConfig={};
if(
!!NativeAnimatedModule&&



!_this.props.enableGestures&&


NavigationCardStackStyleInterpolator.canUseNativeDriver(isVertical))
{
animationConfig.useNativeDriver=true;
}
return animationConfig;
};return _this;}babelHelpers.createClass(NavigationCardStack,[{key:'componentWillMount',value:function componentWillMount(){this._render=this._render.bind(this);this._renderScene=this._renderScene.bind(this);}},{key:'render',value:function render(){return React.createElement(NavigationTransitioner,{configureTransition:this._configureTransition,navigationState:this.props.navigationState,render:this._render,style:this.props.style});}},{key:'_render',value:function _render(

props){var _this2=this;var

renderHeader=
this.props.renderHeader;

var header=renderHeader?React.createElement(View,null,renderHeader(props)):null;

var scenes=props.scenes.map(
function(scene){return _this2._renderScene(babelHelpers.extends({},
props,{
scene:scene}));});



return(
React.createElement(View,{style:styles.container},
React.createElement(View,{
style:styles.scenes},
scenes),

header));


}},{key:'_renderScene',value:function _renderScene(

props){
var isVertical=this.props.direction==='vertical';

var style=isVertical?
NavigationCardStackStyleInterpolator.forVertical(props):
NavigationCardStackStyleInterpolator.forHorizontal(props);

var panHandlers=null;

if(this.props.enableGestures){
var panHandlersProps=babelHelpers.extends({},
props,{
onNavigateBack:this.props.onNavigateBack,
gestureResponseDistance:this.props.gestureResponseDistance});

panHandlers=isVertical?
NavigationCardStackPanResponder.forVertical(panHandlersProps):
NavigationCardStackPanResponder.forHorizontal(panHandlersProps);
}

return(
React.createElement(NavigationCard,babelHelpers.extends({},
props,{
key:'card_'+props.scene.key,
panHandlers:panHandlers,
renderScene:this.props.renderScene,
style:[style,this.props.cardStyle]})));


}}]);return NavigationCardStack;}(React.Component);NavigationCardStack.propTypes={cardStyle:View.propTypes.style,direction:PropTypes.oneOf([Directions.HORIZONTAL,Directions.VERTICAL]),gestureResponseDistance:PropTypes.number,enableGestures:PropTypes.bool,navigationState:NavigationPropTypes.navigationState.isRequired,onNavigateBack:PropTypes.func,renderHeader:PropTypes.func,renderScene:PropTypes.func.isRequired,style:View.propTypes.style};NavigationCardStack.defaultProps={direction:Directions.HORIZONTAL,enableGestures:true};


var styles=StyleSheet.create({
container:{
flex:1,




flexDirection:'column-reverse'},

scenes:{
flex:1}});



module.exports=NavigationCardStack;