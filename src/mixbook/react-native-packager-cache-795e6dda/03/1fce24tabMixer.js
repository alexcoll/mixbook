Object.defineProperty(exports,"__esModule",{value:true});
var _react=require('react');var _react2=babelHelpers.interopRequireDefault(_react);

var _nativeBase=require('native-base');

var _styles=require('./styles');var _styles2=babelHelpers.interopRequireDefault(_styles);var

TabMixer=function(_Component){babelHelpers.inherits(TabMixer,_Component);function TabMixer(){babelHelpers.classCallCheck(this,TabMixer);return babelHelpers.possibleConstructorReturn(this,(TabMixer.__proto__||Object.getPrototypeOf(TabMixer)).apply(this,arguments));}babelHelpers.createClass(TabMixer,[{key:'render',value:function render()

{
return(
_react2.default.createElement(_nativeBase.Container,{style:_styles2.default.container},
_react2.default.createElement(_nativeBase.Content,{padder:true},
_react2.default.createElement(_nativeBase.Card,{style:{flex:0}},
_react2.default.createElement(_nativeBase.CardItem,null,
_react2.default.createElement(_nativeBase.Text,null,'Put your mixers here.'))))));







}}]);return TabMixer;}(_react.Component);exports.default=TabMixer;