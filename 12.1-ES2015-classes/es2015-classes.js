//Plain old Javascript Object: POJO
let o1 = {};
let o2 = new Object(); //same thing

o1.name = "Whiskey";
o1['name'] = 'Whiskey'; //same thing

const obj = {};

Object.keys(obj) //gives keys
Object.values(obj) //gives values
Object.entries(obj) //gives both

//can loops over entries
for (let x of Object.entries(obj)){
  console.log(x);
}

//destructured version
for (let [k,v] of Object.entries(obj)){
  console.log(k, v);
}

//METHOD REVIEW: different ways to add functions as properties 
//on an object

// const add = (x,y) => x + y;
// const mult = (x,y) => x * y;
// const square = x => x * x;
// const power = (x,y) => x ** y;

// const myMath = {};
// myMath.add = add;
// myMath.mult = mult;

// const myMath = {add, mult, square, power};

// const myMath = {
//   add: function(x,y){
//     return x + y;
//   },
//   mult: function(x,y){
//     return x * y;
//   },
//   etc...
// }

const myMath = {
  add(x,y){
    return x + y;
  },
  square(x){
    return x * x;
  }
};

//------------THIS-----------------------

function getHypotenuse(a, b) {
  return Math.sqrt(a ** 2 + b ** 2);
}

function getArea(a, b) {
  return a * b / 2;
}

let triangle = {
  a: 3,
  b: 4,
  getArea: function() {
    return (this.a * this.b) / 2;
  },
  getHypotenuse: function() {
    return Math.sqrt(this.a ** 2 + this.b ** 2);
  }
};
//dont use arrow functions

//---------------CONSTRUCTOR FUNCTIONS---------------

// function Triangle(a,b){
//   this.a = a;
//   this.b = b;
//   this.getArea = function() {
//     return (this.a * this.b) / 2;
//   };
//   this.getHypotenuse = function() {
//     return Math.sqrt(this.a ** 2 + this.b ** 2);
//   };
// }

// Triangle(5 , 7) //RETURNS UNDEFINED!

//USE NEW OPERATOR
// const t1 = new Triangle(3,4);
// t1.getHypotenuse();

// const t2 = new Triangle(9,12);
// t2.getHypotenuse();

//-----------------PROTOTYPES----------------
//stores functionality that can be used across all instances

// Array.prototype.push = function(val){
//   console.log(`SO YOU WANT TO ADD ${val}??`);
//   console.log("SORRY DON'T FEEL LIKE IT!");
// };

const nums = [1,2,3];
nums.push(9); //returns SO YOU WANT TO ADD?? etc...


// function Triangle(a,b){
//   this.a = a;
//   this.b = b;
// }
// Triangle.prototype.getArea = function() {
//   return (this.a * this.b) / 2;
// };
// Triangle.prototype.getHypotenuse = this.getHypotenuse = function() {
//   return Math.sqrt(this.a ** 2 + this.b ** 2);
// };

// const tri1 = new Triangle(3,4);
// tri1.getHypotenuse(); //5
// const tri2 = new Triangle(9,12);
// tri2.getHypotenuse(); //15

//---------------------CLASSES--------------------

//classes are a 'blueprint' of functionality

class Triangle{
  constructor(a,b,c){ //accomplishes same thing as below commented stuff
    for (let side of [a,b,c]){
      if(!Number.isFinite(side) || side <= 0){
        throw new Error('Sides must be positive numbers!');
      }
    }
    // if(!Number.isFinite(a) || a <= 0){
    //   throw new Error('Sides must be positive numbers!');
    // }
    // if(!Number.isFinite(b) || b <= 0){
    //   throw new Error('Sides must be positive numbers!');
    // }
    // if(!Number.isFinite(c) || c <= 0){
    //   throw new Error('Sides must be positive numbers!');
    // }
    this.a = a;
    this.b = b;
    this.c = c;
  }
  greet() { //adds greet function to prototypes for Triangle
    console.log('HELLO FROM TRIANGLE!!!');
  }
  display(){
    return `Triangle with sides of ${this.a} and ${this.b} and ${this.c}`;
  }
  getArea(){
    const { a, b, c } = this;
    const s = (a + b + c) / 2;
    return Math.sqrt(s * (s - a) * (s - b) * (s - c));
  }
  isBig(){
    return this.getArea() > 50;
  }
}

// const firstTri = new Triangle(); //create new Triangle object that has access to above methods
// firstTri.a = 3;
// firstTri.b = 4;

// const secondTri = new Triangle();
// secondTri.a = 9;
// secondTri.b = 12;

class RightTriangle extends Triangle{
  constructor(a,b,c){ 
    if (a * a + b * b !== c * c) {
      throw new Error('Invalid C side for right triangle!');
    }
    super(a,b,c); //calls constructer from Triangle
    this.hypot = c; //add on another property
  }
  isRightTriangle() {
    return true;
  }
  display(){
    return "Right " + super.display()
    // console.log(`Right Triangle with sides of ${this.a} and ${this.b} and ${this.c}`);
  }
}
