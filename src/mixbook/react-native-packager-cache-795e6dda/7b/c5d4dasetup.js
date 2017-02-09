Object.defineProperty(exports,"__esModule",{value:true});
var _react=require('react');var _react2=babelHelpers.interopRequireDefault(_react);
var _reactRedux=require('react-redux');
var _App=require('./App');var _App2=babelHelpers.interopRequireDefault(_App);
var _configureStore=require('./configureStore');var _configureStore2=babelHelpers.interopRequireDefault(_configureStore);

function setup(){var
Root=function(_Component){babelHelpers.inherits(Root,_Component);

function Root(){babelHelpers.classCallCheck(this,Root);var _this=babelHelpers.possibleConstructorReturn(this,(Root.__proto__||Object.getPrototypeOf(Root)).call(this));

_this.state={
isLoading:false,
store:(0,_configureStore2.default)(function(){return _this.setState({isLoading:false});})};return _this;

}babelHelpers.createClass(Root,[{key:'render',value:function render()

{
return(
_react2.default.createElement(_reactRedux.Provider,{store:this.state.store},
_react2.default.createElement(_App2.default,null)));


}}]);return Root;}(_react.Component);


return Root;
}exports.default=

setup;