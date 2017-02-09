var packageJson=require("./package.json");

module.exports={
request:function request(verb,url,requestBody,callback){var headers,response,statusCode,body;return regeneratorRuntime.async(function request$(_context){while(1){switch(_context.prev=_context.next){case 0:
if(typeof requestBody==="function"){
callback=requestBody;
requestBody=null;
}

headers={
"Accept":"application/json",
"Content-Type":"application/json",
"X-CodePush-Plugin-Name":packageJson.name,
"X-CodePush-Plugin-Version":packageJson.version,
"X-CodePush-SDK-Version":packageJson.dependencies["code-push"]};


if(requestBody&&typeof requestBody==="object"){
requestBody=JSON.stringify(requestBody);
}_context.prev=3;_context.next=6;return regeneratorRuntime.awrap(


fetch(url,{
method:getHttpMethodName(verb),
headers:headers,
body:requestBody}));case 6:response=_context.sent;


statusCode=response.status;_context.next=10;return regeneratorRuntime.awrap(
response.text());case 10:body=_context.sent;
callback(null,{statusCode:statusCode,body:body});_context.next=17;break;case 14:_context.prev=14;_context.t0=_context["catch"](3);

callback(_context.t0);case 17:case"end":return _context.stop();}}},null,this,[[3,14]]);}};




function getHttpMethodName(verb){


return[
"GET",
"HEAD",
"POST",
"PUT",
"DELETE",
"TRACE",
"OPTIONS",
"CONNECT",
"PATCH"][
verb];
}