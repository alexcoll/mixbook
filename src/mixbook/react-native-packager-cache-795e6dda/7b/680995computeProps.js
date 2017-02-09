'use_strict';
var _lodash=require('lodash');var _lodash2=babelHelpers.interopRequireDefault(_lodash);
var _ReactNativePropRegistry=require('react-native/Libraries/Renderer/src/renderers/native/ReactNativePropRegistry');var _ReactNativePropRegistry2=babelHelpers.interopRequireDefault(_ReactNativePropRegistry);


module.exports=function(incomingProps,defaultProps){

var computedProps={};

incomingProps=_lodash2.default.clone(incomingProps);
delete incomingProps.children;

var incomingPropsStyle=incomingProps.style;
delete incomingProps.style;


if(incomingProps){
_lodash2.default.assign(computedProps,defaultProps,incomingProps);
}else
computedProps=defaultProps;

if(incomingPropsStyle){

var computedPropsStyle={};
computedProps.style={};
if(Array.isArray(incomingPropsStyle)){
_lodash2.default.forEach(incomingPropsStyle,function(style){
if(typeof style=='number'){
_lodash2.default.merge(computedPropsStyle,_ReactNativePropRegistry2.default.getByID(style));
}else{
_lodash2.default.merge(computedPropsStyle,style);
}
});

}else
{
if(typeof incomingPropsStyle=='number'){
computedPropsStyle=_ReactNativePropRegistry2.default.getByID(incomingPropsStyle);
}else{
computedPropsStyle=incomingPropsStyle;
}
}

_lodash2.default.merge(computedProps.style,defaultProps.style,computedPropsStyle);


}

return computedProps;
};