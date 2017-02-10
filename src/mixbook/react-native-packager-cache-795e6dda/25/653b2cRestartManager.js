var log=require("./logging");
var NativeCodePush=require("react-native").NativeModules.CodePush;

var RestartManager=function(){
var _allowed=true;
var _restartInProgress=false;
var _restartQueue=[];

function allow(){
log("Re-allowing restarts");
_allowed=true;

if(_restartQueue.length){
log("Executing pending restart");
restartApp(_restartQueue.shift(1));
}
}

function clearPendingRestart(){
_restartQueue=[];
}

function disallow(){
log("Disallowing restarts");
_allowed=false;
}

function restartApp(){var onlyIfUpdateIsPending=arguments.length>0&&arguments[0]!==undefined?arguments[0]:false;return regeneratorRuntime.async(function restartApp$(_context){while(1){switch(_context.prev=_context.next){case 0:if(!
_restartInProgress){_context.next=5;break;}
log("Restart request queued until the current restart is completed");
_restartQueue.push(onlyIfUpdateIsPending);_context.next=18;break;case 5:if(
_allowed){_context.next=10;break;}
log("Restart request queued until restarts are re-allowed");
_restartQueue.push(onlyIfUpdateIsPending);_context.next=18;break;case 10:

_restartInProgress=true;_context.next=13;return regeneratorRuntime.awrap(
NativeCodePush.restartApp(onlyIfUpdateIsPending));case 13:if(!_context.sent){_context.next=16;break;}


log("Restarting app");return _context.abrupt("return");case 16:



_restartInProgress=false;
if(_restartQueue.length){
restartApp(_restartQueue.shift(1));
}case 18:case"end":return _context.stop();}}},null,this);}



return{
allow:allow,
clearPendingRestart:clearPendingRestart,
disallow:disallow,
restartApp:restartApp};

}();

module.exports=RestartManager;