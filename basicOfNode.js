// function add(a,b){
//     return a+b;
// }

// var add=function(a,b){
//     return a+b;
// }

// var add=(a,b)=>{return a+b};

// var result=add(12,4);
// console.log(result);

// (function(){
//     console.log("automatic running.");
// })();

// function callback(){
//     console.log("running after the function");
// }
// var add=function(a,b,callback){
//     var result1=a+b;
//     console.log('result: '+result1);
//         callback();
// }
// add(3,4,callback);

//  var add=function(a,b,callback){
//     var result1=a+b;
//     console.log('result: '+result1);
//         callback();
// }
// add(2,3,function(){
//     console.log("add complete.");
// });

// var fs=require('fs');
// var os=require('os');
// var user=os.userInfo();
// console.log(user);
// console.log(user.username);
// fs.appendFile('greeting.txt','hi '+user.username+'!\n',() =>{
//     console.log("file is created");
// });

// const notes=require('./node.js');

// var age=notes.age;
// console.log(age);

var _=require('lodash');
var arr=['all',1,2,0]
var result=_.sum(arr);
console.log(result);