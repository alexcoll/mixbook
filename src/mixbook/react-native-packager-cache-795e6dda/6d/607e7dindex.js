Object.defineProperty(exports,"__esModule",{value:true});
var _react=require('react');var _react2=babelHelpers.interopRequireDefault(_react);
var _reactNative=require('react-native');
var _reactRedux=require('react-redux');
var _nativeBase=require('native-base');

var _sideBarNav=require('../../actions/sideBarNav');var _sideBarNav2=babelHelpers.interopRequireDefault(_sideBarNav);
var _sidebarTheme=require('./sidebar-theme');var _sidebarTheme2=babelHelpers.interopRequireDefault(_sidebarTheme);
var _style=require('./style');var _style2=babelHelpers.interopRequireDefault(_style);

var _MaterialIcons=require('react-native-vector-icons/MaterialIcons');var _MaterialIcons2=babelHelpers.interopRequireDefault(_MaterialIcons);

var drawerCover=require('../../../img/drawer-cover.png');
var drawerImage=require('../../../img/logo-kitchen-sink.png');var

SideBar=function(_Component){babelHelpers.inherits(SideBar,_Component);





function SideBar(props){babelHelpers.classCallCheck(this,SideBar);var _this=babelHelpers.possibleConstructorReturn(this,(SideBar.__proto__||Object.getPrototypeOf(SideBar)).call(this,
props));
_this.state={
shadowOffsetWidth:1,
shadowRadius:4};return _this;

}babelHelpers.createClass(SideBar,[{key:'navigateTo',value:function navigateTo(

route){
this.props.navigateTo(route,'home');
}},{key:'render',value:function render()

{var _this2=this;
return(
_react2.default.createElement(_nativeBase.Content,{
theme:_sidebarTheme2.default,
style:_style2.default.sidebar},

_react2.default.createElement(_reactNative.Image,{source:drawerCover,style:_style2.default.drawerCover},
_react2.default.createElement(_reactNative.Image,{
square:true,
style:_style2.default.drawerImage,
source:drawerImage})),


_react2.default.createElement(_nativeBase.List,null,
_react2.default.createElement(_nativeBase.ListItem,{button:true,iconLeft:true,onPress:function onPress(){return _this2.navigateTo('mydrinks');}},
_react2.default.createElement(_nativeBase.View,{style:_style2.default.listItemContainer},
_react2.default.createElement(_nativeBase.View,{style:[_style2.default.iconContainer,{}]},
_react2.default.createElement(_MaterialIcons2.default,{name:'local-bar',size:25,color:'#4F8EF7'})),

_react2.default.createElement(_nativeBase.Text,{style:_style2.default.text},'My Drinks'))),


_react2.default.createElement(_nativeBase.ListItem,{button:true,iconLeft:true,onPress:function onPress(){return _this2.navigateTo('ingredients');}},
_react2.default.createElement(_nativeBase.View,{style:_style2.default.listItemContainer},
_react2.default.createElement(_nativeBase.View,{style:[_style2.default.iconContainer,{}]},
_react2.default.createElement(_MaterialIcons2.default,{name:'local-grocery-store',size:25,color:'#4F8EF7'})),

_react2.default.createElement(_nativeBase.Text,{style:_style2.default.text},'Ingredients'))),


_react2.default.createElement(_nativeBase.ListItem,{button:true,iconLeft:true,onPress:function onPress(){return _this2.navigateTo('recipes');}},
_react2.default.createElement(_nativeBase.View,{style:_style2.default.listItemContainer},
_react2.default.createElement(_nativeBase.View,{style:[_style2.default.iconContainer,{}]},
_react2.default.createElement(_MaterialIcons2.default,{name:'public',size:25,color:'#4F8EF7'})),

_react2.default.createElement(_nativeBase.Text,{style:_style2.default.text},'Recipes'))),


_react2.default.createElement(_nativeBase.ListItem,{button:true,iconLeft:true,onPress:function onPress(){return _this2.navigateTo('settings');}},
_react2.default.createElement(_nativeBase.View,{style:_style2.default.listItemContainer},
_react2.default.createElement(_nativeBase.View,{style:[_style2.default.iconContainer,{}]},
_react2.default.createElement(_MaterialIcons2.default,{name:'settings',size:25,color:'#4F8EF7'})),

_react2.default.createElement(_nativeBase.Text,{style:_style2.default.text},'Settings'))),


_react2.default.createElement(_nativeBase.ListItem,{button:true,iconLeft:true,onPress:function onPress(){return _this2.navigateTo('account');}},
_react2.default.createElement(_nativeBase.View,{style:_style2.default.listItemContainer},
_react2.default.createElement(_nativeBase.View,{style:[_style2.default.iconContainer,{}]},
_react2.default.createElement(_MaterialIcons2.default,{name:'account-circle',size:25,color:'#4F8EF7'})),

_react2.default.createElement(_nativeBase.Text,{style:_style2.default.text},'Account'))),


_react2.default.createElement(_nativeBase.ListItem,{button:true,iconLeft:true,onPress:function onPress(){return _this2.navigateTo('login');}},
_react2.default.createElement(_nativeBase.View,{style:_style2.default.listItemContainer},
_react2.default.createElement(_nativeBase.View,{style:[_style2.default.iconContainer,{}]},
_react2.default.createElement(_MaterialIcons2.default,{name:'settings',size:25,color:'#4F8EF7'})),

_react2.default.createElement(_nativeBase.Text,{style:_style2.default.text},'Login'))))));





}}]);return SideBar;}(_react.Component);SideBar.propTypes={navigateTo:_react2.default.PropTypes.func};


function bindAction(dispatch){
return{
navigateTo:function navigateTo(route,homeRoute){return dispatch((0,_sideBarNav2.default)(route,homeRoute));}};

}

var mapStateToProps=function mapStateToProps(state){return{
navigation:state.cardNavigation};};exports.default=


(0,_reactRedux.connect)(mapStateToProps,bindAction)(SideBar);