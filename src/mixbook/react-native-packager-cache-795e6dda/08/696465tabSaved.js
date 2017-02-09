Object.defineProperty(exports,"__esModule",{value:true});
var _react=require('react');var _react2=babelHelpers.interopRequireDefault(_react);

var _nativeBase=require('native-base');

var _styles=require('./styles');var _styles2=babelHelpers.interopRequireDefault(_styles);

var placeholder=require('../../../img/placeholder.png');var

TabSaved=function(_Component){babelHelpers.inherits(TabSaved,_Component);function TabSaved(){babelHelpers.classCallCheck(this,TabSaved);return babelHelpers.possibleConstructorReturn(this,(TabSaved.__proto__||Object.getPrototypeOf(TabSaved)).apply(this,arguments));}babelHelpers.createClass(TabSaved,[{key:'render',value:function render()

{
return(
_react2.default.createElement(_nativeBase.Container,{style:_styles2.default.container},
_react2.default.createElement(_nativeBase.Content,null,
_react2.default.createElement(_nativeBase.List,null,
_react2.default.createElement(_nativeBase.ListItem,null,
_react2.default.createElement(_nativeBase.Thumbnail,{source:placeholder}),
_react2.default.createElement(_nativeBase.Text,null,'Drink 1'),
_react2.default.createElement(_nativeBase.Text,{note:true},'Description')),

_react2.default.createElement(_nativeBase.ListItem,null,
_react2.default.createElement(_nativeBase.Thumbnail,{source:placeholder}),
_react2.default.createElement(_nativeBase.Text,null,'Drink 2'),
_react2.default.createElement(_nativeBase.Text,{note:true},'Description')),

_react2.default.createElement(_nativeBase.ListItem,null,
_react2.default.createElement(_nativeBase.Thumbnail,{source:placeholder}),
_react2.default.createElement(_nativeBase.Text,null,'Drink 3'),
_react2.default.createElement(_nativeBase.Text,{note:true},'Description'))))));





}}]);return TabSaved;}(_react.Component);exports.default=TabSaved;