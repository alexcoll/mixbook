Object.defineProperty(exports,"__esModule",{value:true});
var _react=require('react');var _react2=babelHelpers.interopRequireDefault(_react);
var _reactNative=require('react-native');
var _reactRedux=require('react-redux');
var _nativeBase=require('native-base');

var _drawer=require('../../actions/drawer');
var _styles=require('./styles');var _styles2=babelHelpers.interopRequireDefault(_styles);

var Item=_nativeBase.Picker.Item;
var camera=require('../../../img/camera.png');var

Account=function(_Component){babelHelpers.inherits(Account,_Component);





function Account(props){babelHelpers.classCallCheck(this,Account);var _this=babelHelpers.possibleConstructorReturn(this,(Account.__proto__||Object.getPrototypeOf(Account)).call(this,
props));
_this.state={
selectedItem:undefined,
selected1:'key0',
results:{
items:[]}};return _this;


}babelHelpers.createClass(Account,[{key:'onValueChange',value:function onValueChange(
value){
this.setState({
selected1:value});

}},{key:'render',value:function render()

{
return(
_react2.default.createElement(_nativeBase.Container,{style:_styles2.default.container},
_react2.default.createElement(_nativeBase.Header,null,
_react2.default.createElement(_nativeBase.Button,{transparent:true,onPress:this.props.openDrawer},
_react2.default.createElement(_nativeBase.Icon,{name:'ios-menu'})),


_react2.default.createElement(_nativeBase.Title,null,'Account')),


_react2.default.createElement(_nativeBase.Content,null,
_react2.default.createElement(_reactNative.TouchableOpacity,null,
_react2.default.createElement(_nativeBase.Thumbnail,{size:80,source:camera,style:{alignSelf:'center',marginTop:20,marginBottom:10}})),

_react2.default.createElement(_nativeBase.List,null,
_react2.default.createElement(_nativeBase.ListItem,null,
_react2.default.createElement(_nativeBase.InputGroup,null,
_react2.default.createElement(_nativeBase.Input,{inlineLabel:true,label:'First Name',placeholder:'John'}))),


_react2.default.createElement(_nativeBase.ListItem,null,
_react2.default.createElement(_nativeBase.InputGroup,null,
_react2.default.createElement(_nativeBase.Input,{inlineLabel:true,label:'Last Name',placeholder:'Doe'}))),



_react2.default.createElement(_nativeBase.ListItem,null,
_react2.default.createElement(_nativeBase.InputGroup,null,
_react2.default.createElement(_nativeBase.Icon,{name:'ios-person',style:{color:'#0A69FE'}}),
_react2.default.createElement(_nativeBase.Input,{placeholder:'EMAIL'}))),


_react2.default.createElement(_nativeBase.ListItem,null,
_react2.default.createElement(_nativeBase.InputGroup,null,
_react2.default.createElement(_nativeBase.Icon,{name:'ios-unlock',style:{color:'#0A69FE'}}),
_react2.default.createElement(_nativeBase.Input,{placeholder:'PASSWORD',secureTextEntry:true})))),



_react2.default.createElement(_nativeBase.Button,{style:{alignSelf:'center',marginTop:20,marginBottom:20}},'Save'))));



}}]);return Account;}(_react.Component);Account.propTypes={openDrawer:_react2.default.PropTypes.func};


function bindAction(dispatch){
return{
openDrawer:function openDrawer(){return dispatch((0,_drawer.openDrawer)());}};

}

var mapStateToProps=function mapStateToProps(state){return{
navigation:state.cardNavigation};};exports.default=


(0,_reactRedux.connect)(mapStateToProps,bindAction)(Account);