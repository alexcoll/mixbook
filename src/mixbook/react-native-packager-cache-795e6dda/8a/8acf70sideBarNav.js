Object.defineProperty(exports,"__esModule",{value:true});exports.default=









navigateTo;var _reactNativeNavigationReduxHelpers=require('react-native-navigation-redux-helpers');var _drawer=require('./drawer');var replaceAt=_reactNativeNavigationReduxHelpers.actions.replaceAt,popRoute=_reactNativeNavigationReduxHelpers.actions.popRoute,pushRoute=_reactNativeNavigationReduxHelpers.actions.pushRoute;function navigateTo(route,homeRoute){
return function(dispatch,getState){
var navigation=getState().cardNavigation;
var currentRouteKey=navigation.routes[navigation.routes.length-1].key;

dispatch((0,_drawer.closeDrawer)());

if(currentRouteKey!==homeRoute&&route!==homeRoute){
dispatch(replaceAt(currentRouteKey,{key:route,index:1},navigation.key));
}else if(currentRouteKey!==homeRoute&&route===homeRoute){
dispatch(popRoute(navigation.key));
}else if(currentRouteKey===homeRoute&&route!==homeRoute){
dispatch(pushRoute({key:route,index:1},navigation.key));
}
};
}