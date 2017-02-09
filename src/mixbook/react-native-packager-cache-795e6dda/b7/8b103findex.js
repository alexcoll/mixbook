var Emitter=require('component-emitter');

if(!Object.create){
Object.create=require('./objectcreate');
}

var SCEmitter=function SCEmitter(){
Emitter.call(this);
};

SCEmitter.prototype=Object.create(Emitter.prototype);

SCEmitter.prototype.emit=function(event){
if(event=='error'&&this.domain){



var err=arguments[1];

if(!err){
err=new Error('Uncaught, unspecified "error" event.');
}
err.domainEmitter=this;
err.domain=this.domain;
err.domainThrown=false;
this.domain.emit('error',err);
}
Emitter.prototype.emit.apply(this,arguments);
};

module.exports.SCEmitter=SCEmitter;