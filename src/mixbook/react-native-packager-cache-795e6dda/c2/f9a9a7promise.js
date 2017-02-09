
function warn(error){
throw error;
}

module.exports=function(){return function(next){return function(action){return(
typeof action.then==='function'?
Promise.resolve(action).then(next,warn):
next(action));};};};