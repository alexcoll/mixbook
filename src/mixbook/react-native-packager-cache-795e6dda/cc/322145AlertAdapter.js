var _reactNative=require("react-native");var _reactNative2=babelHelpers.interopRequireDefault(_reactNative);var
Alert=_reactNative2.default.Alert;

if(_reactNative.Platform.OS==="android"){(function(){var
CodePushDialog=_reactNative2.default.NativeModules.CodePushDialog;

Alert={
alert:function alert(title,message,buttons){
if(buttons.length>2){
throw"Can only show 2 buttons for Android dialog.";
}

var button1Text=buttons[0]?buttons[0].text:null,
button2Text=buttons[1]?buttons[1].text:null;

CodePushDialog.showDialog(
title,message,button1Text,button2Text,
function(buttonId){buttons[buttonId].onPress&&buttons[buttonId].onPress();},
function(error){throw error;});
}};})();

}

module.exports={Alert:Alert};