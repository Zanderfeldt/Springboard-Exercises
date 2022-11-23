//var can be reassigned and redeclared
//let can be reassigned but NOT redeclared 
//>  //(in different scopes thet are different variables)

//Code Block: area inside curly braces
// if(true){
  
// }

// while(x<10){

// }

function dance() {
  let danceType = "Tango";
  console.log(danceType) //WILL WORK ITS INSIDE CODE BLOCK
}
// console.log(danceType) //WONT WORK ITS OUTSIDE OF CODE BLOCK

// var variables persist outside of scope, let does not

let mood = 'fantastic';
function getMood(num) {
  let mood = 'meh';
  if (num < 3) {
    let mood = 'bad :(';
  }
  return mood;
}
getMood(2) //would return 'meh'

// ------------------------------------

//const cannot be redeclared or redefined
//const is block scoped like let

const PI = 3.14;
if (true) {
  const PI = 4.56;
  console.log(PI); //will log 4.56
}
console.log(PI); //will log 3.14

//const NEEDS a variable when first declared. Cannot do 'const bird'
//by itself