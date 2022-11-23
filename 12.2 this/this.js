// const cat = {
//   name: 'Blue',
//   breed: 'Scottish Fold',
//   dance: function(dance){
//     console.log(`Meow, I am ${this.name} and I like to ${dance}`);
//   }
// };

//this refers to THIS object

// const bluesDance = cat.dance; //will not return the same as cat.dance()

//what is this?

function whatIsThis() {
  console.log('this =', this);
} //this is the WINDOW --- THE GLOBAL OBJECT

const myObj = {
  func : whatIsThis,
  color : 'purple'
} //this is the OBJECT

//'this' corresponds to what is to the left of '.'

class Cat {
  constructor(name, breed){
    this.name = name;
    this.breed = breed;
  }
  dance(danceType){
    console.log('THIS IS:', this);
    console.log(`Meow, I am ${this.breed} and I like to ${danceType}`);
  }
}

// const rocket = new Cat('rocket','tabby');
// rocket.dance('tango'); //works
// const rocketDance = rocket.dance;
// rocketDance('tango'); //doesnt work

//===================CALL==========================

const cat = {
  name: 'Blue',
  breed: 'Scottish Fold',
  dance: function(dance){
    console.log('THIS IS:', this);
    console.log(`Meow, I am a ${this.breed} and I like to ${dance}`);
  }
};


const blueDance = cat.dance;
blueDance.call(cat, 'jitterbug')
//call blueDance with 'cat' as the passed variable, and 'jitterbug'
//as the dance 
//cat = this
//jitterbug = dance

const dog = {
  breed: 'Black Lab',
  name: 'Elton'
}

blueDance.call(dog, 'hip hop');
//called dance from cat obj, but now THIS is dog, and hip hop is dance

function printThis() {
  console.log('THIS ===>>>', this);
} //this = window

printThis.call(cat);
//this = cat

//===================BIND========================

//bind can 'perma-bind' a function to a context

const blue = {
  name: 'Blue',
  breed: 'Scottish Fold',
  dance: function(dance){
    console.log('THIS IS:', this);
    console.log(`Meow, I am a ${this.breed} and I like to ${dance}`);
  },
  play: function(...toys) {
    for (let toy of toys) {
      console.log(`${this.name} plays with ${toy} `);
    }
  }
};


const bDance = blue.dance;
const boundDance = bDance.bind(blue); //this permanently set to blue

const rocket = {
  name: 'Rocket',
  breed: 'Himalayan'
};

const rocketDance = blue.dance.bind(rocket);
//executes the dance but with rocket as THIS

const doggie = {
  name: 'Tyson',
  breed: 'Mini Aussie',
  dance: rocketDance //still bound to rocket
}

doggie.dance('waltz')
//still returns with rocket as THIS, since it has been bound
//========================================================
const blueDisco = blue.dance.bind(blue, 'disco');

const playsWithSocks = blue.play.bind(blue, 'left sock', 'right sock');


function applySalesTax(taxRate, price) {
  return price + price * taxRate;
}

const applyCATax = applySalesTax.bind(null, 0.0725); 
//bakes in tax rate for CA so you can just applyCATax(price)
const applyTXTax = applySalesTax.bind(null, 0.0625);
//bakes in tax rate for CA so you can just applyTXTax(price)


const bobsMembership = {
  name : 'Bob',
  total: 250,
};

const jillsMembership = {
  name: 'Jill',
  total: 899
};

function collectMonthlyFee(fee) {
  const remaining = this.total - fee;
  this.total = remaining;
  return this.name + ' remaining balance:' + remaining;
}

const collectBobsFee = collectMonthlyFee.bind(bobsMembership, 5);
const collectJillsFee = collectMonthlyFee.bind(jillsMembership, 35);

//================BINDING=CALLBACKS===================

const btnA = document.querySelector('#a');
const btnB = document.querySelector('#b');
const btnC = document.querySelector('#c');

function popUp(msg) {
  alert("Secret message is " + msg);
}

btnA.addEventListener('click', popUp.bind(null, 'Button A Says Hi'));
btnB.addEventListener('click', popUp.bind(null, 'Button B Says Hi'));
btnC.addEventListener('click', popUp.bind(null, 'Button C Says Hi'));

// btnA.addEventListener('click', function(){
//   popUp('BUTTON A SAYS HI!');
// });
// btnB.addEventListener('click', function(){
//   popUp('BUTTON B SAYS HI!');
// });
// btnC.addEventListener('click', function(){
//   popUp('BUTTON C SAYS HI!');
// });

//=================ARROW FUNCTIONS AND THIS==================
//arrow functions do not make their own 'this'

const greeter = {
  msg: 'I like chickenz',
  sayHi: () => {
    alert(this.msg);
  },
//   waitAndGreet: function(delay) {
//     setTimeout(function() {
//       alert(this.msg);
//     }.bind(this), delay);
//   }
// };
waitAndGreet: function(delay) {
  setTimeout(() => {
    alert(this.msg);
  }, delay);
}
};

greeter.waitAndGreet(2000);

