Object.defineProperty(exports,"__esModule",{value:true});
var _react=require('react');var _react2=babelHelpers.interopRequireDefault(_react);
var _reactRedux=require('react-redux');
var _nativeBase=require('native-base');

var _drawer=require('../../actions/drawer');
var _baseTheme=require('../../themes/base-theme');var _baseTheme2=babelHelpers.interopRequireDefault(_baseTheme);
var _styles=require('./styles');var _styles2=babelHelpers.interopRequireDefault(_styles);

var _tabAlcohol=require('./tabAlcohol');var _tabAlcohol2=babelHelpers.interopRequireDefault(_tabAlcohol);
var _tabMixer=require('./tabMixer');var _tabMixer2=babelHelpers.interopRequireDefault(_tabMixer);var

Ingredients=function(_Component){babelHelpers.inherits(Ingredients,_Component);function Ingredients(){babelHelpers.classCallCheck(this,Ingredients);return babelHelpers.possibleConstructorReturn(this,(Ingredients.__proto__||Object.getPrototypeOf(Ingredients)).apply(this,arguments));}babelHelpers.createClass(Ingredients,[{key:'render',value:function render()





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
_react2.default.createElement(_tabAlcohol2.default,{tabLabel:'Alcohol'}),
_react2.default.createElement(_tabMixer2.default,{tabLabel:'Mixers'}))),'a'));





}}]);return Ingredients;}(_react.Component);Ingredients.propTypes={openDrawer:_react2.default.PropTypes.func};


function bindAction(dispatch){
return{
openDrawer:function openDrawer(){return dispatch((0,_drawer.openDrawer)());}};

}

var mapStateToProps=function mapStateToProps(state){return{
navigation:state.cardNavigation};};exports.default=


(0,_reactRedux.connect)(mapStateToProps,bindAction)(Ingredients);