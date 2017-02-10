











'use strict';

var AppContainer=require('AppContainer');
var React=require('React');
var ReactNative=require('ReactNative');

var invariant=require('fbjs/lib/invariant');


require('BackAndroid');

function renderApplication(
RootComponent,
initialProps,
rootTag)
{
invariant(
rootTag,
'Expect to have a valid rootTag, instead got ',rootTag);

ReactNative.render(
React.createElement(AppContainer,{rootTag:rootTag},
React.createElement(RootComponent,babelHelpers.extends({},
initialProps,{
rootTag:rootTag}))),


rootTag);

}

module.exports=renderApplication;