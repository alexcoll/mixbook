




'use strict';

var React=require('React');
var ScrollResponder=require('ScrollResponder');
var ScrollView=require('ScrollView');
var View=require('View');
var StyleSheet=require('StyleSheet');

var requireNativeComponent=require('requireNativeComponent');

var INNERVIEW='InnerView';




































var RecyclerViewBackedScrollView=React.createClass({displayName:'RecyclerViewBackedScrollView',

propTypes:babelHelpers.extends({},
ScrollView.propTypes),


mixins:[ScrollResponder.Mixin],

getInitialState:function getInitialState(){
return this.scrollResponderMixinGetInitialState();
},

getScrollResponder:function getScrollResponder(){
return this;
},

setNativeProps:function setNativeProps(props){
this.refs[INNERVIEW].setNativeProps(props);
},

_handleContentSizeChange:function _handleContentSizeChange(event){var _event$nativeEvent=
event.nativeEvent,width=_event$nativeEvent.width,height=_event$nativeEvent.height;
this.props.onContentSizeChange(width,height);
},












scrollTo:function scrollTo(
y,
x,
animated)
{
if(typeof y==='number'){
console.warn('`scrollTo(y, x, animated)` is deprecated. Use `scrollTo({x: 5, y: 5, animated: true})` instead.');
}else{var _ref=
y||{};x=_ref.x;y=_ref.y;animated=_ref.animated;
}
this.getScrollResponder().scrollResponderScrollTo({x:x||0,y:y||0,animated:animated!==false});
},

render:function render(){
var recyclerProps=babelHelpers.extends({},
this.props,{
onTouchStart:this.scrollResponderHandleTouchStart,
onTouchMove:this.scrollResponderHandleTouchMove,
onTouchEnd:this.scrollResponderHandleTouchEnd,
onScrollBeginDrag:this.scrollResponderHandleScrollBeginDrag,
onScrollEndDrag:this.scrollResponderHandleScrollEndDrag,
onMomentumScrollBegin:this.scrollResponderHandleMomentumScrollBegin,
onMomentumScrollEnd:this.scrollResponderHandleMomentumScrollEnd,
onStartShouldSetResponder:this.scrollResponderHandleStartShouldSetResponder,
onStartShouldSetResponderCapture:this.scrollResponderHandleStartShouldSetResponderCapture,
onScrollShouldSetResponder:this.scrollResponderHandleScrollShouldSetResponder,
onResponderGrant:this.scrollResponderHandleResponderGrant,
onResponderRelease:this.scrollResponderHandleResponderRelease,
onResponderReject:this.scrollResponderHandleResponderReject,
onScroll:this.scrollResponderHandleScroll,
ref:INNERVIEW});


if(this.props.onContentSizeChange){
recyclerProps.onContentSizeChange=this._handleContentSizeChange;
}

var wrappedChildren=React.Children.map(this.props.children,function(child){
if(!child){
return null;
}
return(
React.createElement(View,{
collapsable:false,
style:styles.absolute},
child));


});

var refreshControl=this.props.refreshControl;
if(refreshControl){

return React.cloneElement(
refreshControl,
{style:[styles.base,this.props.style]},
React.createElement(NativeAndroidRecyclerView,babelHelpers.extends({},recyclerProps,{style:styles.base}),
wrappedChildren));


}

return(
React.createElement(NativeAndroidRecyclerView,babelHelpers.extends({},recyclerProps,{style:[styles.base,this.props.style]}),
wrappedChildren));


}});


var styles=StyleSheet.create({
absolute:{
position:'absolute',
top:0,
left:0,
right:0},

base:{
flex:1}});



var NativeAndroidRecyclerView=requireNativeComponent(
'AndroidRecyclerViewBackedScrollView',
RecyclerViewBackedScrollView);


module.exports=RecyclerViewBackedScrollView;