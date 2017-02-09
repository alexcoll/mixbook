


























'use strict';var





NavigationAnimatedValueSubscription=function(){



function NavigationAnimatedValueSubscription(value,callback){babelHelpers.classCallCheck(this,NavigationAnimatedValueSubscription);
this._value=value;
this._token=value.addListener(callback);
}babelHelpers.createClass(NavigationAnimatedValueSubscription,[{key:'remove',value:function remove()

{
this._value.removeListener(this._token);
}}]);return NavigationAnimatedValueSubscription;}();


module.exports=NavigationAnimatedValueSubscription;