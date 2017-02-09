'use strict';Object.defineProperty(exports,"__esModule",{value:true});

var _react=require('react');var _react2=babelHelpers.interopRequireDefault(_react);
var _NativeBaseComponent2=require('../../Base/NativeBaseComponent');var _NativeBaseComponent3=babelHelpers.interopRequireDefault(_NativeBaseComponent2);
var _reactNative=require('react-native');








var _DefaultTabBar=require('./DefaultTabBar');var _DefaultTabBar2=babelHelpers.interopRequireDefault(_DefaultTabBar);
var deviceWidth=_reactNative.Dimensions.get('window').width;var

ScrollableTabView=function(_NativeBaseComponent){babelHelpers.inherits(ScrollableTabView,_NativeBaseComponent);







function ScrollableTabView(props){babelHelpers.classCallCheck(this,ScrollableTabView);var _this=babelHelpers.possibleConstructorReturn(this,(ScrollableTabView.__proto__||Object.getPrototypeOf(ScrollableTabView)).call(this,
props));
var currentPage=_this.props.initialPage||0;
_this.state={
currentPage:currentPage,
scrollValue:new _reactNative.Animated.Value(currentPage)};return _this;

}babelHelpers.createClass(ScrollableTabView,[{key:'componentWillMount',value:function componentWillMount()

{var _this2=this;
var release=function release(e,gestureState){
var relativeGestureDistance=gestureState.dx/deviceWidth,
lastPageIndex=_this2.props.children.length-1,
vx=gestureState.vx,
newPage=_this2.state.currentPage;

if(relativeGestureDistance<-0.5||relativeGestureDistance<0&&vx<=-0.5){
newPage=newPage+1;
}else if(relativeGestureDistance>0.5||relativeGestureDistance>0&&vx>=0.5){
newPage=newPage-1;
}

_this2.props.hasTouch&&_this2.props.hasTouch(false);
_this2.goToPage(Math.max(0,Math.min(newPage,_this2.props.children.length-1)));
};

this._panResponder=_reactNative.PanResponder.create({

onMoveShouldSetPanResponder:function onMoveShouldSetPanResponder(e,gestureState){
if(Math.abs(gestureState.dx)>Math.abs(gestureState.dy)){
if((gestureState.moveX<=_this2.props.edgeHitWidth||
gestureState.moveX>=deviceWidth-_this2.props.edgeHitWidth)&&
_this2.props.locked!==true){
_this2.props.hasTouch&&_this2.props.hasTouch(true);
return true;
}
}
},


onPanResponderRelease:release,
onPanResponderTerminate:release,


onPanResponderMove:function onPanResponderMove(e,gestureState){
var dx=gestureState.dx;
var lastPageIndex=_this2.props.children.length-1;



var offsetX=dx-_this2.state.currentPage*deviceWidth;
_this2.state.scrollValue.setValue(-1*offsetX/deviceWidth);
}});

}},{key:'goToPage',value:function goToPage(

pageNumber){
this.props.onChangeTab&&this.props.onChangeTab({
i:pageNumber,ref:this.props.children[pageNumber]});


this.setState({
currentPage:pageNumber});


_reactNative.Animated.spring(this.state.scrollValue,{toValue:pageNumber,friction:this.props.springFriction,tension:this.props.springTension}).start();
}},{key:'renderTabBar',value:function renderTabBar(

props){
if(this.props.renderTabBar===false){
return null;
}else if(this.props.renderTabBar){
return _react2.default.cloneElement(this.props.renderTabBar(),props);
}else{
return _react2.default.createElement(_DefaultTabBar2.default,props);
}
}},{key:'render',value:function render()

{
var sceneContainerStyle={
width:deviceWidth*this.props.children.length,
flex:1,
flexDirection:'row'};


var translateX=this.state.scrollValue.interpolate({
inputRange:[0,1],outputRange:[0,-deviceWidth]});


var tabBarProps={
goToPage:this.goToPage.bind(this),
tabs:this.props.children.map(function(child){return child.props.tabLabel;}),
activeTab:this.state.currentPage,
scrollValue:this.state.scrollValue};


return(
_react2.default.createElement(_reactNative.View,{style:{flex:1}},
this.props.tabBarPosition==='top'?this.renderTabBar(tabBarProps):null,
_react2.default.createElement(_reactNative.Animated.View,babelHelpers.extends({style:[sceneContainerStyle,{transform:[{translateX:translateX}]}]},
this._panResponder.panHandlers),
this.props.children),

this.props.tabBarPosition==='bottom'?this.renderTabBar(tabBarProps):null));


}}]);return ScrollableTabView;}(_NativeBaseComponent3.default);ScrollableTabView.defaultProps=babelHelpers.extends({},_NativeBaseComponent3.default.defaultProps,{tabBarPosition:'top',edgeHitWidth:30,springTension:50,springFriction:10});exports.default=ScrollableTabView;