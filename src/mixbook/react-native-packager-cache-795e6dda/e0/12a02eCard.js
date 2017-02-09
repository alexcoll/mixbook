
'use strict';Object.defineProperty(exports,"__esModule",{value:true});

var _react=require('react');var _react2=babelHelpers.interopRequireDefault(_react);
var _reactNative=require('react-native');
var _NativeBaseComponent2=require('../Base/NativeBaseComponent');var _NativeBaseComponent3=babelHelpers.interopRequireDefault(_NativeBaseComponent2);
var _computeProps=require('../../Utils/computeProps');var _computeProps2=babelHelpers.interopRequireDefault(_computeProps);var

CardNB=function(_NativeBaseComponent){babelHelpers.inherits(CardNB,_NativeBaseComponent);function CardNB(){babelHelpers.classCallCheck(this,CardNB);return babelHelpers.possibleConstructorReturn(this,(CardNB.__proto__||Object.getPrototypeOf(CardNB)).apply(this,arguments));}babelHelpers.createClass(CardNB,[{key:'getInitialStyle',value:function getInitialStyle()





{
return{
card:{
marginVertical:5,
flex:1,
borderWidth:this.getTheme().borderWidth,
borderRadius:2,
borderColor:this.getTheme().listBorderColor,
flexWrap:'wrap',
borderBottomWidth:0,
backgroundColor:this.props.transparent?'transparent':this.getTheme().cardDefaultBg,
shadowColor:this.props.transparent?undefined:'#000',
shadowOffset:this.props.transparent?undefined:{width:0,height:2},
shadowOpacity:this.props.transparent?undefined:0.1,
shadowRadius:this.props.transparent?undefined:1.5,
elevation:this.props.transparent?undefined:2}};


}},{key:'prepareRootProps',value:function prepareRootProps()

{

var defaultProps={
style:this.getInitialStyle().card};


return(0,_computeProps2.default)(this.props,defaultProps);

}},{key:'renderChildren',value:function renderChildren()

{
var childrenArray=_react2.default.Children.map(this.props.children,function(child){
return child;
});

return childrenArray;
}},{key:'render',value:function render()

{var _this2=this;
if(this.props.dataArray&&this.props.renderRow){
var ds=new _reactNative.ListView.DataSource({rowHasChanged:function rowHasChanged(r1,r2){return r1!==r2;}});
var dataSource=ds.cloneWithRows(this.props.dataArray);
return(
_react2.default.createElement(_reactNative.ListView,babelHelpers.extends({},this.prepareRootProps(),{
enableEmptySections:true,
dataSource:dataSource,
renderRow:this.props.renderRow})));

}
return(
_react2.default.createElement(_reactNative.View,babelHelpers.extends({ref:function ref(c){return _this2._root=c;}},this.prepareRootProps()),
this.renderChildren()));


}}]);return CardNB;}(_NativeBaseComponent3.default);exports.default=CardNB;