var _acquisitionSdk=require("code-push/script/acquisition-sdk");
var _reactNative=require("react-native");
var _RestartManager=require("./RestartManager");var _RestartManager2=babelHelpers.interopRequireDefault(_RestartManager);




module.exports=function(NativeCodePush){
var remote=function remote(reportStatusDownload){
return{
download:function download(downloadProgressCallback){var downloadProgressSubscription,codePushEventEmitter,downloadedPackage;return regeneratorRuntime.async(function download$(_context){while(1){switch(_context.prev=_context.next){case 0:if(
this.downloadUrl){_context.next=2;break;}throw(
new Error("Cannot download an update without a download url"));case 2:


downloadProgressSubscription=void 0;
if(downloadProgressCallback){
codePushEventEmitter=new _reactNative.NativeEventEmitter(NativeCodePush);

downloadProgressSubscription=codePushEventEmitter.addListener(
"CodePushDownloadProgress",
downloadProgressCallback);

}_context.prev=4;_context.next=7;return regeneratorRuntime.awrap(




NativeCodePush.downloadUpdate(this,!!downloadProgressCallback));case 7:downloadedPackage=_context.sent;
reportStatusDownload&&reportStatusDownload(this);return _context.abrupt("return",babelHelpers.extends({},
downloadedPackage,local));case 10:_context.prev=10;

downloadProgressSubscription&&downloadProgressSubscription.remove();return _context.finish(10);case 13:case"end":return _context.stop();}}},null,this,[[4,,10,13]]);},



isPending:false};

};

var local={
install:function install(){var installMode=arguments.length>0&&arguments[0]!==undefined?arguments[0]:NativeCodePush.codePushInstallModeOnNextRestart;var minimumBackgroundDuration=arguments.length>1&&arguments[1]!==undefined?arguments[1]:0;var updateInstalledCallback=arguments[2];var localPackage,localPackageCopy;return regeneratorRuntime.async(function install$(_context2){while(1){switch(_context2.prev=_context2.next){case 0:
localPackage=this;
localPackageCopy=babelHelpers.extends({},localPackage);_context2.next=4;return regeneratorRuntime.awrap(
NativeCodePush.installUpdate(localPackageCopy,installMode,minimumBackgroundDuration));case 4:
updateInstalledCallback&&updateInstalledCallback();
if(installMode==NativeCodePush.codePushInstallModeImmediate){
_RestartManager2.default.restartApp(false);
}else{
_RestartManager2.default.clearPendingRestart();
localPackage.isPending=true;
}case 6:case"end":return _context2.stop();}}},null,this);},


isPending:false};


return{local:local,remote:remote};
};