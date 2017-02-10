Object.defineProperty(exports,"__esModule",{value:true});
var _react=require('react');var _react2=babelHelpers.interopRequireDefault(_react);

var _nativeBase=require('native-base');

var _styles=require('./styles');var _styles2=babelHelpers.interopRequireDefault(_styles);var

TabAlcohol=function(_Component){babelHelpers.inherits(TabAlcohol,_Component);function TabAlcohol(){babelHelpers.classCallCheck(this,TabAlcohol);return babelHelpers.possibleConstructorReturn(this,(TabAlcohol.__proto__||Object.getPrototypeOf(TabAlcohol)).apply(this,arguments));}babelHelpers.createClass(TabAlcohol,[{key:'render',value:function render()

{
return(
_react2.default.createElement(_nativeBase.Container,{style:_styles2.default.container},
_react2.default.createElement(_nativeBase.Content,{padder:true},
_react2.default.createElement(_nativeBase.Card,null,
_react2.default.createElement(_nativeBase.CardItem,null,
_react2.default.createElement(_nativeBase.Text,null,'Put your alcohols here.'))))));







}}]);return TabAlcohol;}(_react.Component);exports.default=TabAlcohol;