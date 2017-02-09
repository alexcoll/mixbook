Object.defineProperty(exports,"__esModule",{value:true});exports.default=






















createIconSet;var _react=require('react');var _react2=babelHelpers.interopRequireDefault(_react);var _reactNative=require('./react-native');var _iconButton=require('./icon-button');var _iconButton2=babelHelpers.interopRequireDefault(_iconButton);var _tabBarItemIos=require('./tab-bar-item-ios');var _tabBarItemIos2=babelHelpers.interopRequireDefault(_tabBarItemIos);var _toolbarAndroid=require('./toolbar-android');var _toolbarAndroid2=babelHelpers.interopRequireDefault(_toolbarAndroid);var NativeIconAPI=_reactNative.NativeModules&&(_reactNative.NativeModules.RNVectorIconsManager||_reactNative.NativeModules.RNVectorIconsModule);var DEFAULT_ICON_SIZE=12;var DEFAULT_ICON_COLOR='black';function createIconSet(glyphMap,fontFamily,fontFile){
var fontReference=fontFamily;

if(_reactNative.Platform.OS==='android'&&fontFile){
fontReference=fontFile.replace(/\.(otf|ttf)$/,'');
}

var IconNamePropType=_react.PropTypes.oneOf(Object.keys(glyphMap));var

Icon=function(_Component){babelHelpers.inherits(Icon,_Component);function Icon(){babelHelpers.classCallCheck(this,Icon);return babelHelpers.possibleConstructorReturn(this,(Icon.__proto__||Object.getPrototypeOf(Icon)).apply(this,arguments));}babelHelpers.createClass(Icon,[{key:'setNativeProps',value:function setNativeProps(











nativeProps){
if(this._root){
this._root.setNativeProps(nativeProps);
}
}},{key:'render',value:function render()

{var _this2=this;var _props=
this.props,name=_props.name,size=_props.size,color=_props.color,style=_props.style,props=babelHelpers.objectWithoutProperties(_props,['name','size','color','style']);

var glyph=glyphMap[name]||'?';
if(typeof glyph==='number'){
glyph=String.fromCharCode(glyph);
}

var styleDefaults={
fontSize:size,
fontWeight:'normal',
fontStyle:'normal',
color:color};


props.style=[styleDefaults,style];
props.ref=function(component){
_this2._root=component;
};

styleDefaults.fontFamily=fontReference;

return _react2.default.createElement(_reactNative.Text,props,glyph,this.props.children);
}}]);return Icon;}(_react.Component);Icon.propTypes={name:IconNamePropType.isRequired,size:_react.PropTypes.number,color:_react.PropTypes.string};Icon.defaultProps={size:DEFAULT_ICON_SIZE,allowFontScaling:false};


var imageSourceCache={};

function getImageSource(name){var size=arguments.length>1&&arguments[1]!==undefined?arguments[1]:DEFAULT_ICON_SIZE;var color=arguments.length>2&&arguments[2]!==undefined?arguments[2]:DEFAULT_ICON_COLOR;
if(!NativeIconAPI){
if(_reactNative.Platform.OS==='android'){
throw new Error('RNVectorIconsModule not available, did you properly integrate the module?');
}
throw new Error('RNVectorIconsManager not available, did you add the library to your project and link with libRNVectorIcons.a?');
}

var glyph=glyphMap[name]||'?';
if(typeof glyph==='number'){
glyph=String.fromCharCode(glyph);
}

var proessedColor=(0,_reactNative.processColor)(color);
var cacheKey=glyph+':'+size+':'+proessedColor;
var scale=_reactNative.PixelRatio.get();

return new Promise(function(resolve,reject){
var cached=imageSourceCache[cacheKey];
if(typeof cached!=='undefined'){
if(!cached||cached instanceof Error){reject(cached);}
resolve({uri:cached,scale:scale});
}else{
NativeIconAPI.getImageForFont(fontReference,glyph,size,proessedColor,function(err,image){
var error=typeof err==='string'?new Error(err):err;
imageSourceCache[cacheKey]=image||error||false;
if(!error&&image){
resolve({uri:image,scale:scale});
}else{
reject(error);
}
});
}
});
}

Icon.Button=(0,_iconButton2.default)(Icon);
Icon.TabBarItem=Icon.TabBarItemIOS=(0,_tabBarItemIos2.default)(IconNamePropType,getImageSource);
Icon.ToolbarAndroid=(0,_toolbarAndroid2.default)(IconNamePropType,getImageSource);
Icon.getImageSource=getImageSource;

return Icon;
}