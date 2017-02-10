































'use strict';

var React=require('React');
var ReactNative=require('react-native');
var NavigationHeaderTitle=require('NavigationHeaderTitle');
var NavigationHeaderBackButton=require('NavigationHeaderBackButton');
var NavigationPropTypes=require('NavigationPropTypes');
var NavigationHeaderStyleInterpolator=require('NavigationHeaderStyleInterpolator');
var ReactComponentWithPureRenderMixin=require('react/lib/ReactComponentWithPureRenderMixin');var


Animated=



ReactNative.Animated,Platform=ReactNative.Platform,StyleSheet=ReactNative.StyleSheet,View=ReactNative.View;































var APPBAR_HEIGHT=Platform.OS==='ios'?44:56;
var STATUSBAR_HEIGHT=Platform.OS==='ios'?20:0;var
PropTypes=React.PropTypes;var

NavigationHeader=function(_React$Component){babelHelpers.inherits(NavigationHeader,_React$Component);function NavigationHeader(){babelHelpers.classCallCheck(this,NavigationHeader);return babelHelpers.possibleConstructorReturn(this,(NavigationHeader.__proto__||Object.getPrototypeOf(NavigationHeader)).apply(this,arguments));}babelHelpers.createClass(NavigationHeader,[{key:'shouldComponentUpdate',value:function shouldComponentUpdate(






































nextProps,nextState){
return ReactComponentWithPureRenderMixin.shouldComponentUpdate.call(
this,
nextProps,
nextState);

}},{key:'render',value:function render()

{var _this2=this;var _props=
this.props,scenes=_props.scenes,style=_props.style,viewProps=_props.viewProps;

var scenesProps=scenes.map(function(scene){
var props=NavigationPropTypes.extractSceneRendererProps(_this2.props);
props.scene=scene;
return props;
});

var barHeight=this.props.statusBarHeight instanceof Animated.Value?
Animated.add(this.props.statusBarHeight,new Animated.Value(APPBAR_HEIGHT)):
APPBAR_HEIGHT+this.props.statusBarHeight;

return(
React.createElement(Animated.View,babelHelpers.extends({style:[
styles.appbar,
{height:barHeight},
style]},

viewProps),

scenesProps.map(this._renderLeft,this),
scenesProps.map(this._renderTitle,this),
scenesProps.map(this._renderRight,this)));


}},{key:'_renderLeft',value:function _renderLeft(

props){
return this._renderSubView(
props,
'left',
this.props.renderLeftComponent,
NavigationHeaderStyleInterpolator.forLeft);

}},{key:'_renderTitle',value:function _renderTitle(

props){
return this._renderSubView(
props,
'title',
this.props.renderTitleComponent,
NavigationHeaderStyleInterpolator.forCenter);

}},{key:'_renderRight',value:function _renderRight(

props){
return this._renderSubView(
props,
'right',
this.props.renderRightComponent,
NavigationHeaderStyleInterpolator.forRight);

}},{key:'_renderSubView',value:function _renderSubView(


props,
name,
renderer,
styleInterpolator)
{var

scene=

props.scene,navigationState=props.navigationState;var


index=


scene.index,isStale=scene.isStale,key=scene.key;

var offset=navigationState.index-index;

if(Math.abs(offset)>2){


return null;
}

var subViewProps=babelHelpers.extends({},props,{onNavigateBack:this.props.onNavigateBack});
var subView=renderer(subViewProps);
if(subView===null){
return null;
}

var pointerEvents=offset!==0||isStale?'none':'box-none';
return(
React.createElement(Animated.View,{
pointerEvents:pointerEvents,
key:name+'_'+key,
style:[
styles[name],
{marginTop:this.props.statusBarHeight},
styleInterpolator(props)]},

subView));


}}]);return NavigationHeader;}(React.Component);NavigationHeader.defaultProps={renderTitleComponent:function renderTitleComponent(props){var title=String(props.scene.route.title||'');return React.createElement(NavigationHeaderTitle,null,title);},renderLeftComponent:function renderLeftComponent(props){if(props.scene.index===0||!props.onNavigateBack){return null;}return React.createElement(NavigationHeaderBackButton,{onPress:props.onNavigateBack});},renderRightComponent:function renderRightComponent(props){return null;},statusBarHeight:STATUSBAR_HEIGHT};NavigationHeader.propTypes=babelHelpers.extends({},NavigationPropTypes.SceneRendererProps,{onNavigateBack:PropTypes.func,renderLeftComponent:PropTypes.func,renderRightComponent:PropTypes.func,renderTitleComponent:PropTypes.func,style:View.propTypes.style,statusBarHeight:PropTypes.number,viewProps:PropTypes.shape(View.propTypes)});NavigationHeader.

HEIGHT=APPBAR_HEIGHT+STATUSBAR_HEIGHT;NavigationHeader.
Title=NavigationHeaderTitle;NavigationHeader.
BackButton=NavigationHeaderBackButton;



var styles=StyleSheet.create({
appbar:{
alignItems:'center',
backgroundColor:Platform.OS==='ios'?'#EFEFF2':'#FFF',
borderBottomColor:'rgba(0, 0, 0, .15)',
borderBottomWidth:Platform.OS==='ios'?StyleSheet.hairlineWidth:0,
elevation:4,
flexDirection:'row',
justifyContent:'flex-start'},


title:{
bottom:0,
left:APPBAR_HEIGHT,
position:'absolute',
right:APPBAR_HEIGHT,
top:0},


left:{
bottom:0,
left:0,
position:'absolute',
top:0},


right:{
bottom:0,
position:'absolute',
right:0,
top:0}});



module.exports=NavigationHeader;