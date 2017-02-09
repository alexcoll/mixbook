Object.defineProperty(exports,"__esModule",{value:true});
var _react=require('react');var _react2=babelHelpers.interopRequireDefault(_react);

var _nativeBase=require('native-base');

var _styles=require('./styles');var _styles2=babelHelpers.interopRequireDefault(_styles);var

TabTwo=function(_Component){babelHelpers.inherits(TabTwo,_Component);function TabTwo(){babelHelpers.classCallCheck(this,TabTwo);return babelHelpers.possibleConstructorReturn(this,(TabTwo.__proto__||Object.getPrototypeOf(TabTwo)).apply(this,arguments));}babelHelpers.createClass(TabTwo,[{key:'render',value:function render()

{
return(
_react2.default.createElement(_nativeBase.Container,{style:_styles2.default.container},
_react2.default.createElement(_nativeBase.Content,{padder:true},
_react2.default.createElement(_nativeBase.Card,{style:{flex:0}},
_react2.default.createElement(_nativeBase.CardItem,null,
_react2.default.createElement(_nativeBase.Text,null,'NativeBase is a free and open source framework that enables developers to build high-quality mobile apps using React Native iOS and Android apps with a fusion of ES6.'))),






_react2.default.createElement(_nativeBase.Card,{style:{flex:0}},
_react2.default.createElement(_nativeBase.CardItem,null,
_react2.default.createElement(_nativeBase.Text,null,'NativeBase builds a layer on top of React Native that provides you with basic set of components for mobile application development. This helps you to build world-class application experiences on native platforms.'))),







_react2.default.createElement(_nativeBase.Card,{style:{flex:0}},
_react2.default.createElement(_nativeBase.CardItem,null,
_react2.default.createElement(_nativeBase.Text,null,'NativeBase gives you the potential of building applications that run on iOS and Android using a single codebase.'))))));








}}]);return TabTwo;}(_react.Component);exports.default=TabTwo;