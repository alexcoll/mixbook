'use strict';





var errorMessage;

errorMessage='An argument without append, prepend, '+
'or detach methods was given to `List';













function List(){
if(arguments.length){
return List.from(arguments);
}
}

var ListPrototype;

ListPrototype=List.prototype;








List.of=function(){
return List.from.call(this,arguments);
};








List.from=function(items){
var list=new this(),length,iterator,item;

if(items&&(length=items.length)){
iterator=-1;

while(++iterator<length){
item=items[iterator];

if(item!==null&&item!==undefined){
list.append(item);
}
}
}

return list;
};





ListPrototype.head=null;





ListPrototype.tail=null;






ListPrototype.toArray=function(){
var item=this.head,
result=[];

while(item){
result.push(item);
item=item.next;
}

return result;
};








ListPrototype.prepend=function(item){
if(!item){
return false;
}

if(!item.append||!item.prepend||!item.detach){
throw new Error(errorMessage+'#prepend`.');
}

var self,head;


self=this;



head=self.head;

if(head){
return head.prepend(item);
}




item.detach();


item.list=self;


self.head=item;

return item;
};









ListPrototype.append=function(item){
if(!item){
return false;
}

if(!item.append||!item.prepend||!item.detach){
throw new Error(errorMessage+'#append`.');
}

var self,head,tail;


self=this;



tail=self.tail;

if(tail){
return tail.append(item);
}



head=self.head;

if(head){
return head.append(item);
}




item.detach();


item.list=self;


self.head=item;

return item;
};











function ListItem(){}

List.Item=ListItem;

var ListItemPrototype=ListItem.prototype;

ListItemPrototype.next=null;

ListItemPrototype.prev=null;

ListItemPrototype.list=null;






ListItemPrototype.detach=function(){

var self=this,
list=self.list,
prev=self.prev,
next=self.next;


if(!list){
return self;
}



if(list.tail===self){
list.tail=prev;
}



if(list.head===self){
list.head=next;
}



if(list.tail===list.head){
list.tail=null;
}


if(prev){
prev.next=next;
}


if(next){
next.prev=prev;
}



self.prev=self.next=self.list=null;


return self;
};








ListItemPrototype.prepend=function(item){
if(!item||!item.append||!item.prepend||!item.detach){
throw new Error(errorMessage+'Item#prepend`.');
}


var self=this,
list=self.list,
prev=self.prev;


if(!list){
return false;
}


item.detach();


if(prev){

item.prev=prev;


prev.next=item;
}


item.next=self;


item.list=list;


self.prev=item;



if(self===list.head){
list.head=item;
}



if(!list.tail){
list.tail=self;
}


return item;
};








ListItemPrototype.append=function(item){

if(!item||!item.append||!item.prepend||!item.detach){
throw new Error(errorMessage+'Item#append`.');
}


var self=this,
list=self.list,
next=self.next;


if(!list){
return false;
}


item.detach();


if(next){

item.next=next;


next.prev=item;
}


item.prev=self;


item.list=list;


self.next=item;



if(self===list.tail||!list.tail){
list.tail=item;
}


return item;
};





module.exports=List;