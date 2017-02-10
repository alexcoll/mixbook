










'use strict';

var NativeModules=require('NativeModules');
var Platform=require('Platform');

function setupDevtools(){
var messageListeners=[];
var closeListeners=[];
var hostname='localhost';
if(Platform.OS==='android'&&NativeModules.AndroidConstants){
hostname=NativeModules.AndroidConstants.ServerHost.split(':')[0];
}
var port=window.__REACT_DEVTOOLS_PORT__||8097;
var ws=new window.WebSocket('ws://'+hostname+':'+port+'/devtools');

var FOR_BACKEND={
resolveRNStyle:require('flattenStyle'),
wall:{
listen:function listen(fn){
messageListeners.push(fn);
},
onClose:function onClose(fn){
closeListeners.push(fn);
},
send:function send(data){
ws.send(JSON.stringify(data));
}}};


ws.onclose=handleClose;
ws.onerror=handleClose;
ws.onopen=function(){
tryToConnect();
};

var hasClosed=false;
function handleClose(){
if(!hasClosed){
hasClosed=true;
setTimeout(setupDevtools,2000);
closeListeners.forEach(function(fn){return fn();});
}
}

function tryToConnect(){
ws.send('attach:agent');
var _interval=setInterval(function(){return ws.send('attach:agent');},500);
ws.onmessage=function(evt){
if(evt.data.indexOf('eval:')===0){
clearInterval(_interval);
initialize(evt.data.slice('eval:'.length));
}
};
}

function initialize(text){
try{

eval(text);
}catch(e){
console.error('Failed to eval: '+e.message);
return;
}

var ReactNativeComponentTree=require('ReactNativeComponentTree');
window.__REACT_DEVTOOLS_GLOBAL_HOOK__.inject({
ComponentTree:{
getClosestInstanceFromNode:function getClosestInstanceFromNode(node){
return ReactNativeComponentTree.getClosestInstanceFromNode(node);
},
getNodeFromInstance:function getNodeFromInstance(inst){

while(inst._renderedComponent){
inst=inst._renderedComponent;
}
if(inst){
return ReactNativeComponentTree.getNodeFromInstance(inst);
}else{
return null;
}
}},

Mount:require('ReactNativeMount'),
Reconciler:require('ReactReconciler')});

ws.onmessage=handleMessage;
}

function handleMessage(evt){


var data;
try{
data=JSON.parse(evt.data);
}catch(e){
return console.error('failed to parse json: '+evt.data);
}

if(data.$close||data.$error){
closeListeners.forEach(function(fn){return fn();});
window.__REACT_DEVTOOLS_GLOBAL_HOOK__.emit('shutdown');
tryToConnect();
return;
}
if(data.$open){
return;
}
messageListeners.forEach(function(fn){
try{
fn(data);
}catch(e){



console.log(data);
throw e;
}
});
}
}

module.exports=setupDevtools;