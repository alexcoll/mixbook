'use strict';

exports.__esModule=true;
exports.getHostForRN=getHostForRN;




function getHostForRN(hostname){
if((hostname==='localhost'||hostname==='127.0.0.1')&&typeof window!=='undefined'&&window.__fbBatchedBridge&&window.__fbBatchedBridge.RemoteModules&&window.__fbBatchedBridge.RemoteModules.AndroidConstants){
var _window$__fbBatchedBr=window.__fbBatchedBridge.RemoteModules.AndroidConstants.ServerHost;
var ServerHost=_window$__fbBatchedBr===undefined?hostname:_window$__fbBatchedBr;

return ServerHost.split(':')[0];
}

return hostname;
}