Object.defineProperty(exports,"__esModule",{value:true});exports.default=











createToolbarAndroidComponent;var _isEqual=require('lodash/isEqual');var _isEqual2=babelHelpers.interopRequireDefault(_isEqual);var _pick=require('lodash/pick');var _pick2=babelHelpers.interopRequireDefault(_pick);var _react=require('react');var _react2=babelHelpers.interopRequireDefault(_react);var _reactNative=require('./react-native');function createToolbarAndroidComponent(IconNamePropType,getImageSource){var _class,_temp;
return _temp=_class=function(_Component){babelHelpers.inherits(IconToolbarAndroid,_Component);function IconToolbarAndroid(){babelHelpers.classCallCheck(this,IconToolbarAndroid);return babelHelpers.possibleConstructorReturn(this,(IconToolbarAndroid.__proto__||Object.getPrototypeOf(IconToolbarAndroid)).apply(this,arguments));}babelHelpers.createClass(IconToolbarAndroid,[{key:'updateIconSources',value:function updateIconSources(



















props){var _this2=this;
var size=props.iconSize;
var color=props.iconColor||props.titleColor;
if(props.navIconName){
getImageSource(props.navIconName,size,color).then(function(navIcon){return _this2.setState({navIcon:navIcon});});
}
if(props.overflowIconName){
getImageSource(props.overflowIconName,size,color).then(function(overflowIcon){return _this2.setState({overflowIcon:overflowIcon});});
}

Promise.all((props.actions||[]).map(function(action){
if(action.iconName){
return getImageSource(action.iconName,action.iconSize||size,action.iconColor||color).then(function(icon){return babelHelpers.extends({},
action,{
icon:icon});});

}
return Promise.resolve(action);
})).then(function(actions){return _this2.setState({actions:actions});});
}},{key:'componentWillMount',value:function componentWillMount()

{
this.updateIconSources(this.props);
}},{key:'componentWillReceiveProps',value:function componentWillReceiveProps(

nextProps){var _this3=this;
var keys=Object.keys(IconToolbarAndroid.propTypes);
if(!(0,_isEqual2.default)((0,_pick2.default)(nextProps,keys),(0,_pick2.default)(this.props,keys))){
var stateToEvict={};
if(!nextProps.navIconName){
stateToEvict.navIcon=undefined;
}
if(!nextProps.iconName){
stateToEvict.icon=undefined;
}
if(this.state&&Object.keys(stateToEvict).length){
this.setState(stateToEvict,function(){return _this3.updateIconSources(nextProps);});
}else{
this.updateIconSources(nextProps);
}
}
}},{key:'render',value:function render()

{
return _react2.default.createElement(_reactNative.ToolbarAndroid,babelHelpers.extends({},this.props,this.state));
}}]);return IconToolbarAndroid;}(_react.Component),_class.propTypes={navIconName:IconNamePropType,overflowIconName:IconNamePropType,actions:_react.PropTypes.arrayOf(_react.PropTypes.shape({title:_react.PropTypes.string.isRequired,iconName:IconNamePropType,iconSize:_react.PropTypes.number,iconColor:_react.PropTypes.string,show:_react.PropTypes.oneOf(['always','ifRoom','never']),showWithText:_react.PropTypes.bool})),iconSize:_react.PropTypes.number,iconColor:_react.PropTypes.string},_class.defaultProps={iconSize:24},_temp;

}