
'use strict';Object.defineProperty(exports,"__esModule",{value:true});

var _react=require('react');var _react2=babelHelpers.interopRequireDefault(_react);
var _light=require('../Themes/light');var _light2=babelHelpers.interopRequireDefault(_light);var

NativeBaseComponent=function(_Component){babelHelpers.inherits(NativeBaseComponent,_Component);function NativeBaseComponent(){babelHelpers.classCallCheck(this,NativeBaseComponent);return babelHelpers.possibleConstructorReturn(this,(NativeBaseComponent.__proto__||Object.getPrototypeOf(NativeBaseComponent)).apply(this,arguments));}babelHelpers.createClass(NativeBaseComponent,[{key:'getChildContext',value:function getChildContext()















{
return{
theme:this.props.theme?this.props.theme:this.getTheme(),
foregroundColor:this.props.foregroundColor?
this.props.foregroundColor:this.getTheme().textColor};

}},{key:'getContextForegroundColor',value:function getContextForegroundColor()

{
return this.context.foregroundColor;
}},{key:'getTheme',value:function getTheme()

{
return this.props.theme?this.props.theme:
this.context.theme||_light2.default;
}}]);return NativeBaseComponent;}(_react.Component);NativeBaseComponent.contextTypes={theme:_react2.default.PropTypes.object,foregroundColor:_react2.default.PropTypes.string};NativeBaseComponent.propTypes={theme:_react2.default.PropTypes.object,foregroundColor:_react2.default.PropTypes.string};NativeBaseComponent.childContextTypes={theme:_react2.default.PropTypes.object,foregroundColor:_react2.default.PropTypes.string};exports.default=NativeBaseComponent;