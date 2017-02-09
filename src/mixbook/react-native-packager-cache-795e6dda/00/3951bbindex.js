Object.defineProperty(exports,"__esModule",{value:true});
var _redux=require('redux');

var _drawer=require('./drawer');var _drawer2=babelHelpers.interopRequireDefault(_drawer);
var _cardNavigation=require('./cardNavigation');var _cardNavigation2=babelHelpers.interopRequireDefault(_cardNavigation);exports.default=

(0,_redux.combineReducers)({

drawer:_drawer2.default,
cardNavigation:_cardNavigation2.default});