var pathGetter=require('./path-getter');
var utils=require('./utils');

var Map=typeof WeakMap!=='undefined'?
WeakMap:
function(){
var keys=[];
var values=[];
return{
set:function set(key,value){
keys.push(key);
values.push(value);
},
get:function get(key){
for(var i=0;i<keys.length;i++){
if(keys[i]===key){
return values[i];
}
}
}};

};



exports.decycle=function decycle(object,options,replacer){
'use strict';

var map=new Map();

var hasCircular=Object.prototype.hasOwnProperty.call(options,'circular');

return function derez(_value,path,key){



var i,
name,
nu;




var value=replacer?replacer(key||'',_value):_value;

if(options.date&&value instanceof Date){
return{$jsan:'d'+value.getTime()};
}
if(options.regex&&value instanceof RegExp){
return{$jsan:'r'+utils.getRegexFlags(value)+','+value.source};
}
if(options['function']&&typeof value==='function'){
return{$jsan:'f'+utils.stringifyFunction(value,options['function'])};
}
if(options['undefined']&&value===undefined){
return{$jsan:'u'};
}
if(options['error']&&value instanceof Error){
return{$jsan:'e'+value.message};
}
if(options['symbol']&&typeof value==='symbol'){

return{$jsan:'s'+value.toString().slice(7,-1)};
}

if(value&&typeof value.toJSON==='function'){
value=value.toJSON(key);
}

if(typeof value==='object'&&value!==null&&
!(value instanceof Boolean)&&
!(value instanceof Date)&&
!(value instanceof Number)&&
!(value instanceof RegExp)&&
!(value instanceof String)&&
!(typeof value==='symbol')&&
!(value instanceof Error)){




if(typeof value==='object'&&value!==null){
var foundPath=map.get(value);
if(foundPath){
if(hasCircular&&path.indexOf(foundPath)===0){
return typeof options.circular==='function'?
options.circular(value,path,foundPath):
options.circular;
}
return{$jsan:foundPath};
}
map.set(value,path);
}




if(Object.prototype.toString.apply(value)==='[object Array]'){
nu=[];
for(i=0;i<value.length;i+=1){
nu[i]=derez(value[i],path+'['+i+']',i);
}
}else{



nu={};
for(name in value){
if(Object.prototype.hasOwnProperty.call(value,name)){
var nextPath=/^\w+$/.test(name)?
'.'+name:
'['+JSON.stringify(name)+']';
nu[name]=name==='$jsan'?[derez(value[name],path+nextPath)]:derez(value[name],path+nextPath,name);
}
}
}
return nu;
}
return value;
}(object,'$');
};


exports.retrocycle=function retrocycle($){
'use strict';


(function rez(value){






var i,item,name,path;

if(value&&typeof value==='object'){
if(Object.prototype.toString.apply(value)==='[object Array]'){
for(i=0;i<value.length;i+=1){
item=value[i];
if(item&&typeof item==='object'){
if(item.$jsan){
value[i]=utils.restore(item.$jsan,$);
}else{
rez(item);
}
}
}
}else{
for(name in value){
if(name==='$jsan'){
value[name]=value[name][0];
}
if(typeof value[name]==='object'){
item=value[name];
if(item&&typeof item==='object'){
if(item.$jsan){
value[name]=utils.restore(item.$jsan,$);
}else{
rez(item);
}
}
}
}
}
}
})($);
return $;
};