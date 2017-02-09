var SCEmitter=require('sc-emitter').SCEmitter;
var SCChannel=require('sc-channel').SCChannel;
var Response=require('./response').Response;
var AuthEngine=require('./auth').AuthEngine;
var SCTransport=require('./sctransport').SCTransport;
var querystring=require('querystring');
var LinkedList=require('linked-list');
var base64=require('base-64');

var scErrors=require('sc-errors');
var InvalidArgumentsError=scErrors.InvalidArgumentsError;
var InvalidMessageError=scErrors.InvalidMessageError;
var SocketProtocolError=scErrors.SocketProtocolError;
var TimeoutError=scErrors.TimeoutError;

var isBrowser=typeof window!='undefined';


var SCSocket=function SCSocket(opts){
var self=this;

SCEmitter.call(this);

this.id=null;
this.state=this.CLOSED;
this.authState=this.PENDING;
this.signedAuthToken=null;
this.authToken=null;
this.pendingReconnect=false;
this.pendingReconnectTimeout=null;
this.pendingConnectCallback=false;

this.connectTimeout=opts.connectTimeout;
this.ackTimeout=opts.ackTimeout;
this.channelPrefix=opts.channelPrefix||null;



this.pingTimeout=this.ackTimeout;

var maxTimeout=Math.pow(2,31)-1;

var verifyDuration=function verifyDuration(propertyName){
if(self[propertyName]>maxTimeout){
throw new InvalidArgumentsError('The '+propertyName+
' value provided exceeded the maximum amount allowed');
}
};

verifyDuration('connectTimeout');
verifyDuration('ackTimeout');
verifyDuration('pingTimeout');

this._localEvents={
'connect':1,
'connectAbort':1,
'disconnect':1,
'message':1,
'error':1,
'raw':1,
'fail':1,
'kickOut':1,
'subscribe':1,
'unsubscribe':1,
'subscribeStateChange':1,
'authStateChange':1,
'authenticate':1,
'deauthenticate':1,
'removeAuthToken':1,
'subscribeRequest':1};


this.connectAttempts=0;

this._emitBuffer=new LinkedList();
this._channels={};

this.options=opts;

this._cid=1;

this.options.callIdGenerator=function(){
return self._callIdGenerator();
};

if(this.options.autoReconnect){
if(this.options.autoReconnectOptions==null){
this.options.autoReconnectOptions={};
}



var reconnectOptions=this.options.autoReconnectOptions;
if(reconnectOptions.initialDelay==null){
reconnectOptions.initialDelay=10000;
}
if(reconnectOptions.randomness==null){
reconnectOptions.randomness=10000;
}
if(reconnectOptions.multiplier==null){
reconnectOptions.multiplier=1.5;
}
if(reconnectOptions.maxDelay==null){
reconnectOptions.maxDelay=60000;
}
}

if(this.options.subscriptionRetryOptions==null){
this.options.subscriptionRetryOptions={};
}

if(this.options.authEngine){
this.auth=this.options.authEngine;
}else{
this.auth=new AuthEngine();
}

this.options.path=this.options.path.replace(/\/$/,'')+'/';

this.options.query=opts.query||{};
if(typeof this.options.query=='string'){
this.options.query=querystring.parse(this.options.query);
}

this.connect();

this._channelEmitter=new SCEmitter();

if(isBrowser){
var unloadHandler=function unloadHandler(){
self.disconnect();
};

if(global.attachEvent){
global.attachEvent('onunload',unloadHandler);
}else if(global.addEventListener){
global.addEventListener('beforeunload',unloadHandler,false);
}
}
};

SCSocket.prototype=Object.create(SCEmitter.prototype);

SCSocket.CONNECTING=SCSocket.prototype.CONNECTING=SCTransport.prototype.CONNECTING;
SCSocket.OPEN=SCSocket.prototype.OPEN=SCTransport.prototype.OPEN;
SCSocket.CLOSED=SCSocket.prototype.CLOSED=SCTransport.prototype.CLOSED;

SCSocket.AUTHENTICATED=SCSocket.prototype.AUTHENTICATED='authenticated';
SCSocket.UNAUTHENTICATED=SCSocket.prototype.UNAUTHENTICATED='unauthenticated';
SCSocket.PENDING=SCSocket.prototype.PENDING='pending';

SCSocket.ignoreStatuses=scErrors.socketProtocolIgnoreStatuses;
SCSocket.errorStatuses=scErrors.socketProtocolErrorStatuses;

SCSocket.prototype._privateEventHandlerMap={
'#publish':function publish(data){
var undecoratedChannelName=this._undecorateChannelName(data.channel);
var isSubscribed=this.isSubscribed(undecoratedChannelName,true);

if(isSubscribed){
this._channelEmitter.emit(undecoratedChannelName,data.data);
}
},
'#kickOut':function kickOut(data){
var undecoratedChannelName=this._undecorateChannelName(data.channel);
var channel=this._channels[undecoratedChannelName];
if(channel){
SCEmitter.prototype.emit.call(this,'kickOut',data.message,undecoratedChannelName);
channel.emit('kickOut',data.message,undecoratedChannelName);
this._triggerChannelUnsubscribe(channel);
}
},
'#setAuthToken':function setAuthToken(data,response){
var self=this;

if(data){
var triggerAuthenticate=function triggerAuthenticate(err){
if(err){



response.error(err);
self._onSCError(err);
}else{
self._changeToAuthenticatedState(data.token);
response.end();
}
};

this.auth.saveToken(this.options.authTokenName,data.token,{},triggerAuthenticate);
}else{
response.error(new InvalidMessageError('No token data provided by #setAuthToken event'));
}
},
'#removeAuthToken':function removeAuthToken(data,response){
var self=this;

this.auth.removeToken(this.options.authTokenName,function(err,oldToken){
if(err){

response.error(err);
self._onSCError(err);
}else{
SCEmitter.prototype.emit.call(self,'removeAuthToken',oldToken);
self._changeToUnauthenticatedState();
response.end();
}
});
},
'#disconnect':function disconnect(data){
this.transport.close(data.code,data.data);
}};


SCSocket.prototype._callIdGenerator=function(){
return this._cid++;
};

SCSocket.prototype.getState=function(){
return this.state;
};

SCSocket.prototype.getBytesReceived=function(){
return this.transport.getBytesReceived();
};

SCSocket.prototype.deauthenticate=function(callback){
var self=this;

this.auth.removeToken(this.options.authTokenName,function(err,oldToken){
self.emit('#removeAuthToken');
callback&&callback(err);
if(err){

self._onSCError(err);
}else{
SCEmitter.prototype.emit.call(self,'removeAuthToken',oldToken);
self._changeToUnauthenticatedState();
}
});
};

SCSocket.prototype.connect=SCSocket.prototype.open=function(){
var self=this;

if(this.state==this.CLOSED){
this.pendingReconnect=false;
this.pendingReconnectTimeout=null;
clearTimeout(this._reconnectTimeoutRef);

this.state=this.CONNECTING;
this._changeToPendingAuthState();

if(this.transport){
this.transport.off();
}

this.transport=new SCTransport(this.auth,this.options);

this.transport.on('open',function(status){
self.state=self.OPEN;
self._onSCOpen(status);
});

this.transport.on('error',function(err){
self._onSCError(err);
});

this.transport.on('close',function(code,data){
self.state=self.CLOSED;
self._onSCClose(code,data);
});

this.transport.on('openAbort',function(code,data){
self.state=self.CLOSED;
self._onSCClose(code,data,true);
});

this.transport.on('event',function(event,data,res){
self._onSCEvent(event,data,res);
});
}
};

SCSocket.prototype.reconnect=function(){
this.disconnect();
this.connect();
};

SCSocket.prototype.disconnect=function(code,data){
code=code||1000;

if(this.state==this.OPEN){
var packet={
code:code,
data:data};

this.transport.emit('#disconnect',packet);
this.transport.close(code,data);

}else if(this.state==this.CONNECTING){
this.transport.close(code,data);
}else{
this.pendingReconnect=false;
this.pendingReconnectTimeout=null;
clearTimeout(this._reconnectTimeoutRef);
}
};

SCSocket.prototype._changeToPendingAuthState=function(){
if(this.authState!=this.PENDING){
var oldState=this.authState;
this.authState=this.PENDING;
var stateChangeData={
oldState:oldState,
newState:this.authState};

SCEmitter.prototype.emit.call(this,'authStateChange',stateChangeData);
}
};

SCSocket.prototype._changeToUnauthenticatedState=function(){
if(this.authState!=this.UNAUTHENTICATED){
var oldState=this.authState;
this.authState=this.UNAUTHENTICATED;
this.signedAuthToken=null;
this.authToken=null;

var stateChangeData={
oldState:oldState,
newState:this.authState};

SCEmitter.prototype.emit.call(this,'authStateChange',stateChangeData);
if(oldState==this.AUTHENTICATED){
SCEmitter.prototype.emit.call(this,'deauthenticate');
}
SCEmitter.prototype.emit.call(this,'authTokenChange',this.signedAuthToken);
}
};

SCSocket.prototype._changeToAuthenticatedState=function(signedAuthToken){
this.signedAuthToken=signedAuthToken;
this.authToken=this._extractAuthTokenData(signedAuthToken);

if(this.authState!=this.AUTHENTICATED){
var oldState=this.authState;
this.authState=this.AUTHENTICATED;
var stateChangeData={
oldState:oldState,
newState:this.authState,
signedAuthToken:signedAuthToken,
authToken:this.authToken};

this.processPendingSubscriptions();

SCEmitter.prototype.emit.call(this,'authStateChange',stateChangeData);
SCEmitter.prototype.emit.call(this,'authenticate',signedAuthToken);
}
SCEmitter.prototype.emit.call(this,'authTokenChange',signedAuthToken);
};

SCSocket.prototype.decodeBase64=function(encodedString){
var decodedString;
if(typeof Buffer=='undefined'){
if(global.atob){
decodedString=global.atob(encodedString);
}else{
decodedString=base64.decode(encodedString);
}
}else{
var buffer=new Buffer(encodedString,'base64');
decodedString=buffer.toString('utf8');
}
return decodedString;
};

SCSocket.prototype.encodeBase64=function(decodedString){
var encodedString;
if(typeof Buffer=='undefined'){
if(global.btoa){
encodedString=global.btoa(decodedString);
}else{
encodedString=base64.encode(decodedString);
}
}else{
var buffer=new Buffer(decodedString,'utf8');
encodedString=buffer.toString('base64');
}
return encodedString;
};

SCSocket.prototype._extractAuthTokenData=function(signedAuthToken){
var tokenParts=(signedAuthToken||'').split('.');
var encodedTokenData=tokenParts[1];
if(encodedTokenData!=null){
var tokenData=encodedTokenData;
try{
tokenData=this.decodeBase64(tokenData);
return JSON.parse(tokenData);
}catch(e){
return tokenData;
}
}
return null;
};

SCSocket.prototype.getAuthToken=function(){
return this.authToken;
};

SCSocket.prototype.getSignedAuthToken=function(){
return this.signedAuthToken;
};


SCSocket.prototype.authenticate=function(signedAuthToken,callback){
var self=this;

this._changeToPendingAuthState();

this.emit('#authenticate',signedAuthToken,function(err,authStatus){
if(authStatus&&authStatus.authError){
authStatus.authError=scErrors.hydrateError(authStatus.authError);
}
if(err){
self._changeToUnauthenticatedState();
callback&&callback(err,authStatus);
}else{
self.auth.saveToken(self.options.authTokenName,signedAuthToken,{},function(err){
callback&&callback(err,authStatus);
if(err){
self._changeToUnauthenticatedState();
self._onSCError(err);
}else{
if(authStatus.isAuthenticated){
self._changeToAuthenticatedState(signedAuthToken);
}else{
self._changeToUnauthenticatedState();
}
}
});
}
});
};

SCSocket.prototype._tryReconnect=function(initialDelay){
var self=this;

var exponent=this.connectAttempts++;
var reconnectOptions=this.options.autoReconnectOptions;
var timeout;

if(initialDelay==null||exponent>0){
var initialTimeout=Math.round(reconnectOptions.initialDelay+(reconnectOptions.randomness||0)*Math.random());

timeout=Math.round(initialTimeout*Math.pow(reconnectOptions.multiplier,exponent));
}else{
timeout=initialDelay;
}

if(timeout>reconnectOptions.maxDelay){
timeout=reconnectOptions.maxDelay;
}

clearTimeout(this._reconnectTimeoutRef);

this.pendingReconnect=true;
this.pendingReconnectTimeout=timeout;
this._reconnectTimeoutRef=setTimeout(function(){
self.connect();
},timeout);
};

SCSocket.prototype._onSCOpen=function(status){
var self=this;

if(status){
this.id=status.id;
this.pingTimeout=status.pingTimeout;
this.transport.pingTimeout=this.pingTimeout;
if(status.isAuthenticated){
this._changeToAuthenticatedState(status.authToken);
}else{
this._changeToUnauthenticatedState();
}
}else{
this._changeToUnauthenticatedState();
}

this.connectAttempts=0;
if(this.options.autoProcessSubscriptions){
this.processPendingSubscriptions();
}else{
this.pendingConnectCallback=true;
}



SCEmitter.prototype.emit.call(this,'connect',status,function(){
self.processPendingSubscriptions();
});

this._flushEmitBuffer();
};

SCSocket.prototype._onSCError=function(err){
var self=this;



setTimeout(function(){
if(self.listeners('error').length<1){
throw err;
}else{
SCEmitter.prototype.emit.call(self,'error',err);
}
},0);
};

SCSocket.prototype._suspendSubscriptions=function(){
var channel,newState;
for(var channelName in this._channels){
if(this._channels.hasOwnProperty(channelName)){
channel=this._channels[channelName];
if(channel.state==channel.SUBSCRIBED||
channel.state==channel.PENDING){

newState=channel.PENDING;
}else{
newState=channel.UNSUBSCRIBED;
}

this._triggerChannelUnsubscribe(channel,newState);
}
}
};

SCSocket.prototype._onSCClose=function(code,data,openAbort){
var self=this;

this.id=null;

if(this.transport){
this.transport.off();
}
this.pendingReconnect=false;
this.pendingReconnectTimeout=null;
clearTimeout(this._reconnectTimeoutRef);

this._changeToPendingAuthState();
this._suspendSubscriptions();







if(this.options.autoReconnect){
if(code==4000||code==4001||code==1005){




this._tryReconnect(0);



}else if(code!=1000&&code<4500){
this._tryReconnect();
}
}

if(openAbort){
SCEmitter.prototype.emit.call(self,'connectAbort',code,data);
}else{
SCEmitter.prototype.emit.call(self,'disconnect',code,data);
}

if(!SCSocket.ignoreStatuses[code]){
var failureMessage;
if(data){
failureMessage='Socket connection failed: '+data;
}else{
failureMessage='Socket connection failed for unknown reasons';
}
var err=new SocketProtocolError(SCSocket.errorStatuses[code]||failureMessage,code);
this._onSCError(err);
}
};

SCSocket.prototype._onSCEvent=function(event,data,res){
var handler=this._privateEventHandlerMap[event];
if(handler){
handler.call(this,data,res);
}else{
SCEmitter.prototype.emit.call(this,event,data,function(){
res&&res.callback.apply(res,arguments);
});
}
};

SCSocket.prototype.parse=function(message){
return this.transport.parse(message);
};

SCSocket.prototype.stringify=function(object){
return this.transport.stringify(object);
};

SCSocket.prototype._flushEmitBuffer=function(){
var currentNode=this._emitBuffer.head;
var nextNode;

while(currentNode){
nextNode=currentNode.next;
var eventObject=currentNode.data;
currentNode.detach();
this.transport.emitRaw(eventObject);
currentNode=nextNode;
}
};

SCSocket.prototype._handleEventAckTimeout=function(eventObject,eventNode){
if(eventNode){
eventNode.detach();
}
var error=new TimeoutError("Event response for '"+eventObject.event+"' timed out");
var callback=eventObject.callback;
if(callback){
delete eventObject.callback;
callback.call(eventObject,error,eventObject);
}
};

SCSocket.prototype._emit=function(event,data,callback){
var self=this;

if(this.state==this.CLOSED){
this.connect();
}
var eventObject={
event:event,
data:data,
callback:callback};


var eventNode=new LinkedList.Item();
eventNode.data=eventObject;

eventObject.timeout=setTimeout(function(){
self._handleEventAckTimeout(eventObject,eventNode);
},this.ackTimeout);

this._emitBuffer.append(eventNode);

if(this.state==this.OPEN){
this._flushEmitBuffer();
}
};

SCSocket.prototype.send=function(data){
this.transport.send(data);
};

SCSocket.prototype.emit=function(event,data,callback){
if(this._localEvents[event]==null){
this._emit(event,data,callback);
}else{
SCEmitter.prototype.emit.call(this,event,data);
}
};

SCSocket.prototype.publish=function(channelName,data,callback){
var pubData={
channel:this._decorateChannelName(channelName),
data:data};

this.emit('#publish',pubData,callback);
};

SCSocket.prototype._triggerChannelSubscribe=function(channel,subscriptionOptions){
var channelName=channel.name;

if(channel.state!=channel.SUBSCRIBED){
var oldState=channel.state;
channel.state=channel.SUBSCRIBED;

var stateChangeData={
channel:channelName,
oldState:oldState,
newState:channel.state,
subscriptionOptions:subscriptionOptions};

channel.emit('subscribeStateChange',stateChangeData);
channel.emit('subscribe',channelName,subscriptionOptions);
SCEmitter.prototype.emit.call(this,'subscribeStateChange',stateChangeData);
SCEmitter.prototype.emit.call(this,'subscribe',channelName,subscriptionOptions);
}
};

SCSocket.prototype._triggerChannelSubscribeFail=function(err,channel,subscriptionOptions){
var channelName=channel.name;
var meetsAuthRequirements=!channel.waitForAuth||this.authState==this.AUTHENTICATED;

if(channel.state!=channel.UNSUBSCRIBED&&meetsAuthRequirements){
channel.state=channel.UNSUBSCRIBED;

channel.emit('subscribeFail',err,channelName,subscriptionOptions);
SCEmitter.prototype.emit.call(this,'subscribeFail',err,channelName,subscriptionOptions);
}
};


SCSocket.prototype._cancelPendingSubscribeCallback=function(channel){
if(channel._pendingSubscriptionCid!=null){
this.transport.cancelPendingResponse(channel._pendingSubscriptionCid);
delete channel._pendingSubscriptionCid;
}
};

SCSocket.prototype._decorateChannelName=function(channelName){
if(this.channelPrefix){
channelName=this.channelPrefix+channelName;
}
return channelName;
};

SCSocket.prototype._undecorateChannelName=function(decoratedChannelName){
if(this.channelPrefix&&decoratedChannelName.indexOf(this.channelPrefix)==0){
return decoratedChannelName.replace(this.channelPrefix,'');
}
return decoratedChannelName;
};

SCSocket.prototype._trySubscribe=function(channel){
var self=this;

var meetsAuthRequirements=!channel.waitForAuth||this.authState==this.AUTHENTICATED;


if(this.state==this.OPEN&&!this.pendingConnectCallback&&
channel._pendingSubscriptionCid==null&&meetsAuthRequirements){

var options={
noTimeout:true};


var subscriptionOptions={
channel:this._decorateChannelName(channel.name)};

if(channel.waitForAuth){
options.waitForAuth=true;
subscriptionOptions.waitForAuth=options.waitForAuth;
}
if(channel.data){
subscriptionOptions.data=channel.data;
}

channel._pendingSubscriptionCid=this.transport.emit(
'#subscribe',subscriptionOptions,options,
function(err){
delete channel._pendingSubscriptionCid;
if(err){
self._triggerChannelSubscribeFail(err,channel,subscriptionOptions);
}else{
self._triggerChannelSubscribe(channel,subscriptionOptions);
}
});

SCEmitter.prototype.emit.call(this,'subscribeRequest',channel.name,subscriptionOptions);
}
};

SCSocket.prototype.subscribe=function(channelName,options){
var channel=this._channels[channelName];

if(!channel){
channel=new SCChannel(channelName,this,options);
this._channels[channelName]=channel;
}else if(options){
channel.setOptions(options);
}

if(channel.state==channel.UNSUBSCRIBED){
channel.state=channel.PENDING;
this._trySubscribe(channel);
}

return channel;
};

SCSocket.prototype._triggerChannelUnsubscribe=function(channel,newState){
var channelName=channel.name;
var oldState=channel.state;

if(newState){
channel.state=newState;
}else{
channel.state=channel.UNSUBSCRIBED;
}
this._cancelPendingSubscribeCallback(channel);

if(oldState==channel.SUBSCRIBED){
var stateChangeData={
channel:channelName,
oldState:oldState,
newState:channel.state};

channel.emit('subscribeStateChange',stateChangeData);
channel.emit('unsubscribe',channelName);
SCEmitter.prototype.emit.call(this,'subscribeStateChange',stateChangeData);
SCEmitter.prototype.emit.call(this,'unsubscribe',channelName);
}
};

SCSocket.prototype._tryUnsubscribe=function(channel){
var self=this;

if(this.state==this.OPEN){
var options={
noTimeout:true};


this._cancelPendingSubscribeCallback(channel);





var decoratedChannelName=this._decorateChannelName(channel.name);
this.transport.emit('#unsubscribe',decoratedChannelName,options);
}
};

SCSocket.prototype.unsubscribe=function(channelName){

var channel=this._channels[channelName];

if(channel){
if(channel.state!=channel.UNSUBSCRIBED){

this._triggerChannelUnsubscribe(channel);
this._tryUnsubscribe(channel);
}
}
};

SCSocket.prototype.channel=function(channelName,options){
var currentChannel=this._channels[channelName];

if(!currentChannel){
currentChannel=new SCChannel(channelName,this,options);
this._channels[channelName]=currentChannel;
}
return currentChannel;
};

SCSocket.prototype.destroyChannel=function(channelName){
var channel=this._channels[channelName];
channel.unwatch();
channel.unsubscribe();
delete this._channels[channelName];
};

SCSocket.prototype.subscriptions=function(includePending){
var subs=[];
var channel,includeChannel;
for(var channelName in this._channels){
if(this._channels.hasOwnProperty(channelName)){
channel=this._channels[channelName];

if(includePending){
includeChannel=channel&&(channel.state==channel.SUBSCRIBED||
channel.state==channel.PENDING);
}else{
includeChannel=channel&&channel.state==channel.SUBSCRIBED;
}

if(includeChannel){
subs.push(channelName);
}
}
}
return subs;
};

SCSocket.prototype.isSubscribed=function(channelName,includePending){
var channel=this._channels[channelName];
if(includePending){
return!!channel&&(channel.state==channel.SUBSCRIBED||
channel.state==channel.PENDING);
}
return!!channel&&channel.state==channel.SUBSCRIBED;
};

SCSocket.prototype.processPendingSubscriptions=function(){
var self=this;

this.pendingConnectCallback=false;

for(var i in this._channels){
if(this._channels.hasOwnProperty(i)){
(function(channel){
if(channel.state==channel.PENDING){
self._trySubscribe(channel);
}
})(this._channels[i]);
}
}
};

SCSocket.prototype.watch=function(channelName,handler){
if(typeof handler!='function'){
throw new InvalidArgumentsError('No handler function was provided');
}
this._channelEmitter.on(channelName,handler);
};

SCSocket.prototype.unwatch=function(channelName,handler){
if(handler){
this._channelEmitter.removeListener(channelName,handler);
}else{
this._channelEmitter.removeAllListeners(channelName);
}
};

SCSocket.prototype.watchers=function(channelName){
return this._channelEmitter.listeners(channelName);
};

module.exports=SCSocket;