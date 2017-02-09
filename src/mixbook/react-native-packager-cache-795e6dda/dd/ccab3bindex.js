(function webpackUniversalModuleDefinition(root,factory){
if(typeof exports==='object'&&typeof module==='object')
module.exports=factory(function webpackLoadOptionalExternalModule(){try{return require("react-native");}catch(e){}}());else
if(typeof define==='function'&&define.amd)
define(["react-native"],factory);else
{
var a=typeof exports==='object'?factory(function webpackLoadOptionalExternalModule(){try{return require("react-native");}catch(e){}}()):factory(root["react-native"]);
for(var i in a){(typeof exports==='object'?exports:root)[i]=a[i];}
}
})(this,function(__WEBPACK_EXTERNAL_MODULE_5__){
return function(modules){

var installedModules={};


function __webpack_require__(moduleId){


if(installedModules[moduleId])
return installedModules[moduleId].exports;


var module=installedModules[moduleId]={
exports:{},
id:moduleId,
loaded:false};



modules[moduleId].call(module.exports,module,module.exports,__webpack_require__);


module.loaded=true;


return module.exports;
}



__webpack_require__.m=modules;


__webpack_require__.c=installedModules;


__webpack_require__.p="";


return __webpack_require__(0);
}(

[

function(module,exports,__webpack_require__){

'use strict';

Object.defineProperty(exports,"__esModule",{
value:true});

exports.tabReducer=exports.cardStackReducer=exports.actions=exports.constants=undefined;

var _constants=__webpack_require__(1);

var _actions=__webpack_require__(2);

var _cardStack=__webpack_require__(3);

var _tabReducer=__webpack_require__(6);

var constants=exports.constants={
PUSH_ROUTE:_constants.PUSH_ROUTE,
POP_ROUTE:_constants.POP_ROUTE,
RESET_ROUTE:_constants.RESET_ROUTE,
REPLACE_AT:_constants.REPLACE_AT,
REPLACE_AT_INDEX:_constants.REPLACE_AT_INDEX,
JUMP_TO:_constants.JUMP_TO,
JUMP_TO_INDEX:_constants.JUMP_TO_INDEX,
BACK:_constants.BACK,
FORWARD:_constants.FORWARD,
GET:_constants.GET,
HAS:_constants.HAS,
INDEX_OF:_constants.INDEX_OF};


var actions=exports.actions={
pushRoute:_actions.pushRoute,
popRoute:_actions.popRoute,
jumpTo:_actions.jumpTo,
reset:_actions.reset,
replaceAt:_actions.replaceAt,
replaceAtIndex:_actions.replaceAtIndex,
jumpToIndex:_actions.jumpToIndex,
back:_actions.back,
forward:_actions.forward,
get:_actions.get,
has:_actions.has,
indexOf:_actions.indexOf};


var cardStackReducer=exports.cardStackReducer=_cardStack.cardStackReducer;
var tabReducer=exports.tabReducer=_tabReducer.tabReducer;

},

function(module,exports){

'use strict';

Object.defineProperty(exports,"__esModule",{
value:true});

var prefix='react-native-navigation-redux-helpers/';

var JUMP_TO=exports.JUMP_TO=prefix+'JUMP_TO';
var PUSH_ROUTE=exports.PUSH_ROUTE=prefix+'PUSH_ROUTE';
var POP_ROUTE=exports.POP_ROUTE=prefix+'POP_ROUTE';
var RESET_ROUTE=exports.RESET_ROUTE=prefix+'RESET_ROUTE';
var REPLACE_AT=exports.REPLACE_AT=prefix+'REPLACE_AT';
var REPLACE_AT_INDEX=exports.REPLACE_AT_INDEX=prefix+'REPLACE_AT_INDEX';
var JUMP_TO_INDEX=exports.JUMP_TO_INDEX=prefix+'JUMP_TO_INDEX';
var BACK=exports.BACK=prefix+'BACK';
var FORWARD=exports.FORWARD=prefix+'FORWARD';

},

function(module,exports,__webpack_require__){

'use strict';

Object.defineProperty(exports,"__esModule",{
value:true});

exports.pushRoute=pushRoute;
exports.popRoute=popRoute;
exports.jumpTo=jumpTo;
exports.reset=reset;
exports.replaceAt=replaceAt;
exports.replaceAtIndex=replaceAtIndex;
exports.jumpToIndex=jumpToIndex;
exports.back=back;
exports.forward=forward;

var _constants=__webpack_require__(1);

function pushRoute(route,key){
if(!key){
throw new Error('pushRoute requires key argument');
}

return{
type:_constants.PUSH_ROUTE,
payload:{
route:route,
key:key}};


}

function popRoute(key){
if(!key){
throw new Error('popRoute requires key argument');
}

return{
type:_constants.POP_ROUTE,
payload:{
key:key}};


}

function jumpTo(keyOrIndex,key){





if(!key){
throw new Error('jumpTo requires key argument');
}

if(typeof keyOrIndex==='string'){
return{
type:_constants.JUMP_TO,
payload:{
routeKey:keyOrIndex,
key:key}};


}

return jumpToIndex(keyOrIndex,key);
}

function reset(routes,key,index){
if(!key){
throw new Error('reset requires key argument');
}
return{
type:_constants.RESET_ROUTE,
payload:{
routes:routes,
index:index,
key:key}};


}

function replaceAt(routeKey,route,key){
if(!key){
throw new Error('Replace At requires key argument');
}

return{
type:_constants.REPLACE_AT,
payload:{
routeKey:routeKey,
route:route,
key:key}};


}

function replaceAtIndex(index,route,key){
if(!key){
throw new Error('Replace At Index requires key argument');
}

return{
type:_constants.REPLACE_AT_INDEX,
payload:{
index:index,
route:route,
key:key}};


}

function jumpToIndex(routeIndex,key){
if(!key){
throw new Error('Jump to Index requires key argument');
}

return{
type:_constants.JUMP_TO_INDEX,
payload:{
routeIndex:routeIndex,
key:key}};


}

function back(key){
if(!key){
throw new Error('popRoute requires key argument');
}

return{
type:_constants.BACK,
payload:{
key:key}};


}

function forward(key){
if(!key){
throw new Error('popRoute requires key argument');
}

return{
type:_constants.FORWARD,
payload:{
key:key}};


}

},

function(module,exports,__webpack_require__){

'use strict';

Object.defineProperty(exports,"__esModule",{
value:true});

exports.cardStackReducer=cardStackReducer;

var _constants=__webpack_require__(1);

var _helpers=__webpack_require__(4);

var StateUtils=(0,_helpers.getStateUtils)();

function cardStackReducer(initialState){
(0,_helpers.checkInitialState)(initialState);


return function cardStackReducerFn(){
var state=arguments.length<=0||arguments[0]===undefined?initialState:arguments[0];
var action=arguments[1];

if(!(0,_helpers.isActionPotentiallyApplicable)(action,state.key)){
return state;
}

switch(action.type){
case _constants.PUSH_ROUTE:
return StateUtils.push(state,action.payload.route);
case _constants.POP_ROUTE:
return StateUtils.pop(state);
case _constants.RESET_ROUTE:
return StateUtils.reset(state,action.payload.routes,action.payload.index);
case _constants.REPLACE_AT:
return StateUtils.replaceAt(state,action.payload.routeKey,action.payload.route);
case _constants.REPLACE_AT_INDEX:
return StateUtils.replaceAtIndex(state,action.payload.index,action.payload.route);
case _constants.JUMP_TO:
return StateUtils.jumpTo(state,action.payload.routeKey);
case _constants.JUMP_TO_INDEX:
return StateUtils.jumpToIndex(state,action.payload.routeIndex);
case _constants.BACK:
return StateUtils.back(state);
case _constants.FORWARD:
return StateUtils.forward(state);
default:
return state;}

};
}

},

function(module,exports,__webpack_require__){

'use strict';

Object.defineProperty(exports,"__esModule",{
value:true});

exports.checkInitialState=checkInitialState;
exports.isActionPotentiallyApplicable=isActionPotentiallyApplicable;
exports.getStateUtils=getStateUtils;
function checkInitialState(initialState){
if(!initialState){
throw Error('initialState arg is required');
}

if(typeof initialState.key!=='string'){
throw Error('initialState must have an attribute **key** which is a string');
}

if(typeof initialState.index!=='number'){
throw Error('initialState must have an attribute **index** which is a number');
}

if(!(initialState.routes instanceof Array)){
throw Error('initialState must have an attribute **route** which is an array');
}
}

function isActionPotentiallyApplicable(action,navigationKey){
return action&&action.payload&&action.payload.key===navigationKey;
}

function getStateUtils(){
try{
var _require=__webpack_require__(5);

var NavigationExperimental=_require.NavigationExperimental;

return NavigationExperimental.StateUtils;
}catch(e){

}

return{};
}

},

function(module,exports){

if(typeof __WEBPACK_EXTERNAL_MODULE_5__==='undefined'){var e=new Error("Cannot find module \"react-native\"");e.code='MODULE_NOT_FOUND';throw e;}
module.exports=__WEBPACK_EXTERNAL_MODULE_5__;

},

function(module,exports,__webpack_require__){

'use strict';

Object.defineProperty(exports,"__esModule",{
value:true});

exports.tabReducer=tabReducer;

var _helpers=__webpack_require__(4);

var _constants=__webpack_require__(1);

var StateUtils=(0,_helpers.getStateUtils)();

function tabReducer(initialState){
(0,_helpers.checkInitialState)(initialState);

return function tabReducerFn(){
var state=arguments.length<=0||arguments[0]===undefined?initialState:arguments[0];
var action=arguments[1];

if(!(0,_helpers.isActionPotentiallyApplicable)(action,state.key)){
return state;
}

switch(action.type){
case _constants.JUMP_TO:
return StateUtils.jumpTo(state,action.payload.routeKey);
case _constants.JUMP_TO_INDEX:
return StateUtils.jumpToIndex(state,action.payload.routeIndex);
default:
return state;}

};
}

}]);

});
;