Object.defineProperty(exports,"__esModule",{value:true});
var _react=require('react');var _react2=babelHelpers.interopRequireDefault(_react);
var _reactRedux=require('react-redux');
var _nativeBase=require('native-base');

var _drawer=require('../../actions/drawer');
var _baseTheme=require('../../themes/base-theme');var _baseTheme2=babelHelpers.interopRequireDefault(_baseTheme);
var _styles=require('./styles');var _styles2=babelHelpers.interopRequireDefault(_styles);

var _tabSaved=require('./tabSaved');var _tabSaved2=babelHelpers.interopRequireDefault(_tabSaved);
var _tabMake=require('./tabMake');var _tabMake2=babelHelpers.interopRequireDefault(_tabMake);var

MyDrinks=function(_Component){babelHelpers.inherits(MyDrinks,_Component);function MyDrinks(){babelHelpers.classCallCheck(this,MyDrinks);return babelHelpers.possibleConstructorReturn(this,(MyDrinks.__proto__||Object.getPrototypeOf(MyDrinks)).apply(this,arguments));}babelHelpers.createClass(MyDrinks,[{key:'render',value:function render()





{
return(
_react2.default.createElement(_nativeBase.Container,{theme:_baseTheme2.default,style:_styles2.default.container},

_react2.default.createElement(_nativeBase.Header,null,
_react2.default.createElement(_nativeBase.Button,{transparent:true,onPress:this.props.openDrawer},
_react2.default.createElement(_nativeBase.Icon,{name:'ios-menu'})),


_react2.default.createElement(_nativeBase.Title,null,'My Drinks'),

_react2.default.createElement(_nativeBase.Button,{transparent:true},
_react2.default.createElement(_nativeBase.Icon,{name:'md-search'}))),



_react2.default.createElement(_nativeBase.Content,null,
_react2.default.createElement(_nativeBase.Tabs,null,
_react2.default.createElement(_tabMake2.default,{tabLabel:'Make Drink'}),
_react2.default.createElement(_tabSaved2.default,{tabLabel:'Saved'})))));





}}]);return MyDrinks;}(_react.Component);MyDrinks.propTypes={openDrawer:_react2.default.PropTypes.func};


function bindAction(dispatch){
return{
openDrawer:function openDrawer(){return dispatch((0,_drawer.openDrawer)());}};

}

var mapStateToProps=function mapStateToProps(state){return{
navigation:state.cardNavigation};};exports.default=


(0,_reactRedux.connect)(mapStateToProps,bindAction)(MyDrinks);