










'use strict';

var invariant=require('fbjs/lib/invariant');














var NavigationStateUtils={




get:function get(state,key){
return state.routes.find(function(route){return route.key===key;})||null;
},





indexOf:function indexOf(state,key){
return state.routes.map(function(route){return route.key;}).indexOf(key);
},





has:function has(state,key){
return!!state.routes.some(function(route){return route.key===key;});
},






push:function push(state,route){
invariant(
NavigationStateUtils.indexOf(state,route.key)===-1,
'should not push route with duplicated key %s',
route.key);


var routes=state.routes.slice();
routes.push(route);

return babelHelpers.extends({},
state,{
index:routes.length-1,
routes:routes});

},






pop:function pop(state){
if(state.index<=0){

return state;
}
var routes=state.routes.slice(0,-1);
return babelHelpers.extends({},
state,{
index:routes.length-1,
routes:routes});

},




jumpToIndex:function jumpToIndex(state,index){
if(index===state.index){
return state;
}

invariant(!!state.routes[index],'invalid index %s to jump to',index);

return babelHelpers.extends({},
state,{
index:index});

},




jumpTo:function jumpTo(state,key){
var index=NavigationStateUtils.indexOf(state,key);
return NavigationStateUtils.jumpToIndex(state,index);
},




back:function back(state){
var index=state.index-1;
var route=state.routes[index];
return route?NavigationStateUtils.jumpToIndex(state,index):state;
},




forward:function forward(state){
var index=state.index+1;
var route=state.routes[index];
return route?NavigationStateUtils.jumpToIndex(state,index):state;
},






replaceAt:function replaceAt(
state,
key,
route)
{
var index=NavigationStateUtils.indexOf(state,key);
return NavigationStateUtils.replaceAtIndex(state,index,route);
},






replaceAtIndex:function replaceAtIndex(
state,
index,
route)
{
invariant(
!!state.routes[index],
'invalid index %s for replacing route %s',
index,
route.key);


if(state.routes[index]===route){
return state;
}

var routes=state.routes.slice();
routes[index]=route;

return babelHelpers.extends({},
state,{
index:index,
routes:routes});

},






reset:function reset(
state,
routes,
index)
{
invariant(
routes.length&&Array.isArray(routes),
'invalid routes to replace');


var nextIndex=index===undefined?routes.length-1:index;

if(state.routes.length===routes.length&&state.index===nextIndex){
var compare=function compare(route,ii){return routes[ii]===route;};
if(state.routes.every(compare)){
return state;
}
}

invariant(!!routes[nextIndex],'invalid index %s to reset',nextIndex);

return babelHelpers.extends({},
state,{
index:nextIndex,
routes:routes});

}};


module.exports=NavigationStateUtils;