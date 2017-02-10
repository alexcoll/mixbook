
'use strict';Object.defineProperty(exports,"__esModule",{value:true});

var _react=require('react');var _react2=babelHelpers.interopRequireDefault(_react);
var _NativeBaseComponent2=require('../Base/NativeBaseComponent');var _NativeBaseComponent3=babelHelpers.interopRequireDefault(_NativeBaseComponent2);
var _computeProps=require('../../Utils/computeProps');var _computeProps2=babelHelpers.interopRequireDefault(_computeProps);

var _Ionicons=require('react-native-vector-icons/Ionicons');var _Ionicons2=babelHelpers.interopRequireDefault(_Ionicons);
var _Entypo=require('react-native-vector-icons/Entypo');var _Entypo2=babelHelpers.interopRequireDefault(_Entypo);
var _FontAwesome=require('react-native-vector-icons/FontAwesome');var _FontAwesome2=babelHelpers.interopRequireDefault(_FontAwesome);
var _Foundation=require('react-native-vector-icons/Foundation');var _Foundation2=babelHelpers.interopRequireDefault(_Foundation);
var _MaterialIcons=require('react-native-vector-icons/MaterialIcons');var _MaterialIcons2=babelHelpers.interopRequireDefault(_MaterialIcons);
var _Octicons=require('react-native-vector-icons/Octicons');var _Octicons2=babelHelpers.interopRequireDefault(_Octicons);
var _Zocial=require('react-native-vector-icons/Zocial');var _Zocial2=babelHelpers.interopRequireDefault(_Zocial);var

IconNB=function(_NativeBaseComponent){babelHelpers.inherits(IconNB,_NativeBaseComponent);function IconNB(){babelHelpers.classCallCheck(this,IconNB);return babelHelpers.possibleConstructorReturn(this,(IconNB.__proto__||Object.getPrototypeOf(IconNB)).apply(this,arguments));}babelHelpers.createClass(IconNB,[{key:'componentWillMount',value:function componentWillMount()









{
switch(this.getTheme().iconFamily){
case'Ionicons':
this.Icon=_Ionicons2.default;
break;
case'Entypo':
this.Icon=_Entypo2.default;
break;
case'FontAwesome':
this.Icon=_FontAwesome2.default;
break;
case'Foundation':
this.Icon=_Foundation2.default;
break;
case'MaterialIcons':
this.Icon=_MaterialIcons2.default;
break;
case'Octicons':
this.Icon=_Octicons2.default;
break;
case'Zocial':
this.Icon=_Zocial2.default;
break;
default:
this.Icon=_Ionicons2.default;}

}},{key:'getInitialStyle',value:function getInitialStyle()



{
return{
icon:{
fontSize:this.getTheme().iconFontSize,
color:this.getContextForegroundColor()}};


}},{key:'prepareRootProps',value:function prepareRootProps()
{
var defaultProps={
style:this.getInitialStyle().icon};


return(0,_computeProps2.default)(this.props,defaultProps);

}},{key:'render',value:function render()

{var _this2=this;
return(
_react2.default.createElement(this.Icon,babelHelpers.extends({ref:function ref(c){return _this2._root=c;}},this.prepareRootProps())));

}}]);return IconNB;}(_NativeBaseComponent3.default);IconNB.getImageSource=_FontAwesome2.default.getImageSource;exports.default=IconNB;