Object.defineProperty(exports,"__esModule",{value:true});
var _react=require('react');var _react2=babelHelpers.interopRequireDefault(_react);

var _nativeBase=require('native-base');

var _styles=require('./styles');var _styles2=babelHelpers.interopRequireDefault(_styles);

var placeholder=require('../../../img/placeholder.png');var

TabMake=function(_Component){babelHelpers.inherits(TabMake,_Component);function TabMake(){babelHelpers.classCallCheck(this,TabMake);return babelHelpers.possibleConstructorReturn(this,(TabMake.__proto__||Object.getPrototypeOf(TabMake)).apply(this,arguments));}babelHelpers.createClass(TabMake,[{key:'render',value:function render()

{
return(
_react2.default.createElement(_nativeBase.Container,{style:_styles2.default.container},
_react2.default.createElement(_nativeBase.Content,{padder:true},
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





}}]);return TabMake;}(_react.Component);exports.default=TabMake;