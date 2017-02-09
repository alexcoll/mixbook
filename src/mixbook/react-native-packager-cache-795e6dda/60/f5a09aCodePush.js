var _acquisitionSdk=require("code-push/script/acquisition-sdk");
var _AlertAdapter=require("./AlertAdapter");
var _requestFetchAdapter=require("./request-fetch-adapter");var _requestFetchAdapter2=babelHelpers.interopRequireDefault(_requestFetchAdapter);
var _reactNative=require("react-native");
var _RestartManager=require("./RestartManager");var _RestartManager2=babelHelpers.interopRequireDefault(_RestartManager);
var _logging=require("./logging");var _logging2=babelHelpers.interopRequireDefault(_logging);

var NativeCodePush=require("react-native").NativeModules.CodePush;
var PackageMixins=require("./package-mixins")(NativeCodePush);

function checkForUpdate(){var deploymentKey=arguments.length>0&&arguments[0]!==undefined?arguments[0]:null;var nativeConfig,config,sdk,localPackage,queryPackage,update,remotePackage;return regeneratorRuntime.async(function checkForUpdate$(_context){while(1){switch(_context.prev=_context.next){case 0:_context.next=2;return regeneratorRuntime.awrap(









getConfiguration());case 2:nativeConfig=_context.sent;








config=deploymentKey?babelHelpers.extends({},nativeConfig,{deploymentKey:deploymentKey}):nativeConfig;
sdk=getPromisifiedSdk(_requestFetchAdapter2.default,config);_context.next=7;return regeneratorRuntime.awrap(


module.exports.getCurrentPackage());case 7:localPackage=_context.sent;









queryPackage=void 0;
if(localPackage){
queryPackage=localPackage;
}else{
queryPackage={appVersion:config.appVersion};
if(_reactNative.Platform.OS==="ios"&&config.packageHash){
queryPackage.packageHash=config.packageHash;
}
}_context.next=12;return regeneratorRuntime.awrap(

sdk.queryUpdateWithCurrentPackage(queryPackage));case 12:update=_context.sent;if(!(



















!update||update.updateAppVersion||
localPackage&&update.packageHash===localPackage.packageHash||
(!localPackage||localPackage._isDebugOnly)&&config.packageHash===update.packageHash)){_context.next=18;break;}
if(update&&update.updateAppVersion){
(0,_logging2.default)("An update is available but it is not targeting the binary version of your app.");
}return _context.abrupt("return",

null);case 18:

remotePackage=babelHelpers.extends({},update,PackageMixins.remote(sdk.reportStatusDownload));_context.next=21;return regeneratorRuntime.awrap(
NativeCodePush.isFailedUpdate(remotePackage.packageHash));case 21:remotePackage.failedInstall=_context.sent;
remotePackage.deploymentKey=deploymentKey||nativeConfig.deploymentKey;return _context.abrupt("return",
remotePackage);case 24:case"end":return _context.stop();}}},null,this);}



var getConfiguration=function(){
var config=void 0;
return function getConfiguration(){return regeneratorRuntime.async(function getConfiguration$(_context2){while(1){switch(_context2.prev=_context2.next){case 0:if(!
config){_context2.next=4;break;}return _context2.abrupt("return",
config);case 4:if(!
testConfig){_context2.next=8;break;}return _context2.abrupt("return",
testConfig);case 8:_context2.next=10;return regeneratorRuntime.awrap(

NativeCodePush.getConfiguration());case 10:config=_context2.sent;return _context2.abrupt("return",
config);case 12:case"end":return _context2.stop();}}},null,this);};


}();

function getCurrentPackage(){return regeneratorRuntime.async(function getCurrentPackage$(_context3){while(1){switch(_context3.prev=_context3.next){case 0:_context3.next=2;return regeneratorRuntime.awrap(
getUpdateMetadata(CodePush.UpdateState.LATEST));case 2:return _context3.abrupt("return",_context3.sent);case 3:case"end":return _context3.stop();}}},null,this);}


function getUpdateMetadata(updateState){var updateMetadata;return regeneratorRuntime.async(function getUpdateMetadata$(_context4){while(1){switch(_context4.prev=_context4.next){case 0:_context4.next=2;return regeneratorRuntime.awrap(
NativeCodePush.getUpdateMetadata(updateState||CodePush.UpdateState.RUNNING));case 2:updateMetadata=_context4.sent;if(!
updateMetadata){_context4.next=11;break;}
updateMetadata=babelHelpers.extends({},PackageMixins.local,updateMetadata);_context4.next=7;return regeneratorRuntime.awrap(
NativeCodePush.isFailedUpdate(updateMetadata.packageHash));case 7:updateMetadata.failedInstall=_context4.sent;_context4.next=10;return regeneratorRuntime.awrap(
NativeCodePush.isFirstRun(updateMetadata.packageHash));case 10:updateMetadata.isFirstRun=_context4.sent;case 11:return _context4.abrupt("return",

updateMetadata);case 12:case"end":return _context4.stop();}}},null,this);}


function getPromisifiedSdk(requestFetchAdapter,config){

var sdk=new module.exports.AcquisitionSdk(requestFetchAdapter,config);
sdk.queryUpdateWithCurrentPackage=function(queryPackage){
return new Promise(function(resolve,reject){
module.exports.AcquisitionSdk.prototype.queryUpdateWithCurrentPackage.call(sdk,queryPackage,function(err,update){
if(err){
reject(err);
}else{
resolve(update);
}
});
});
};

sdk.reportStatusDeploy=function(deployedPackage,status,previousLabelOrAppVersion,previousDeploymentKey){
return new Promise(function(resolve,reject){
module.exports.AcquisitionSdk.prototype.reportStatusDeploy.call(sdk,deployedPackage,status,previousLabelOrAppVersion,previousDeploymentKey,function(err){
if(err){
reject(err);
}else{
resolve();
}
});
});
};

sdk.reportStatusDownload=function(downloadedPackage){
return new Promise(function(resolve,reject){
module.exports.AcquisitionSdk.prototype.reportStatusDownload.call(sdk,downloadedPackage,function(err){
if(err){
reject(err);
}else{
resolve();
}
});
});
};

return sdk;
}



var notifyApplicationReady=function(){
var notifyApplicationReadyPromise=void 0;
return function(){
if(!notifyApplicationReadyPromise){
notifyApplicationReadyPromise=notifyApplicationReadyInternal();
}

return notifyApplicationReadyPromise;
};
}();

function notifyApplicationReadyInternal(){var statusReport;return regeneratorRuntime.async(function notifyApplicationReadyInternal$(_context5){while(1){switch(_context5.prev=_context5.next){case 0:_context5.next=2;return regeneratorRuntime.awrap(
NativeCodePush.notifyApplicationReady());case 2:_context5.next=4;return regeneratorRuntime.awrap(
NativeCodePush.getNewStatusReport());case 4:statusReport=_context5.sent;
statusReport&&tryReportStatus(statusReport);return _context5.abrupt("return",

statusReport);case 7:case"end":return _context5.stop();}}},null,this);}


function tryReportStatus(statusReport,_resumeListener){var _this=this;var config,previousLabelOrAppVersion,previousDeploymentKey,sdk,label,_sdk;return regeneratorRuntime.async(function tryReportStatus$(_context7){while(1){switch(_context7.prev=_context7.next){case 0:_context7.next=2;return regeneratorRuntime.awrap(
getConfiguration());case 2:config=_context7.sent;
previousLabelOrAppVersion=statusReport.previousLabelOrAppVersion;
previousDeploymentKey=statusReport.previousDeploymentKey||config.deploymentKey;_context7.prev=5;if(!

statusReport.appVersion){_context7.next=13;break;}
(0,_logging2.default)("Reporting binary update ("+statusReport.appVersion+")");

sdk=getPromisifiedSdk(_requestFetchAdapter2.default,config);_context7.next=11;return regeneratorRuntime.awrap(
sdk.reportStatusDeploy(null,null,previousLabelOrAppVersion,previousDeploymentKey));case 11:_context7.next=19;break;case 13:

label=statusReport.package.label;
if(statusReport.status==="DeploymentSucceeded"){
(0,_logging2.default)("Reporting CodePush update success ("+label+")");
}else{
(0,_logging2.default)("Reporting CodePush update rollback ("+label+")");
}

config.deploymentKey=statusReport.package.deploymentKey;
_sdk=getPromisifiedSdk(_requestFetchAdapter2.default,config);_context7.next=19;return regeneratorRuntime.awrap(
_sdk.reportStatusDeploy(statusReport.package,statusReport.status,previousLabelOrAppVersion,previousDeploymentKey));case 19:


NativeCodePush.recordStatusReported(statusReport);
_resumeListener&&_reactNative.AppState.removeEventListener("change",_resumeListener);_context7.next=28;break;case 23:_context7.prev=23;_context7.t0=_context7["catch"](5);

(0,_logging2.default)("Report status failed: "+JSON.stringify(statusReport));
NativeCodePush.saveStatusReportForRetry(statusReport);

if(!_resumeListener){
_resumeListener=function resumeListener(newState){var refreshedStatusReport;return regeneratorRuntime.async(function resumeListener$(_context6){while(1){switch(_context6.prev=_context6.next){case 0:if(!(
newState!=="active")){_context6.next=2;break;}return _context6.abrupt("return");case 2:_context6.next=4;return regeneratorRuntime.awrap(
NativeCodePush.getNewStatusReport());case 4:refreshedStatusReport=_context6.sent;
if(refreshedStatusReport){
tryReportStatus(refreshedStatusReport,_resumeListener);
}else{
_reactNative.AppState.removeEventListener("change",_resumeListener);
}case 6:case"end":return _context6.stop();}}},null,_this);};

_reactNative.AppState.addEventListener("change",_resumeListener);
}case 28:case"end":return _context7.stop();}}},null,this,[[5,23]]);}



var testConfig;


function setUpTestDependencies(testSdk,providedTestConfig,testNativeBridge){
if(testSdk)module.exports.AcquisitionSdk=testSdk;
if(providedTestConfig)testConfig=providedTestConfig;
if(testNativeBridge)NativeCodePush=testNativeBridge;
}



var sync=function(){
var syncInProgress=false;
var setSyncCompleted=function setSyncCompleted(){syncInProgress=false;};

return function(){var options=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};var syncStatusChangeCallback=arguments[1];var downloadProgressCallback=arguments[2];
if(syncInProgress){
typeof syncStatusChangeCallback==="function"?
syncStatusChangeCallback(CodePush.SyncStatus.SYNC_IN_PROGRESS):
(0,_logging2.default)("Sync already in progress.");
return Promise.resolve(CodePush.SyncStatus.SYNC_IN_PROGRESS);
}

syncInProgress=true;
var syncPromise=syncInternal(options,syncStatusChangeCallback,downloadProgressCallback);
syncPromise.
then(setSyncCompleted).
catch(setSyncCompleted);

return syncPromise;
};
}();










function syncInternal(){var options=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};var _this2=this;var syncStatusChangeCallback=arguments[1];var downloadProgressCallback=arguments[2];var resolvedInstallMode,syncOptions,_ret;return regeneratorRuntime.async(function syncInternal$(_context10){while(1){switch(_context10.prev=_context10.next){case 0:
resolvedInstallMode=void 0;
syncOptions=babelHelpers.extends({
deploymentKey:null,
ignoreFailedUpdates:true,
installMode:CodePush.InstallMode.ON_NEXT_RESTART,
mandatoryInstallMode:CodePush.InstallMode.IMMEDIATE,
minimumBackgroundDuration:0,
updateDialog:null},
options);


syncStatusChangeCallback=typeof syncStatusChangeCallback==="function"?
syncStatusChangeCallback:
function(syncStatus){
switch(syncStatus){
case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
(0,_logging2.default)("Checking for update.");
break;
case CodePush.SyncStatus.AWAITING_USER_ACTION:
(0,_logging2.default)("Awaiting user action.");
break;
case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
(0,_logging2.default)("Downloading package.");
break;
case CodePush.SyncStatus.INSTALLING_UPDATE:
(0,_logging2.default)("Installing update.");
break;
case CodePush.SyncStatus.UP_TO_DATE:
(0,_logging2.default)("App is up to date.");
break;
case CodePush.SyncStatus.UPDATE_IGNORED:
(0,_logging2.default)("User cancelled the update.");
break;
case CodePush.SyncStatus.UPDATE_INSTALLED:
if(resolvedInstallMode==CodePush.InstallMode.ON_NEXT_RESTART){
(0,_logging2.default)("Update is installed and will be run on the next app restart.");
}else if(resolvedInstallMode==CodePush.InstallMode.ON_NEXT_RESUME){
if(syncOptions.minimumBackgroundDuration>0){
(0,_logging2.default)("Update is installed and will be run after the app has been in the background for at least "+syncOptions.minimumBackgroundDuration+" seconds.");
}else{
(0,_logging2.default)("Update is installed and will be run when the app next resumes.");
}
}
break;
case CodePush.SyncStatus.UNKNOWN_ERROR:
(0,_logging2.default)("An unknown error occurred.");
break;}

};_context10.prev=3;_context10.next=6;return regeneratorRuntime.awrap(function _callee(){var remotePackage,doDownloadAndInstall,updateShouldBeIgnored;return regeneratorRuntime.async(function _callee$(_context9){while(1){switch(_context9.prev=_context9.next){case 0:_context9.next=2;return regeneratorRuntime.awrap(


CodePush.notifyApplicationReady());case 2:

syncStatusChangeCallback(CodePush.SyncStatus.CHECKING_FOR_UPDATE);_context9.next=5;return regeneratorRuntime.awrap(
checkForUpdate(syncOptions.deploymentKey));case 5:remotePackage=_context9.sent;

doDownloadAndInstall=function doDownloadAndInstall(){var localPackage;return regeneratorRuntime.async(function doDownloadAndInstall$(_context8){while(1){switch(_context8.prev=_context8.next){case 0:
syncStatusChangeCallback(CodePush.SyncStatus.DOWNLOADING_PACKAGE);_context8.next=3;return regeneratorRuntime.awrap(
remotePackage.download(downloadProgressCallback));case 3:localPackage=_context8.sent;


resolvedInstallMode=localPackage.isMandatory?syncOptions.mandatoryInstallMode:syncOptions.installMode;

syncStatusChangeCallback(CodePush.SyncStatus.INSTALLING_UPDATE);_context8.next=8;return regeneratorRuntime.awrap(
localPackage.install(resolvedInstallMode,syncOptions.minimumBackgroundDuration,function(){
syncStatusChangeCallback(CodePush.SyncStatus.UPDATE_INSTALLED);
}));case 8:return _context8.abrupt("return",

CodePush.SyncStatus.UPDATE_INSTALLED);case 9:case"end":return _context8.stop();}}},null,_this2);};


updateShouldBeIgnored=remotePackage&&remotePackage.failedInstall&&syncOptions.ignoreFailedUpdates;if(!(
!remotePackage||updateShouldBeIgnored)){_context9.next=14;break;}
if(updateShouldBeIgnored){
(0,_logging2.default)("An update is available, but it is being ignored due to having been previously rolled back.");
}

syncStatusChangeCallback(CodePush.SyncStatus.UP_TO_DATE);return _context9.abrupt("return",{v:
CodePush.SyncStatus.UP_TO_DATE});case 14:if(!
syncOptions.updateDialog){_context9.next=22;break;}


if(typeof syncOptions.updateDialog!=="object"){
syncOptions.updateDialog=CodePush.DEFAULT_UPDATE_DIALOG;
}else{
syncOptions.updateDialog=babelHelpers.extends({},CodePush.DEFAULT_UPDATE_DIALOG,syncOptions.updateDialog);
}_context9.next=18;return regeneratorRuntime.awrap(

new Promise(function(resolve,reject){
var message=null;
var dialogButtons=[{
text:null,
onPress:function onPress(){
doDownloadAndInstall().
then(resolve,reject);
}}];


if(remotePackage.isMandatory){
message=syncOptions.updateDialog.mandatoryUpdateMessage;
dialogButtons[0].text=syncOptions.updateDialog.mandatoryContinueButtonLabel;
}else{
message=syncOptions.updateDialog.optionalUpdateMessage;
dialogButtons[0].text=syncOptions.updateDialog.optionalInstallButtonLabel;


dialogButtons.push({
text:syncOptions.updateDialog.optionalIgnoreButtonLabel,
onPress:function onPress(){
syncStatusChangeCallback(CodePush.SyncStatus.UPDATE_IGNORED);
resolve(CodePush.SyncStatus.UPDATE_IGNORED);
}});

}



if(syncOptions.updateDialog.appendReleaseDescription&&remotePackage.description){
message+=syncOptions.updateDialog.descriptionPrefix+" "+remotePackage.description;
}

syncStatusChangeCallback(CodePush.SyncStatus.AWAITING_USER_ACTION);
_AlertAdapter.Alert.alert(syncOptions.updateDialog.title,message,dialogButtons);
}));case 18:_context9.t0=_context9.sent;return _context9.abrupt("return",{v:_context9.t0});case 22:_context9.next=24;return regeneratorRuntime.awrap(

doDownloadAndInstall());case 24:_context9.t1=_context9.sent;return _context9.abrupt("return",{v:_context9.t1});case 26:case"end":return _context9.stop();}}},null,_this2);}());case 6:_ret=_context10.sent;if(!(typeof _ret==="object")){_context10.next=9;break;}return _context10.abrupt("return",_ret.v);case 9:_context10.next=16;break;case 11:_context10.prev=11;_context10.t0=_context10["catch"](3);


syncStatusChangeCallback(CodePush.SyncStatus.UNKNOWN_ERROR);
(0,_logging2.default)(_context10.t0.message);throw _context10.t0;case 16:case"end":return _context10.stop();}}},null,this,[[3,11]]);}


;

var CodePush=void 0;

function codePushify(){var options=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};
var React=void 0;
var ReactNative=require("react-native");

try{React=require("react");}catch(e){}
if(!React){
try{React=ReactNative.React;}catch(e){}
if(!React){
throw new Error("Unable to find the 'React' module.");
}
}

if(!React.Component){
throw new Error("Unable to find the \"Component\" class, please either:\n1. Upgrade to a newer version of React Native that supports it, or\n2. Call the codePush.sync API in your component instead of using the @codePush decorator");




}

var decorator=function decorator(RootComponent){
return function(_React$Component){babelHelpers.inherits(CodePushComponent,_React$Component);function CodePushComponent(){babelHelpers.classCallCheck(this,CodePushComponent);return babelHelpers.possibleConstructorReturn(this,(CodePushComponent.__proto__||Object.getPrototypeOf(CodePushComponent)).apply(this,arguments));}babelHelpers.createClass(CodePushComponent,[{key:"componentDidMount",value:function componentDidMount()
{var _this4=this;
if(options.checkFrequency===CodePush.CheckFrequency.MANUAL){
CodePush.notifyAppReady();
}else{(function(){
var rootComponentInstance=_this4.refs.rootComponent;

var syncStatusCallback=void 0;
if(rootComponentInstance&&rootComponentInstance.codePushStatusDidChange){
syncStatusCallback=rootComponentInstance.codePushStatusDidChange;
if(rootComponentInstance instanceof React.Component){
syncStatusCallback=syncStatusCallback.bind(rootComponentInstance);
}
}

var downloadProgressCallback=void 0;
if(rootComponentInstance&&rootComponentInstance.codePushDownloadDidProgress){
downloadProgressCallback=rootComponentInstance.codePushDownloadDidProgress;
if(rootComponentInstance instanceof React.Component){
downloadProgressCallback=downloadProgressCallback.bind(rootComponentInstance);
}
}

CodePush.sync(options,syncStatusCallback,downloadProgressCallback);
if(options.checkFrequency===CodePush.CheckFrequency.ON_APP_RESUME){
ReactNative.AppState.addEventListener("change",function(newState){
newState==="active"&&CodePush.sync(options,syncStatusCallback,downloadProgressCallback);
});
}})();
}
}},{key:"render",value:function render()

{
return React.createElement(RootComponent,babelHelpers.extends({},this.props,{ref:"rootComponent"}));
}}]);return CodePushComponent;}(React.Component);

};

if(typeof options==="function"){

return decorator(options);
}else{
return decorator;
}
}





if(NativeCodePush){
CodePush=codePushify;
babelHelpers.extends(CodePush,{
AcquisitionSdk:_acquisitionSdk.AcquisitionManager,
checkForUpdate:checkForUpdate,
getConfiguration:getConfiguration,
getCurrentPackage:getCurrentPackage,
getUpdateMetadata:getUpdateMetadata,
log:_logging2.default,
notifyAppReady:notifyApplicationReady,
notifyApplicationReady:notifyApplicationReady,
restartApp:_RestartManager2.default.restartApp,
setUpTestDependencies:setUpTestDependencies,
sync:sync,
disallowRestart:_RestartManager2.default.disallow,
allowRestart:_RestartManager2.default.allow,
InstallMode:{
IMMEDIATE:NativeCodePush.codePushInstallModeImmediate,
ON_NEXT_RESTART:NativeCodePush.codePushInstallModeOnNextRestart,
ON_NEXT_RESUME:NativeCodePush.codePushInstallModeOnNextResume},

SyncStatus:{
UP_TO_DATE:0,
UPDATE_INSTALLED:1,
UPDATE_IGNORED:2,
UNKNOWN_ERROR:3,
SYNC_IN_PROGRESS:4,
CHECKING_FOR_UPDATE:5,
AWAITING_USER_ACTION:6,
DOWNLOADING_PACKAGE:7,
INSTALLING_UPDATE:8},

CheckFrequency:{
ON_APP_START:0,
ON_APP_RESUME:1,
MANUAL:2},

UpdateState:{
RUNNING:NativeCodePush.codePushUpdateStateRunning,
PENDING:NativeCodePush.codePushUpdateStatePending,
LATEST:NativeCodePush.codePushUpdateStateLatest},

DeploymentStatus:{
FAILED:"DeploymentFailed",
SUCCEEDED:"DeploymentSucceeded"},

DEFAULT_UPDATE_DIALOG:{
appendReleaseDescription:false,
descriptionPrefix:" Description: ",
mandatoryContinueButtonLabel:"Continue",
mandatoryUpdateMessage:"An update is available that must be installed.",
optionalIgnoreButtonLabel:"Ignore",
optionalInstallButtonLabel:"Install",
optionalUpdateMessage:"An update is available. Would you like to install it?",
title:"Update available"}});


}else{
(0,_logging2.default)("The CodePush module doesn't appear to be properly installed. Please double-check that everything is setup correctly.");
}

module.exports=CodePush;