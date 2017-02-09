











'use strict';


















function deepFreezeAndThrowOnMutationInDev(object){
if(__DEV__){
if(typeof object!=='object'||
object===null||
Object.isFrozen(object)||
Object.isSealed(object)){
return;
}

for(var key in object){
if(object.hasOwnProperty(key)){
object.__defineGetter__(key,identity.bind(null,object[key]));
object.__defineSetter__(key,throwOnImmutableMutation.bind(null,key));
}
}

Object.freeze(object);
Object.seal(object);

for(var key in object){
if(object.hasOwnProperty(key)){
deepFreezeAndThrowOnMutationInDev(object[key]);
}
}
}
}

function throwOnImmutableMutation(key,value){
throw Error(
'You attempted to set the key `'+key+'` with the value `'+
JSON.stringify(value)+'` on an object that is meant to be immutable '+
'and has been frozen.');

}

function identity(value){
return value;
}

module.exports=deepFreezeAndThrowOnMutationInDev;