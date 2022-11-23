function greet(){
  console.log("HI!! I LOVE YOU!");
}

function diss() {
  console.log("you are the worst :(")
}

let funcs = [greet, diss] //function can be in an array

//functions can be variables
const myFunc = function add(x,y){
  return x + y;
}

function giveBirth(){
  console.log("GIVING BIRTH!!!")
  return function cry(){
    return "WAAAAAHHH"
  }
}

function makeMultiplyFunc(num){
  return function mult(x){
    return num * x;
  }
}

//JS IS A SINGLE THREADED LANGUAGE!

// greet();
// alert("I AM ALERT!")
// diss();


//delay second function 'diss' by 3 secs
greet();
setTimeout(diss, 3000);


// const id = setInterval(diss, 2000);
// clearInterval(1) will stop it


function repeatThreeTimes(func){
  func();
  func();
  func();
}

// function repeat(num, func){
//   for(let i = 0; i < num; i++){
//     func();
//   }
// }

//ANONYMOUS FUNCTION

// greet();
// setTimeout(function () {
//   diss();
//   diss();
//   diss();
// }, 1000);
// greet();

setTimeout(function(){
  console.log("MEOW")
  console.log("WOOF")
  console.log("OINK")
},3000);

function doTwice(func){
  func();
  func();
}

doTwice(function(){
  console.log("STOP BOTHERING ME!");
  console.log("PLEASE GO AWAY!")
})


//ANONYMOUS FUNCTION STORED INSIDE A VARIABLE
const printOne = function () {
  console.log(1)
}

//JUST A FUNCTION WITH A NAME
// function printOne(){
//   console.log(1)
// }


//CALLBACKS EXAMPLE------------------------

function doMath(a, b, callback){
  return callback(a,b)
}
//THEN
doMath(10, 20, function(first, second){
  return first + second
})

doMath(5, 10, function(first, second){
  return first * second / second + first
})

doMath(5, 5, add) // 10
doMath(5, 5, subtract) // 0