Object.defineProperty(exports,"__esModule",{value:true});
var _react=require('react');var _react2=babelHelpers.interopRequireDefault(_react);
var _reactRedux=require('react-redux');
var _nativeBase=require('native-base');

var _drawer=require('../../actions/drawer');
var _styles=require('./styles');var _styles2=babelHelpers.interopRequireDefault(_styles);var

Settings=function(_Component){babelHelpers.inherits(Settings,_Component);





function Settings(props){babelHelpers.classCallCheck(this,Settings);var _this=babelHelpers.possibleConstructorReturn(this,(Settings.__proto__||Object.getPrototypeOf(Settings)).call(this,
props));
_this.state={
checkbox1:true,
checkbox2:true,
checkbox3:true,
checkbox4:false};return _this;

}babelHelpers.createClass(Settings,[{key:'toggleSwitch1',value:function toggleSwitch1()

{
this.setState({
checkbox1:!this.state.checkbox1});

}},{key:'toggleSwitch2',value:function toggleSwitch2()

{
this.setState({
checkbox2:!this.state.checkbox2});

}},{key:'toggleSwitch3',value:function toggleSwitch3()

{
this.setState({
checkbox3:!this.state.checkbox3});

}},{key:'render',value:function render()

{var _this2=this;
return(
_react2.default.createElement(_nativeBase.Container,{style:_styles2.default.container},
_react2.default.createElement(_nativeBase.Header,null,
_react2.default.createElement(_nativeBase.Button,{transparent:true,onPress:this.props.openDrawer},
_react2.default.createElement(_nativeBase.Icon,{name:'ios-menu'})),


_react2.default.createElement(_nativeBase.Title,null,'Settings')),


_react2.default.createElement(_nativeBase.Content,null,
_react2.default.createElement(_nativeBase.List,null,
_react2.default.createElement(_nativeBase.ListItem,{button:true,onPress:function onPress(){return _this2.toggleSwitch1();}},
_react2.default.createElement(_nativeBase.CheckBox,{checked:this.state.checkbox1,onPress:function onPress(){return _this2.toggleSwitch1();}}),
_react2.default.createElement(_nativeBase.Text,null,'Stay logged in')),

_react2.default.createElement(_nativeBase.ListItem,{button:true,onPress:function onPress(){return _this2.toggleSwitch2();}},
_react2.default.createElement(_nativeBase.CheckBox,{checked:this.state.checkbox2,onPress:function onPress(){return _this2.toggleSwitch2();}}),
_react2.default.createElement(_nativeBase.Text,null,'Setting 2')),

_react2.default.createElement(_nativeBase.ListItem,{button:true,onPress:function onPress(){return _this2.toggleSwitch2();}},
_react2.default.createElement(_nativeBase.CheckBox,{checked:this.state.checkbox2,onPress:function onPress(){return _this2.toggleSwitch2();}}),
_react2.default.createElement(_nativeBase.Text,null,'Setting 3'))))));





}}]);return Settings;}(_react.Component);Settings.propTypes={openDrawer:_react2.default.PropTypes.func};


function bindAction(dispatch){
return{
openDrawer:function openDrawer(){return dispatch((0,_drawer.openDrawer)());}};

}

var mapStateToProps=function mapStateToProps(state){return{
navigation:state.cardNavigation};};exports.default=


(0,_reactRedux.connect)(mapStateToProps,bindAction)(Settings);