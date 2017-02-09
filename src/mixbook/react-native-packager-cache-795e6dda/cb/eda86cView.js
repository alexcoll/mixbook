










'use strict';

var EdgeInsetsPropType=require('EdgeInsetsPropType');
var NativeMethodsMixin=require('NativeMethodsMixin');
var NativeModules=require('NativeModules');
var React=require('React');
var ReactNativeStyleAttributes=require('ReactNativeStyleAttributes');
var ReactNativeViewAttributes=require('ReactNativeViewAttributes');
var StyleSheetPropType=require('StyleSheetPropType');
var ViewStylePropTypes=require('ViewStylePropTypes');

var requireNativeComponent=require('requireNativeComponent');

var PropTypes=React.PropTypes;

var stylePropType=StyleSheetPropType(ViewStylePropTypes);

var AccessibilityTraits=[
'none',
'button',
'link',
'header',
'search',
'image',
'selected',
'plays',
'key',
'text',
'summary',
'disabled',
'frequentUpdates',
'startsMedia',
'adjustable',
'allowsDirectInteraction',
'pageTurn'];


var AccessibilityComponentType=[
'none',
'button',
'radiobutton_checked',
'radiobutton_unchecked'];


var forceTouchAvailable=NativeModules.IOSConstants&&
NativeModules.IOSConstants.forceTouchAvailable||false;

var statics={
AccessibilityTraits:AccessibilityTraits,
AccessibilityComponentType:AccessibilityComponentType,




forceTouchAvailable:forceTouchAvailable};
















































var View=React.createClass({displayName:'View',




mixins:[NativeMethodsMixin],





viewConfig:{
uiViewClassName:'RCTView',
validAttributes:ReactNativeViewAttributes.RCTView},


statics:babelHelpers.extends({},
statics),


propTypes:{




accessible:PropTypes.bool,






accessibilityLabel:PropTypes.node,














accessibilityComponentType:PropTypes.oneOf(AccessibilityComponentType),















accessibilityLiveRegion:PropTypes.oneOf([
'none',
'polite',
'assertive']),





















importantForAccessibility:PropTypes.oneOf([
'auto',
'yes',
'no',
'no-hide-descendants']),

































accessibilityTraits:PropTypes.oneOfType([
PropTypes.oneOf(AccessibilityTraits),
PropTypes.arrayOf(PropTypes.oneOf(AccessibilityTraits))]),






onAccessibilityTap:PropTypes.func,





onMagicTap:PropTypes.func,






testID:PropTypes.string,














onResponderGrant:PropTypes.func,







onResponderMove:PropTypes.func,








onResponderReject:PropTypes.func,







onResponderRelease:PropTypes.func,









onResponderTerminate:PropTypes.func,








onResponderTerminationRequest:PropTypes.func,







onStartShouldSetResponder:PropTypes.func,








onStartShouldSetResponderCapture:PropTypes.func,








onMoveShouldSetResponder:PropTypes.func,








onMoveShouldSetResponderCapture:PropTypes.func,













hitSlop:EdgeInsetsPropType,










onLayout:PropTypes.func,


































pointerEvents:PropTypes.oneOf([
'box-none',
'none',
'box-only',
'auto']),

style:stylePropType,









removeClippedSubviews:PropTypes.bool,















renderToHardwareTextureAndroid:PropTypes.bool,















shouldRasterizeIOS:PropTypes.bool,









collapsable:PropTypes.bool,






















needsOffscreenAlphaCompositing:PropTypes.bool},


render:function render(){




return React.createElement(RCTView,this.props);
}});


var RCTView=requireNativeComponent('RCTView',View,{
nativeOnly:{
nativeBackgroundAndroid:true,
nativeForegroundAndroid:true}});



if(__DEV__){
var UIManager=require('UIManager');
var viewConfig=UIManager.viewConfigs&&UIManager.viewConfigs.RCTView||{};
for(var prop in viewConfig.nativeProps){
var viewAny=View;
if(!viewAny.propTypes[prop]&&!ReactNativeStyleAttributes[prop]){
throw new Error(
'View is missing propType for native prop `'+prop+'`');

}
}
}

var ViewToExport=RCTView;
if(__DEV__){
ViewToExport=View;
}else{
babelHelpers.extends(RCTView,statics);
}

module.exports=ViewToExport;