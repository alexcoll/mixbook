Object.defineProperty(exports,"__esModule",{value:true});exports.default=













function(){var state=arguments.length>0&&arguments[0]!==undefined?arguments[0]:initialState;var action=arguments[1];
if(action.type===_drawer.OPEN_DRAWER){
return babelHelpers.extends({},
state,{
drawerState:'opened'});

}

if(action.type===_drawer.CLOSE_DRAWER){
return babelHelpers.extends({},
state,{
drawerState:'closed'});

}

return state;
};var _drawer=require('../actions/drawer');var initialState={drawerState:'closed',drawerDisabled:true};