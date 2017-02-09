











'use strict';

var Platform={
OS:'android',
get Version(){
return require('NativeModules').AndroidConstants.Version;
},
select:function select(obj){return obj.android;}};


module.exports=Platform;