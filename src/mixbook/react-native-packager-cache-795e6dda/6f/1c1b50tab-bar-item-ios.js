Object.defineProperty(exports,"__esModule",{value:true});exports.default=











createTabBarItemIOSComponent;var _isEqual=require('lodash/isEqual');var _isEqual2=babelHelpers.interopRequireDefault(_isEqual);var _pick=require('lodash/pick');var _pick2=babelHelpers.interopRequireDefault(_pick);var _react=require('react');var _react2=babelHelpers.interopRequireDefault(_react);var _reactNative=require('./react-native');function createTabBarItemIOSComponent(IconNamePropType,getImageSource){var _class,_temp;
return _temp=_class=function(_Component){babelHelpers.inherits(TabBarItemIOS,_Component);function TabBarItemIOS(){babelHelpers.classCallCheck(this,TabBarItemIOS);return babelHelpers.possibleConstructorReturn(this,(TabBarItemIOS.__proto__||Object.getPrototypeOf(TabBarItemIOS)).apply(this,arguments));}babelHelpers.createClass(TabBarItemIOS,[{key:'updateIconSources',value:function updateIconSources(












props){var _this2=this;
if(props.iconName){
getImageSource(props.iconName,props.iconSize,props.iconColor).then(function(icon){return _this2.setState({icon:icon});});
}
if(props.selectedIconName||props.selectedIconColor){
var selectedIconName=props.selectedIconName||props.iconName;
var selectedIconColor=props.selectedIconColor||props.iconColor;
getImageSource(selectedIconName,props.iconSize,selectedIconColor).then(function(selectedIcon){return _this2.setState({selectedIcon:selectedIcon});});
}
}},{key:'componentWillMount',value:function componentWillMount()

{
this.updateIconSources(this.props);
}},{key:'componentWillReceiveProps',value:function componentWillReceiveProps(

nextProps){
var keys=Object.keys(TabBarItemIOS.propTypes);
if(!(0,_isEqual2.default)((0,_pick2.default)(nextProps,keys),(0,_pick2.default)(this.props,keys))){
this.updateIconSources(nextProps);
}
}},{key:'render',value:function render()

{
return _react2.default.createElement(_reactNative.TabBarIOS.Item,babelHelpers.extends({},this.props,this.state));
}}]);return TabBarItemIOS;}(_react.Component),_class.propTypes={iconName:IconNamePropType.isRequired,selectedIconName:IconNamePropType,iconSize:_react.PropTypes.number,iconColor:_react.PropTypes.string,selectedIconColor:_react.PropTypes.string},_class.defaultProps={iconSize:30},_temp;

}