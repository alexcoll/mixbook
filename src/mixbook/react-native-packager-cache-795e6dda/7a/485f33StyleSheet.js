










'use strict';

var PixelRatio=require('PixelRatio');
var ReactNativePropRegistry=require('ReactNativePropRegistry');
var StyleSheetValidation=require('StyleSheetValidation');

var flatten=require('flattenStyle');




var hairlineWidth=PixelRatio.roundToNearestPixel(0.4);
if(hairlineWidth===0){
hairlineWidth=1/PixelRatio.get();
}

var absoluteFillObject={
position:'absolute',
left:0,
right:0,
top:0,
bottom:0};

var absoluteFill=ReactNativePropRegistry.register(absoluteFillObject);













































module.exports={



















hairlineWidth:hairlineWidth,






absoluteFill:absoluteFill,













absoluteFillObject:absoluteFillObject,








































flatten:flatten,




create:function create(obj){
var result={};
for(var key in obj){
StyleSheetValidation.validateStyle(key,obj);
result[key]=ReactNativePropRegistry.register(obj[key]);
}
return result;
}};