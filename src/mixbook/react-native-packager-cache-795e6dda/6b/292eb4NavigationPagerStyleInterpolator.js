































'use strict';

var I18nManager=require('I18nManager');























function forInitial(props){var

navigationState=

props.navigationState,scene=props.scene;

var focused=navigationState.index===scene.index;
var opacity=focused?1:0;

var dir=scene.index>navigationState.index?1:-1;
var translate=focused?0:1000000*dir;
return{
opacity:opacity,
transform:[
{translateX:translate},
{translateY:translate}]};


}

function forHorizontal(props){var

layout=


props.layout,position=props.position,scene=props.scene;

if(!layout.isMeasured){
return forInitial(props);
}

var index=scene.index;
var inputRange=[index-1,index,index+1];
var width=layout.initWidth;
var outputRange=I18nManager.isRTL?
[-width,0,width]:
[width,0,-width];

var translateX=position.interpolate({
inputRange:inputRange,
outputRange:outputRange});


return{
opacity:1,
shadowColor:'transparent',
shadowRadius:0,
transform:[
{scale:1},
{translateX:translateX},
{translateY:0}]};


}

module.exports={
forHorizontal:forHorizontal};