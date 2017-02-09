'use strict';Object.defineProperty(exports,"__esModule",{value:true});

var _react=require('react');var _react2=babelHelpers.interopRequireDefault(_react);
var _NativeBaseComponent2=require('../../Base/NativeBaseComponent');var _NativeBaseComponent3=babelHelpers.interopRequireDefault(_NativeBaseComponent2);
var _Text=require('../../Widgets/Text');var _Text2=babelHelpers.interopRequireDefault(_Text);

var _reactNative=require('react-native');







var deviceWidth=_reactNative.Dimensions.get('window').width;var

DefaultTabBar=function(_NativeBaseComponent){babelHelpers.inherits(DefaultTabBar,_NativeBaseComponent);function DefaultTabBar(){babelHelpers.classCallCheck(this,DefaultTabBar);return babelHelpers.possibleConstructorReturn(this,(DefaultTabBar.__proto__||Object.getPrototypeOf(DefaultTabBar)).apply(this,arguments));}babelHelpers.createClass(DefaultTabBar,[{key:'getInitialStyle',value:function getInitialStyle()
{
return{
tab:{
flex:1,
alignItems:'center',
justifyContent:'center',
backgroundColor:this.getTheme().tabBgColor},

tabs:{
height:45,
flexDirection:'row',
justifyContent:'space-around',
borderWidth:1,
borderTopWidth:0,
borderLeftWidth:0,
borderRightWidth:0,
borderBottomColor:'#ccc'}};


}},{key:'renderTabOption',value:function renderTabOption(






name,page){var _this2=this;
var isTabActive=this.props.activeTab===page;

return(
_react2.default.createElement(_reactNative.TouchableHighlight,{underlayColor:this.getTheme().darkenHeader,style:[this.getInitialStyle().tab],key:name,onPress:function onPress(){return _this2.props.goToPage(page);}},
_react2.default.createElement(_reactNative.View,null,
_react2.default.createElement(_Text2.default,{style:{color:isTabActive?this.getTheme().tabTextColor:this.getTheme().tabTextColor,fontWeight:isTabActive?'bold':'normal',fontSize:this.getTheme().tabFontSize}},name))));



}},{key:'render',value:function render()

{var _this3=this;
var numberOfTabs=this.props.tabs.length;
var tabUnderlineStyle={
position:'absolute',
width:deviceWidth/numberOfTabs,
height:4,
backgroundColor:this.getTheme().tabTextColor,
bottom:0};


var left=this.props.scrollValue.interpolate({
inputRange:[0,1],outputRange:[0,deviceWidth/numberOfTabs]});


return(
_react2.default.createElement(_reactNative.View,{style:this.getInitialStyle().tabs},
this.props.tabs.map(function(tab,i){return _this3.renderTabOption(tab,i);}),
_react2.default.createElement(_reactNative.Animated.View,{style:[tabUnderlineStyle,{left:left}]})));


}}]);return DefaultTabBar;}(_NativeBaseComponent3.default);DefaultTabBar.propTypes={goToPage:_react2.default.PropTypes.func,activeTab:_react2.default.PropTypes.number,tabs:_react2.default.PropTypes.array};exports.default=DefaultTabBar;