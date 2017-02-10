










'use strict';

var DialogManagerAndroid=require('NativeModules').DialogManagerAndroid;
var Permissions=require('NativeModules').PermissionsAndroid;var














































PermissionsAndroid=function(){


function PermissionsAndroid(){babelHelpers.classCallCheck(this,PermissionsAndroid);



this.PERMISSIONS={
READ_CALENDAR:'android.permission.READ_CALENDAR',
WRITE_CALENDAR:'android.permission.WRITE_CALENDAR',
CAMERA:'android.permission.CAMERA',
READ_CONTACTS:'android.permission.READ_CONTACTS',
WRITE_CONTACTS:'android.permission.WRITE_CONTACTS',
GET_ACCOUNTS:'android.permission.GET_ACCOUNTS',
ACCESS_FINE_LOCATION:'android.permission.ACCESS_FINE_LOCATION',
ACCESS_COARSE_LOCATION:'android.permission.ACCESS_COARSE_LOCATION',
RECORD_AUDIO:'android.permission.RECORD_AUDIO',
READ_PHONE_STATE:'android.permission.READ_PHONE_STATE',
CALL_PHONE:'android.permission.CALL_PHONE',
READ_CALL_LOG:'android.permission.READ_CALL_LOG',
WRITE_CALL_LOG:'android.permission.WRITE_CALL_LOG',
ADD_VOICEMAIL:'com.android.voicemail.permission.ADD_VOICEMAIL',
USE_SIP:'android.permission.USE_SIP',
PROCESS_OUTGOING_CALLS:'android.permission.PROCESS_OUTGOING_CALLS',
BODY_SENSORS:'android.permission.BODY_SENSORS',
SEND_SMS:'android.permission.SEND_SMS',
RECEIVE_SMS:'android.permission.RECEIVE_SMS',
READ_SMS:'android.permission.READ_SMS',
RECEIVE_WAP_PUSH:'android.permission.RECEIVE_WAP_PUSH',
RECEIVE_MMS:'android.permission.RECEIVE_MMS',
READ_EXTERNAL_STORAGE:'android.permission.READ_EXTERNAL_STORAGE',
WRITE_EXTERNAL_STORAGE:'android.permission.WRITE_EXTERNAL_STORAGE'};

}babelHelpers.createClass(PermissionsAndroid,[{key:'checkPermission',value:function checkPermission(





permission){
return Permissions.checkPermission(permission);
}},{key:'requestPermission',value:function requestPermission(











permission,rationale){var shouldShowRationale;return regeneratorRuntime.async(function requestPermission$(_context){while(1){switch(_context.prev=_context.next){case 0:if(!
rationale){_context.next=6;break;}_context.next=3;return regeneratorRuntime.awrap(
Permissions.shouldShowRequestPermissionRationale(permission));case 3:shouldShowRationale=_context.sent;if(!

shouldShowRationale){_context.next=6;break;}return _context.abrupt('return',
new Promise(function(resolve,reject){
DialogManagerAndroid.showAlert(
rationale,
function(){return reject(new Error('Error showing rationale'));},
function(){return resolve(Permissions.requestPermission(permission));});

}));case 6:return _context.abrupt('return',


Permissions.requestPermission(permission));case 7:case'end':return _context.stop();}}},null,this);}}]);return PermissionsAndroid;}();



PermissionsAndroid=new PermissionsAndroid();

module.exports=PermissionsAndroid;