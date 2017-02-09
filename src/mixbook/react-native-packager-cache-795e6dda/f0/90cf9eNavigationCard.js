































'use strict';

var Animated=require('Animated');
var NavigationCardStackPanResponder=require('NavigationCardStackPanResponder');
var NavigationCardStackStyleInterpolator=require('NavigationCardStackStyleInterpolator');
var NavigationPagerPanResponder=require('NavigationPagerPanResponder');
var NavigationPagerStyleInterpolator=require('NavigationPagerStyleInterpolator');
var NavigationPointerEventsContainer=require('NavigationPointerEventsContainer');
var NavigationPropTypes=require('NavigationPropTypes');
var React=require('React');
var StyleSheet=require('StyleSheet');var
















PropTypes=React.PropTypes;var




NavigationCard=function(_React$Component){babelHelpers.inherits(NavigationCard,_React$Component);function NavigationCard(){babelHelpers.classCallCheck(this,NavigationCard);return babelHelpers.possibleConstructorReturn(this,(NavigationCard.__proto__||Object.getPrototypeOf(NavigationCard)).apply(this,arguments));}babelHelpers.createClass(NavigationCard,[{key:'render',value:function render()












{var _props=






this.props,panHandlers=_props.panHandlers,pointerEvents=_props.pointerEvents,renderScene=_props.renderScene,style=_props.style,props=babelHelpers.objectWithoutProperties(_props,['panHandlers','pointerEvents','renderScene','style']);

var viewStyle=style===undefined?
NavigationCardStackStyleInterpolator.forHorizontal(props):
style;

var viewPanHandlers=panHandlers===undefined?
NavigationCardStackPanResponder.forHorizontal(babelHelpers.extends({},
props,{
onNavigateBack:this.props.onNavigateBack})):

panHandlers;

return(
React.createElement(Animated.View,babelHelpers.extends({},
viewPanHandlers,{
pointerEvents:pointerEvents,
ref:this.props.onComponentRef,
style:[styles.main,viewStyle]}),
renderScene(props)));


}}]);return NavigationCard;}(React.Component);NavigationCard.propTypes=babelHelpers.extends({},NavigationPropTypes.SceneRendererProps,{onComponentRef:PropTypes.func.isRequired,onNavigateBack:PropTypes.func,panHandlers:NavigationPropTypes.panHandlers,pointerEvents:PropTypes.string.isRequired,renderScene:PropTypes.func.isRequired,style:PropTypes.any});


var styles=StyleSheet.create({
main:{
backgroundColor:'#E9E9EF',
bottom:0,
left:0,
position:'absolute',
right:0,
shadowColor:'black',
shadowOffset:{width:0,height:0},
shadowOpacity:0.4,
shadowRadius:10,
top:0}});



NavigationCard=NavigationPointerEventsContainer.create(NavigationCard);

NavigationCard.CardStackPanResponder=NavigationCardStackPanResponder;
NavigationCard.CardStackStyleInterpolator=NavigationCardStackStyleInterpolator;
NavigationCard.PagerPanResponder=NavigationPagerPanResponder;
NavigationCard.PagerStyleInterpolator=NavigationPagerStyleInterpolator;

module.exports=NavigationCard;