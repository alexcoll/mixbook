Object.defineProperty(exports,"__esModule",{value:true});
var _react=require('react');var _react2=babelHelpers.interopRequireDefault(_react);

var _nativeBase=require('native-base');

var _styles=require('./styles');var _styles2=babelHelpers.interopRequireDefault(_styles);var

TabOne=function(_Component){babelHelpers.inherits(TabOne,_Component);function TabOne(){babelHelpers.classCallCheck(this,TabOne);return babelHelpers.possibleConstructorReturn(this,(TabOne.__proto__||Object.getPrototypeOf(TabOne)).apply(this,arguments));}babelHelpers.createClass(TabOne,[{key:'render',value:function render()

{
return(
_react2.default.createElement(_nativeBase.Container,{style:_styles2.default.container},
_react2.default.createElement(_nativeBase.Content,{padder:true},
_react2.default.createElement(_nativeBase.Card,null,
_react2.default.createElement(_nativeBase.CardItem,null,
_react2.default.createElement(_nativeBase.Text,null,'NativeBase is open source and free.')),



_react2.default.createElement(_nativeBase.CardItem,null,
_react2.default.createElement(_nativeBase.Text,null,'Platform specific codebase for components')),



_react2.default.createElement(_nativeBase.CardItem,null,
_react2.default.createElement(_nativeBase.Text,null,'Any native third-party libraries can be included along with NativeBase.')),



_react2.default.createElement(_nativeBase.CardItem,null,
_react2.default.createElement(_nativeBase.Text,null,'Single file to theme your app and NativeBase components.')),



_react2.default.createElement(_nativeBase.CardItem,null,
_react2.default.createElement(_nativeBase.Text,null,'Gives an ease to include different font types in your app.'))))));







}}]);return TabOne;}(_react.Component);exports.default=TabOne;