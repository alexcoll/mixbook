































'use strict';

var I18nManager=require('I18nManager');
















function forLeft(props){var
position=props.position,scene=props.scene;var
index=scene.index;
return{
opacity:position.interpolate({
inputRange:[index-1,index,index+1],
outputRange:[0,1,0]})};


}

function forCenter(props){var
position=props.position,scene=props.scene;var
index=scene.index;
return{
opacity:position.interpolate({
inputRange:[index-1,index,index+1],
outputRange:[0,1,0]}),

transform:[
{
translateX:position.interpolate({
inputRange:[index-1,index+1],
outputRange:I18nManager.isRTL?
[-200,200]:
[200,-200]})}]};




}

function forRight(props){var
position=props.position,scene=props.scene;var
index=scene.index;
return{
opacity:position.interpolate({
inputRange:[index-1,index,index+1],
outputRange:[0,1,0]})};


}

module.exports={
forCenter:forCenter,
forLeft:forLeft,
forRight:forRight};