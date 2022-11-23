function max()

//ARGUMENTS is an array-like-object


//this doesnt work since arguments is not an array
function sum() {
  return arguments.reduce((sum, val) => {
    return sum + val;
  });
}

//this works
function sum() {
  const args = Array.from(arguments)
  return args.reduce((sum, val) => {
    return sum + val;
  });
}

//doesnt work in arrow functions
const max = () => {
  console.log(arguments);
};

const max = function () {
  return Array.from(arguments).reduce((max, currVal) =>
    currVal > max ? currVal : max
  )
};

// ************
// REST OPERATOR
// ************

//does work in arrow functions

//  function sum(...nums) {  // 1,2,3
//   console.log(nums);      // [1,2,3]
//  };

function sum(...nums) {
  return nums.reduce((sum, n) => sum + n);
};

const sumAll = (...values) => {
  return values.reduce((sum, n) => sum + n);
};

//--------------------------------------

function makeFamily(parent1, parent2, ...kids) {
  return {
    parents: [parent1, parent2],
    children: kids.length ? kids : 0
  };
}

const filterByType = (type, ...vals) => {
  return vals.filter(v => typeof v === type)
}

// ************
// SPREAD OPERATOR
// ************

//Spreads an array into individual arguments!


const nums = [4,5,88,123,0.92,34];

// Math.max(nums) NO! This will have a single argument of the entire array!

Math.max(...nums) //yes! spreads the array into individual elements/arguments

//---------------------------------------------

const palette = ['lavender berry', 'sunflower yellow', 'orchid orange'];

//make a copy

const paletteCopy = [...palette]; //spread into a new array

const paletteCopy = ['sky blue',...palette, 'grass green'];

//-----------------------------------------------

const vowels = 'aeiou'
const vowelArr = [...vowels];


//----------Spread-with-objects--------------------

const tea = {
  type : 'oolong',
  name : 'winter sprout',
  origin: 'taiwan'
};

const tea2 = {...tea}; //makes copy of above object

const teaTin = {...tea, price : 22.99}; //adds price

const newTea = {...tea, name: 'golden frost'}; //updates name property

//order matters

