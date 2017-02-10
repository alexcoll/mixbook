Object.defineProperty(exports,"__esModule",{value:true});
var _react=require('react');var _react2=babelHelpers.interopRequireDefault(_react);
var _reactRedux=require('react-redux');
var _nativeBase=require('native-base');

var _drawer=require('../../actions/drawer');
var _baseTheme=require('../../themes/base-theme');var _baseTheme2=babelHelpers.interopRequireDefault(_baseTheme);
var _styles=require('./styles');var _styles2=babelHelpers.interopRequireDefault(_styles);

var _tabOne=require('./tabOne');var _tabOne2=babelHelpers.interopRequireDefault(_tabOne);
var _tabTwo=require('./tabTwo');var _tabTwo2=babelHelpers.interopRequireDefault(_tabTwo);
var _tabThree=require('./tabThree');var _tabThree2=babelHelpers.interopRequireDefault(_tabThree);var

Recipes=function(_Component){babelHelpers.inherits(Recipes,_Component);function Recipes(){babelHelpers.classCallCheck(this,Recipes);return babelHelpers.possibleConstructorReturn(this,(Recipes.__proto__||Object.getPrototypeOf(Recipes)).apply(this,arguments));}babelHelpers.createClass(Recipes,[{key:'render',value:function render()





{
return(
_react2.default.createElement(_nativeBase.Container,{theme:_baseTheme2.default,style:_styles2.default.container},

_react2.default.createElement(_nativeBase.Header,null,
_react2.default.createElement(_nativeBase.Button,{transparent:true,onPress:this.props.openDrawer},
_react2.default.createElement(_nativeBase.Icon,{name:'ios-menu'})),


_react2.default.createElement(_nativeBase.Title,null,'Recipes'),

_react2.default.createElement(_nativeBase.Button,{transparent:true},
_react2.default.createElement(_nativeBase.Icon,{name:'md-search'}))),



_react2.default.createElement(_nativeBase.Content,null,
_react2.default.createElement(_nativeBase.Tabs,null,
_react2.default.createElement(_tabOne2.default,{tabLabel:'Featured'}),
_react2.default.createElement(_tabTwo2.default,{tabLabel:'Popular'}),
_react2.default.createElement(_tabThree2.default,{tabLabel:'New'})))));





}}]);return Recipes;}(_react.Component);Recipes.propTypes={openDrawer:_react2.default.PropTypes.func};


function bindAction(dispatch){
return{
openDrawer:function openDrawer(){return dispatch((0,_drawer.openDrawer)());}};

}

var mapStateToProps=function mapStateToProps(state){return{
navigation:state.cardNavigation};};exports.default=


(0,_reactRedux.connect)(mapStateToProps,bindAction)(Recipes);