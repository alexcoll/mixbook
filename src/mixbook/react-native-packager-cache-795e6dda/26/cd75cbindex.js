Object.defineProperty(exports,"__esModule",{value:true});
var _react=require('react');var _react2=babelHelpers.interopRequireDefault(_react);
var _reactNative=require('react-native');

var splashscreen=require('../../../img/splashscreen.png');var

SplashPage=function(_Component){babelHelpers.inherits(SplashPage,_Component);function SplashPage(){babelHelpers.classCallCheck(this,SplashPage);return babelHelpers.possibleConstructorReturn(this,(SplashPage.__proto__||Object.getPrototypeOf(SplashPage)).apply(this,arguments));}babelHelpers.createClass(SplashPage,[{key:'componentWillMount',value:function componentWillMount()





{
var navigator=this.props.navigator;
setTimeout(function(){
navigator.replace({
id:'login'});

},1500);
}},{key:'render',value:function render()

{
return(
_react2.default.createElement(_reactNative.Image,{source:splashscreen,style:{flex:1,height:null,width:null}}));

}}]);return SplashPage;}(_react.Component);SplashPage.propTypes={navigator:_react2.default.PropTypes.shape({})};exports.default=SplashPage;