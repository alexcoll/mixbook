'use strict';

var React=require('react');var _require=










require('react-native'),View=_require.View,StyleSheet=_require.StyleSheet,PanResponder=_require.PanResponder,Animated=_require.Animated,TouchableWithoutFeedback=_require.TouchableWithoutFeedback,Dimensions=_require.Dimensions,Easing=_require.Easing,BackAndroid=_require.BackAndroid,Platform=_require.Platform;

var screen=Dimensions.get('window');

var styles=StyleSheet.create({

wrapper:{
backgroundColor:"white"},


transparent:{
backgroundColor:'rgba(0,0,0,0)'},


absolute:{
position:"absolute",
top:0,
bottom:0,
left:0,
right:0}});




var ModalBox=React.createClass({displayName:'ModalBox',

propTypes:{
isOpen:React.PropTypes.bool,
isDisabled:React.PropTypes.bool,
startOpen:React.PropTypes.bool,
backdropPressToClose:React.PropTypes.bool,
swipeToClose:React.PropTypes.bool,
swipeThreshold:React.PropTypes.number,
swipeArea:React.PropTypes.number,
position:React.PropTypes.string,
entry:React.PropTypes.string,
backdrop:React.PropTypes.bool,
backdropOpacity:React.PropTypes.number,
backdropColor:React.PropTypes.string,
backdropContent:React.PropTypes.element,
animationDuration:React.PropTypes.number,
backButtonClose:React.PropTypes.bool,

onClosed:React.PropTypes.func,
onOpened:React.PropTypes.func,
onClosingState:React.PropTypes.func},


getDefaultProps:function getDefaultProps(){
return{
startOpen:false,
backdropPressToClose:true,
swipeToClose:true,
swipeThreshold:50,
position:"center",
backdrop:true,
backdropOpacity:0.5,
backdropColor:"black",
backdropContent:null,
animationDuration:400,
backButtonClose:false};

},

getInitialState:function getInitialState(){
var position=this.props.entry==='top'?-screen.height:screen.height;
return{
position:this.props.startOpen?new Animated.Value(0):new Animated.Value(position),
backdropOpacity:new Animated.Value(0),
isOpen:this.props.startOpen,
isAnimateClose:false,
isAnimateOpen:false,
swipeToClose:false,
height:screen.height,
width:screen.width,
containerHeight:screen.height,
containerWidth:screen.width,
isInitialized:false};

},

onBackPress:function onBackPress(){
this.close();
return true;
},

componentWillMount:function componentWillMount(){
this.createPanResponder();
this.handleOpenning(this.props);

},

componentWillReceiveProps:function componentWillReceiveProps(props){
this.handleOpenning(props);
},

handleOpenning:function handleOpenning(props){
if(typeof props.isOpen=="undefined")return;
if(props.isOpen)
this.open();else

this.close();
},






animateBackdropOpen:function animateBackdropOpen(){var _this=this;
if(this.state.isAnimateBackdrop){
this.state.animBackdrop.stop();
this.state.isAnimateBackdrop=false;
}

this.state.isAnimateBackdrop=true;
this.state.animBackdrop=Animated.timing(
this.state.backdropOpacity,
{
toValue:1,
duration:this.props.animationDuration});


this.state.animBackdrop.start(function(){
_this.state.isAnimateBackdrop=false;
});
},




animateBackdropClose:function animateBackdropClose(){var _this2=this;
if(this.state.isAnimateBackdrop){
this.state.animBackdrop.stop();
this.state.isAnimateBackdrop=false;
}

this.state.isAnimateBackdrop=true;
this.state.animBackdrop=Animated.timing(
this.state.backdropOpacity,
{
toValue:0,
duration:this.props.animationDuration});


this.state.animBackdrop.start(function(){
_this2.state.isAnimateBackdrop=false;
});
},




stopAnimateOpen:function stopAnimateOpen(){
if(this.state.isAnimateOpen){
if(this.state.animOpen)this.state.animOpen.stop();
this.state.isAnimateOpen=false;
}
},




animateOpen:function animateOpen(){var _this3=this;
this.stopAnimateClose();


if(this.props.backdrop)
this.animateBackdropOpen();

this.state.isAnimateOpen=true;

requestAnimationFrame(function(){

_this3.state.positionDest=_this3.calculateModalPosition(_this3.state.containerHeight,_this3.state.containerWidth);

_this3.state.animOpen=Animated.timing(
_this3.state.position,
{
toValue:_this3.state.positionDest,
duration:_this3.props.animationDuration,
easing:Easing.elastic(0.8)});


_this3.state.animOpen.start(function(){
_this3.state.isAnimateOpen=false;
_this3.state.isOpen=true;
if(_this3.props.onOpened)_this3.props.onOpened();
});
});

},




stopAnimateClose:function stopAnimateClose(){
if(this.state.isAnimateClose){
if(this.state.animClose)this.state.animClose.stop();
this.state.isAnimateClose=false;
}
},




animateClose:function animateClose(){var _this4=this;
this.stopAnimateOpen();


if(this.props.backdrop)
this.animateBackdropClose();

this.state.isAnimateClose=true;
this.state.animClose=Animated.timing(
this.state.position,
{
toValue:this.props.entry==='top'?-this.state.containerHeight:this.state.containerHeight,
duration:this.props.animationDuration});


this.state.animClose.start(function(){
_this4.state.isAnimateClose=false;
_this4.state.isOpen=false;
_this4.setState({});
if(_this4.props.onClosed)_this4.props.onClosed();
});
},




calculateModalPosition:function calculateModalPosition(containerHeight,containerWidth){
var position=0;

if(this.props.position=="bottom"){
position=containerHeight-this.state.height;
}else
if(this.props.position=="center"){
position=containerHeight/2-this.state.height/2;
}

if(position<0)position=0;
return position;
},





createPanResponder:function createPanResponder(){var _this5=this;
var closingState=false;
var inSwipeArea=false;

var onPanRelease=function onPanRelease(evt,state){
if(!inSwipeArea)return;
inSwipeArea=false;
if(_this5.props.entry==='top'?-state.dy>_this5.props.swipeThreshold:state.dy>_this5.props.swipeThreshold)
_this5.animateClose();else

_this5.animateOpen();
};

var animEvt=Animated.event([null,{customY:this.state.position}]);

var onPanMove=function onPanMove(evt,state){
var newClosingState=_this5.props.entry==='top'?-state.dy>_this5.props.swipeThreshold:state.dy>_this5.props.swipeThreshold;
if(_this5.props.entry==='top'?state.dy>0:state.dy<0)return;
if(newClosingState!=closingState&&_this5.props.onClosingState)
_this5.props.onClosingState(newClosingState);
closingState=newClosingState;
state.customY=state.dy+_this5.state.positionDest;

animEvt(evt,state);
};

var onPanStart=function onPanStart(evt,state){
if(!_this5.props.swipeToClose||_this5.props.isDisabled||_this5.props.swipeArea&&evt.nativeEvent.pageY-_this5.state.positionDest>_this5.props.swipeArea){
inSwipeArea=false;
return false;
}
inSwipeArea=true;
return true;
};

this.state.pan=PanResponder.create({
onStartShouldSetPanResponder:onPanStart,
onPanResponderMove:onPanMove,
onPanResponderRelease:onPanRelease,
onPanResponderTerminate:onPanRelease});

},




onViewLayout:function onViewLayout(evt){
this.state.height=evt.nativeEvent.layout.height;
this.state.width=evt.nativeEvent.layout.width;

if(this.onViewLayoutCalculated)this.onViewLayoutCalculated();
},




onContainerLayout:function onContainerLayout(evt){
var height=evt.nativeEvent.layout.height;
var width=evt.nativeEvent.layout.width;


if(height==this.state.containerHeight&&width==this.state.containerWidth){
this.state.isInitialized=true;
return;
}

var modalPosition=this.calculateModalPosition(height,width);
var coords={};


if(this.state.isInitialized&&(this.state.isOpen||this.state.isAnimateOpen||this.state.isAnimateClose)){
var position=this.state.isOpen?modalPosition:this.state.containerHeight;


if(this.state.isAnimateOpen){
position=modalPosition;
this.stopAnimateOpen();
}else if(this.state.isAnimateClose){
position=this.state.containerHeight;
this.stopAnimateClose();
}
this.state.position.setValue(position);
coords={positionDest:position};
}

this.setState(babelHelpers.extends({
isInitialized:true,
containerHeight:height,
containerWidth:width},
coords));

},




renderBackdrop:function renderBackdrop(size){
var backdrop=[];

if(this.props.backdrop){
backdrop=
React.createElement(TouchableWithoutFeedback,{onPress:this.props.backdropPressToClose?this.close:null},
React.createElement(Animated.View,{style:[styles.absolute,size,{opacity:this.state.backdropOpacity}]},
React.createElement(View,{style:[styles.absolute,{backgroundColor:this.props.backdropColor,opacity:this.props.backdropOpacity}]}),
this.props.backdropContent||[]));



}

return backdrop;
},




render:function render(){
var visible=this.state.isOpen||this.state.isAnimateOpen||this.state.isAnimateClose;
var size={height:this.state.containerHeight,width:this.state.containerWidth};
var offsetX=(this.state.containerWidth-this.state.width)/2;
var backdrop=this.renderBackdrop(size);

if(!visible)return React.createElement(View,null);

return(
React.createElement(View,{style:[styles.transparent,styles.absolute],pointerEvents:'box-none',onLayout:this.onContainerLayout},
backdrop,
React.createElement(Animated.View,babelHelpers.extends({
onLayout:this.onViewLayout,
style:[styles.wrapper,size,this.props.style,{transform:[{translateY:this.state.position},{translateX:offsetX}]}]},
this.state.pan.panHandlers),
this.props.children)));



},



open:function open(){var _this6=this;
if(this.props.isDisabled)return;
if(!this.state.isAnimateOpen&&(!this.state.isOpen||this.state.isAnimateClose)){
this.onViewLayoutCalculated=function(){
_this6.setState({});
_this6.animateOpen();
if(_this6.props.backButtonClose&&Platform.OS==='android')BackAndroid.addEventListener('hardwareBackPress',_this6.onBackPress);
};
this.setState({isAnimateOpen:true});
}
},

close:function close(){
if(this.props.isDisabled)return;
if(!this.state.isAnimateClose&&(this.state.isOpen||this.state.isAnimateOpen)){
delete this.onViewLayoutCalculated;
this.animateClose();
if(this.props.backButtonClose&&Platform.OS==='android')BackAndroid.removeEventListener('hardwareBackPress',this.onBackPress);
}
}});




module.exports=ModalBox;