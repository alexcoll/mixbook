Object.defineProperty(exports,"__esModule",{value:true});exports.default=








configureStore;var _reactNative=require('react-native');var _remoteReduxDevtools=require('remote-redux-devtools');var _remoteReduxDevtools2=babelHelpers.interopRequireDefault(_remoteReduxDevtools);var _redux=require('redux');var _reduxThunk=require('redux-thunk');var _reduxThunk2=babelHelpers.interopRequireDefault(_reduxThunk);var _reduxPersist=require('redux-persist');var _reducers=require('./reducers');var _reducers2=babelHelpers.interopRequireDefault(_reducers);var _promise=require('./promise');var _promise2=babelHelpers.interopRequireDefault(_promise);function configureStore(onCompletion){
var enhancer=(0,_redux.compose)(
(0,_redux.applyMiddleware)(_reduxThunk2.default,_promise2.default),
(0,_remoteReduxDevtools2.default)({
name:'nativebasekitchensink',realtime:true}));



var store=(0,_redux.createStore)(_reducers2.default,enhancer);
(0,_reduxPersist.persistStore)(store,{storage:_reactNative.AsyncStorage},onCompletion);

return store;
}