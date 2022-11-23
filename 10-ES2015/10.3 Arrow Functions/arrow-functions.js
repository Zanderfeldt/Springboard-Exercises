// const add = function(x,y) {
//   return x + y;
// };

//rewrite as
const add = (x,y) => {
  return x + y;
};

//---------------------

// [2,3,6,78,99,104,23].reduce(function(max, currNum){
//   return Math.max(max, currNum);
// });

//rewrite as
[2,3,6,78,99,104,23].reduce((max, currNum) => {
  return Math.max(max, currNum);
});

// **************************
// ARROT FUNCTION "SHORTCUTS"
// **************************

// [1,2,3,4,5].forEach((n) => {
//   console.log(n * 10);
// });

//with just 1 parameter, you can leave parethesis OFF
[1,2,3,4,5].forEach(n => {
  console.log(n * 10);
});

//no parameters
const greet = () => {
  console.log('HELLO!!!');
};

//IMPLICIT RETURN: no need for return or curly braces
//only works with SINGLE EXPRESSION in body of function

[1,2,3,4,5,6].filter((num, idx) => num % 2 === 0);

const double = (n) => n * 2;
// const double = n => n * 2;

//-------------------------

[1,2,3,4,5,6,7,8].map((n) => {
  if( n % 2 === 0 ){
    return "even";
  }
  return "odd";
});

//IMPLICIT of ABOVE (needs to contain 1 expression)

[1,2,3,4,5,6,7,8].map((n) => (n % 2 === 0 ? 'even' : 'odd'));

//---------------------------------------------------

const dailyRainTotals = [[1.2,0.35,2.2], [1.7,0.6,0.1], [2.5,0.9,1.5]];

// dailyRainTotals.map((hourlyRainTotals) => {
//   return hourlyRainTotals.reduce((sum, inchesOfRain) => {
//     return sum + inchesOfRain;
//   });
// });

//IMPLICIT of ABOVE

dailyRainTotals.map((hourlyRainTotals) => 
  hourlyRainTotals.reduce((sum, inchesOfRain) => sum + inchesOfRain)
);

// **************
//  GOTCHAS
// **************

// const makeMath = (num) => {
//   return {
//     square: num*num,
//     double: num*2
//   };
// };

//IMPLICIT of ABOVE
//JS in confused by this one, it thinks '{' is beginning a code block
// const makeMath = (num) => 
//  {
//     square: num*num,
//     double: num*2
//   };

//must use parenthesis:

const makeMath = (num) => ({
    square: num*num,
    double: num*2
});
