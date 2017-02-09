Object.defineProperty(exports,"__esModule",{value:true});exports.default=





































createIconButtonComponent;var _isEqual=require('lodash/isEqual');var _isEqual2=babelHelpers.interopRequireDefault(_isEqual);var _isString=require('lodash/isString');var _isString2=babelHelpers.interopRequireDefault(_isString);var _omit=require('lodash/omit');var _omit2=babelHelpers.interopRequireDefault(_omit);var _pick=require('lodash/pick');var _pick2=babelHelpers.interopRequireDefault(_pick);var _react=require('react');var _react2=babelHelpers.interopRequireDefault(_react);var _reactNative=require('./react-native');var styles=_reactNative.StyleSheet.create({container:{flexDirection:'row',justifyContent:'flex-start',alignItems:'center',padding:8},touchable:{overflow:'hidden'},icon:{marginRight:10},text:{fontWeight:'600',backgroundColor:'transparent'}});var IOS7_BLUE='#007AFF';function createIconButtonComponent(Icon){var _class,_temp;
return _temp=_class=function(_Component){babelHelpers.inherits(IconButton,_Component);function IconButton(){babelHelpers.classCallCheck(this,IconButton);return babelHelpers.possibleConstructorReturn(this,(IconButton.__proto__||Object.getPrototypeOf(IconButton)).apply(this,arguments));}babelHelpers.createClass(IconButton,[{key:'render',value:function render()














{var _props=





this.props,style=_props.style,iconStyle=_props.iconStyle,children=_props.children,props=babelHelpers.objectWithoutProperties(_props,['style','iconStyle','children']);

var iconProps=(0,_pick2.default)(props,Object.keys(_reactNative.Text.propTypes),'style','name','size','color');
var touchableProps=(0,_pick2.default)(props,Object.keys(_reactNative.TouchableHighlight.propTypes));
props=(0,_omit2.default)(
props,
Object.keys(iconProps),
Object.keys(touchableProps),
'iconStyle',
'borderRadius',
'backgroundColor');

iconProps.style=this.props.iconStyle?[styles.icon,this.props.iconStyle]:styles.icon;

var colorStyle=(0,_pick2.default)(this.props,'color');
var blockStyle=(0,_pick2.default)(this.props,'backgroundColor','borderRadius');

if((0,_isString2.default)(children)){
children=_react2.default.createElement(_reactNative.Text,{style:[styles.text,colorStyle]},children);
}

return(
_react2.default.createElement(_reactNative.TouchableHighlight,babelHelpers.extends({style:[styles.touchable,blockStyle]},touchableProps),
_react2.default.createElement(_reactNative.View,babelHelpers.extends({
style:[styles.container,blockStyle,style]},
props),

_react2.default.createElement(Icon,iconProps),
children)));



}}]);return IconButton;}(_react.Component),_class.propTypes={backgroundColor:_react.PropTypes.string,borderRadius:_react.PropTypes.number,color:_react.PropTypes.string,size:_react.PropTypes.number},_class.defaultProps={backgroundColor:IOS7_BLUE,borderRadius:5,color:'white',size:20},_temp;

}