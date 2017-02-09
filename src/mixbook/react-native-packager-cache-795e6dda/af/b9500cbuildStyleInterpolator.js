










var keyOf=require('fbjs/lib/keyOf');

var X_DIM=keyOf({x:null});
var Y_DIM=keyOf({y:null});
var Z_DIM=keyOf({z:null});
var W_DIM=keyOf({w:null});

var TRANSFORM_ROTATE_NAME=keyOf({transformRotateRadians:null});

var ShouldAllocateReusableOperationVars={
transformRotateRadians:true,
transformScale:true,
transformTranslate:true};


var InitialOperationField={
transformRotateRadians:[0,0,0,1],
transformTranslate:[0,0,0],
transformScale:[1,1,1]};



























































var ARGUMENT_NAMES_RE=/([^\s,]+)/g;



















var inline=function inline(func,replaceWithArgs){
var fnStr=func.toString();
var parameterNames=fnStr.slice(fnStr.indexOf('(')+1,fnStr.indexOf(')')).
match(ARGUMENT_NAMES_RE)||
[];
var replaceRegexStr=parameterNames.map(function(paramName){
return'\\b'+paramName+'\\b';
}).join('|');
var replaceRegex=new RegExp(replaceRegexStr,'g');
var fnBody=fnStr.substring(fnStr.indexOf('{')+1,fnStr.lastIndexOf('}'));
var newFnBody=fnBody.replace(replaceRegex,function(parameterName){
var indexInParameterNames=parameterNames.indexOf(parameterName);
var replacementName=replaceWithArgs[indexInParameterNames];
return replacementName;
});
return newFnBody.split('\n');
};





var MatrixOps={
unroll:function unroll(matVar,m0,m1,m2,m3,m4,m5,m6,m7,m8,m9,m10,m11,m12,m13,m14,m15){
m0=matVar[0];
m1=matVar[1];
m2=matVar[2];
m3=matVar[3];
m4=matVar[4];
m5=matVar[5];
m6=matVar[6];
m7=matVar[7];
m8=matVar[8];
m9=matVar[9];
m10=matVar[10];
m11=matVar[11];
m12=matVar[12];
m13=matVar[13];
m14=matVar[14];
m15=matVar[15];
},

matrixDiffers:function matrixDiffers(retVar,matVar,m0,m1,m2,m3,m4,m5,m6,m7,m8,m9,m10,m11,m12,m13,m14,m15){
retVar=retVar||
m0!==matVar[0]||
m1!==matVar[1]||
m2!==matVar[2]||
m3!==matVar[3]||
m4!==matVar[4]||
m5!==matVar[5]||
m6!==matVar[6]||
m7!==matVar[7]||
m8!==matVar[8]||
m9!==matVar[9]||
m10!==matVar[10]||
m11!==matVar[11]||
m12!==matVar[12]||
m13!==matVar[13]||
m14!==matVar[14]||
m15!==matVar[15];
},

transformScale:function transformScale(matVar,opVar){

var x=opVar[0];
var y=opVar[1];
var z=opVar[2];
matVar[0]=matVar[0]*x;
matVar[1]=matVar[1]*x;
matVar[2]=matVar[2]*x;
matVar[3]=matVar[3]*x;
matVar[4]=matVar[4]*y;
matVar[5]=matVar[5]*y;
matVar[6]=matVar[6]*y;
matVar[7]=matVar[7]*y;
matVar[8]=matVar[8]*z;
matVar[9]=matVar[9]*z;
matVar[10]=matVar[10]*z;
matVar[11]=matVar[11]*z;
matVar[12]=matVar[12];
matVar[13]=matVar[13];
matVar[14]=matVar[14];
matVar[15]=matVar[15];
},





transformTranslate:function transformTranslate(matVar,opVar){

var x=opVar[0];
var y=opVar[1];
var z=opVar[2];
matVar[12]=matVar[0]*x+matVar[4]*y+matVar[8]*z+matVar[12];
matVar[13]=matVar[1]*x+matVar[5]*y+matVar[9]*z+matVar[13];
matVar[14]=matVar[2]*x+matVar[6]*y+matVar[10]*z+matVar[14];
matVar[15]=matVar[3]*x+matVar[7]*y+matVar[11]*z+matVar[15];
},





transformRotateRadians:function transformRotateRadians(matVar,q){

var xQuat=q[0],yQuat=q[1],zQuat=q[2],wQuat=q[3];
var x2Quat=xQuat+xQuat;
var y2Quat=yQuat+yQuat;
var z2Quat=zQuat+zQuat;
var xxQuat=xQuat*x2Quat;
var xyQuat=xQuat*y2Quat;
var xzQuat=xQuat*z2Quat;
var yyQuat=yQuat*y2Quat;
var yzQuat=yQuat*z2Quat;
var zzQuat=zQuat*z2Quat;
var wxQuat=wQuat*x2Quat;
var wyQuat=wQuat*y2Quat;
var wzQuat=wQuat*z2Quat;

var quatMat0=1-(yyQuat+zzQuat);
var quatMat1=xyQuat+wzQuat;
var quatMat2=xzQuat-wyQuat;
var quatMat4=xyQuat-wzQuat;
var quatMat5=1-(xxQuat+zzQuat);
var quatMat6=yzQuat+wxQuat;
var quatMat8=xzQuat+wyQuat;
var quatMat9=yzQuat-wxQuat;
var quatMat10=1-(xxQuat+yyQuat);



var a00=matVar[0];
var a01=matVar[1];
var a02=matVar[2];
var a03=matVar[3];
var a10=matVar[4];
var a11=matVar[5];
var a12=matVar[6];
var a13=matVar[7];
var a20=matVar[8];
var a21=matVar[9];
var a22=matVar[10];
var a23=matVar[11];

var b0=quatMat0,b1=quatMat1,b2=quatMat2;
matVar[0]=b0*a00+b1*a10+b2*a20;
matVar[1]=b0*a01+b1*a11+b2*a21;
matVar[2]=b0*a02+b1*a12+b2*a22;
matVar[3]=b0*a03+b1*a13+b2*a23;
b0=quatMat4;b1=quatMat5;b2=quatMat6;
matVar[4]=b0*a00+b1*a10+b2*a20;
matVar[5]=b0*a01+b1*a11+b2*a21;
matVar[6]=b0*a02+b1*a12+b2*a22;
matVar[7]=b0*a03+b1*a13+b2*a23;
b0=quatMat8;b1=quatMat9;b2=quatMat10;
matVar[8]=b0*a00+b1*a10+b2*a20;
matVar[9]=b0*a01+b1*a11+b2*a21;
matVar[10]=b0*a02+b1*a12+b2*a22;
matVar[11]=b0*a03+b1*a13+b2*a23;
}};




var MatrixOpsInitial={
transformScale:function transformScale(matVar,opVar){

matVar[0]=opVar[0];
matVar[1]=0;
matVar[2]=0;
matVar[3]=0;
matVar[4]=0;
matVar[5]=opVar[1];
matVar[6]=0;
matVar[7]=0;
matVar[8]=0;
matVar[9]=0;
matVar[10]=opVar[2];
matVar[11]=0;
matVar[12]=0;
matVar[13]=0;
matVar[14]=0;
matVar[15]=1;
},

transformTranslate:function transformTranslate(matVar,opVar){

matVar[0]=1;
matVar[1]=0;
matVar[2]=0;
matVar[3]=0;
matVar[4]=0;
matVar[5]=1;
matVar[6]=0;
matVar[7]=0;
matVar[8]=0;
matVar[9]=0;
matVar[10]=1;
matVar[11]=0;
matVar[12]=opVar[0];
matVar[13]=opVar[1];
matVar[14]=opVar[2];
matVar[15]=1;
},






transformRotateRadians:function transformRotateRadians(matVar,q){


var xQuat=q[0],yQuat=q[1],zQuat=q[2],wQuat=q[3];
var x2Quat=xQuat+xQuat;
var y2Quat=yQuat+yQuat;
var z2Quat=zQuat+zQuat;
var xxQuat=xQuat*x2Quat;
var xyQuat=xQuat*y2Quat;
var xzQuat=xQuat*z2Quat;
var yyQuat=yQuat*y2Quat;
var yzQuat=yQuat*z2Quat;
var zzQuat=zQuat*z2Quat;
var wxQuat=wQuat*x2Quat;
var wyQuat=wQuat*y2Quat;
var wzQuat=wQuat*z2Quat;

var quatMat0=1-(yyQuat+zzQuat);
var quatMat1=xyQuat+wzQuat;
var quatMat2=xzQuat-wyQuat;
var quatMat4=xyQuat-wzQuat;
var quatMat5=1-(xxQuat+zzQuat);
var quatMat6=yzQuat+wxQuat;
var quatMat8=xzQuat+wyQuat;
var quatMat9=yzQuat-wxQuat;
var quatMat10=1-(xxQuat+yyQuat);



var b0=quatMat0,b1=quatMat1,b2=quatMat2;
matVar[0]=b0;
matVar[1]=b1;
matVar[2]=b2;
matVar[3]=0;
b0=quatMat4;b1=quatMat5;b2=quatMat6;
matVar[4]=b0;
matVar[5]=b1;
matVar[6]=b2;
matVar[7]=0;
b0=quatMat8;b1=quatMat9;b2=quatMat10;
matVar[8]=b0;
matVar[9]=b1;
matVar[10]=b2;
matVar[11]=0;
matVar[12]=0;
matVar[13]=0;
matVar[14]=0;
matVar[15]=1;
}};



var setNextValAndDetectChange=function setNextValAndDetectChange(name,tmpVarName){
return(
'  if (!didChange) {\n'+
'    var prevVal = result.'+name+';\n'+
'    result.'+name+' = '+tmpVarName+';\n'+
'    didChange = didChange  || ('+tmpVarName+' !== prevVal);\n'+
'  } else {\n'+
'    result.'+name+' = '+tmpVarName+';\n'+
'  }\n');

};

var computeNextValLinear=function computeNextValLinear(anim,from,to,tmpVarName){
var hasRoundRatio='round'in anim;
var roundRatio=anim.round;
var fn='  ratio = (value - '+anim.min+') / '+(anim.max-anim.min)+';\n';
if(!anim.extrapolate){
fn+='  ratio = ratio > 1 ? 1 : (ratio < 0 ? 0 : ratio);\n';
}

var roundOpen=hasRoundRatio?'Math.round('+roundRatio+' * ':'';
var roundClose=hasRoundRatio?') / '+roundRatio:'';
fn+=
'  '+tmpVarName+' = '+
roundOpen+
'('+from+' * (1 - ratio) + '+to+' * ratio)'+
roundClose+';\n';
return fn;
};

var computeNextValLinearScalar=function computeNextValLinearScalar(anim){
return computeNextValLinear(anim,anim.from,anim.to,'nextScalarVal');
};

var computeNextValConstant=function computeNextValConstant(anim){
var constantExpression=JSON.stringify(anim.value);
return'  nextScalarVal = '+constantExpression+';\n';
};

var computeNextValStep=function computeNextValStep(anim){
return(
'  nextScalarVal = value >= '+(
anim.threshold+' ? '+anim.to+' : '+anim.from)+';\n');

};

var computeNextValIdentity=function computeNextValIdentity(anim){
return'  nextScalarVal = value;\n';
};

var operationVar=function operationVar(name){
return name+'ReuseOp';
};

var createReusableOperationVars=function createReusableOperationVars(anims){
var ret='';
for(var name in anims){
if(ShouldAllocateReusableOperationVars[name]){
ret+='var '+operationVar(name)+' = [];\n';
}
}
return ret;
};

var newlines=function newlines(statements){
return'\n'+statements.join('\n')+'\n';
};







var computeNextMatrixOperationField=function computeNextMatrixOperationField(anim,name,dimension,index){
var fieldAccess=operationVar(name)+'['+index+']';
if(anim.from[dimension]!==undefined&&anim.to[dimension]!==undefined){
return'  '+anim.from[dimension]!==anim.to[dimension]?
computeNextValLinear(anim,anim.from[dimension],anim.to[dimension],fieldAccess):
fieldAccess+' = '+anim.from[dimension]+';';
}else{
return'  '+fieldAccess+' = '+InitialOperationField[name][index]+';';
}
};

var unrolledVars=[];
for(var varIndex=0;varIndex<16;varIndex++){
unrolledVars.push('m'+varIndex);
}
var setNextMatrixAndDetectChange=function setNextMatrixAndDetectChange(orderedMatrixOperations){
var fn=[
'  var transform = result.transform !== undefined ? '+
'result.transform : (result.transform = [{ matrix: [] }]);'+
'  var transformMatrix = transform[0].matrix;'];

fn.push.apply(
fn,
inline(MatrixOps.unroll,['transformMatrix'].concat(unrolledVars)));

for(var i=0;i<orderedMatrixOperations.length;i++){
var opName=orderedMatrixOperations[i];
if(i===0){
fn.push.apply(
fn,
inline(MatrixOpsInitial[opName],['transformMatrix',operationVar(opName)]));

}else{
fn.push.apply(
fn,
inline(MatrixOps[opName],['transformMatrix',operationVar(opName)]));

}
}
fn.push.apply(
fn,
inline(MatrixOps.matrixDiffers,['didChange','transformMatrix'].concat(unrolledVars)));

return fn;
};

var InterpolateMatrix={
transformTranslate:true,
transformRotateRadians:true,
transformScale:true};


var createFunctionString=function createFunctionString(anims){


var orderedMatrixOperations=[];



var fn='return (function() {\n';
fn+=createReusableOperationVars(anims);
fn+='return function(result, value) {\n';
fn+='  var didChange = false;\n';
fn+='  var nextScalarVal;\n';
fn+='  var ratio;\n';

for(var name in anims){
var anim=anims[name];
if(anim.type==='linear'){
if(InterpolateMatrix[name]){
orderedMatrixOperations.push(name);
var setOperations=[
computeNextMatrixOperationField(anim,name,X_DIM,0),
computeNextMatrixOperationField(anim,name,Y_DIM,1),
computeNextMatrixOperationField(anim,name,Z_DIM,2)];

if(name===TRANSFORM_ROTATE_NAME){
setOperations.push(computeNextMatrixOperationField(anim,name,W_DIM,3));
}
fn+=newlines(setOperations);
}else{
fn+=computeNextValLinearScalar(anim,'nextScalarVal');
fn+=setNextValAndDetectChange(name,'nextScalarVal');
}
}else if(anim.type==='constant'){
fn+=computeNextValConstant(anim);
fn+=setNextValAndDetectChange(name,'nextScalarVal');
}else if(anim.type==='step'){
fn+=computeNextValStep(anim);
fn+=setNextValAndDetectChange(name,'nextScalarVal');
}else if(anim.type==='identity'){
fn+=computeNextValIdentity(anim);
fn+=setNextValAndDetectChange(name,'nextScalarVal');
}
}
if(orderedMatrixOperations.length){
fn+=newlines(setNextMatrixAndDetectChange(orderedMatrixOperations));
}
fn+='  return didChange;\n';
fn+='};\n';
fn+='})()';
return fn;
};






var buildStyleInterpolator=function buildStyleInterpolator(anims){

var interpolator=null;
function lazyStyleInterpolator(result,value){
if(interpolator===null){
interpolator=Function(createFunctionString(anims))();
}
return interpolator(result,value);
}
return lazyStyleInterpolator;
};

module.exports=buildStyleInterpolator;