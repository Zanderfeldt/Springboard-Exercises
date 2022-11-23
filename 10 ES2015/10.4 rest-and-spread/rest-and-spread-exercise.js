// function filterOutOdds() {
//   var nums = Array.prototype.slice.call(arguments);
//   return nums.filter(function(num) {
//     return num % 2 === 0
//   });
// }

//1
const filterOutOdds = (...args) => 
args.filter((num) => num % 2 === 0)

//2 findMin
const findMin = (...nums) => Math.min(...nums)

//3 mergeObjects
const mergeObjects = (obj1, obj2) => ({...obj1, ...obj2})

//4 doubleAndReturnArgs
const doubleAndReturnArgs = (arr, ...args) => [...arr, ...args.map(v => v * 2)]

//5 Slice and Dice

const removeRandom = items => {
 let idx = Math.floor(Math.random() * items.length);
 return [...items.slice(0, idx), ...items.slice(idx + 1)];
}

const extend = (array1, array2) => [...array1, ...array2]

const addKeyVal = (obj, key, val) => {
  let newObj = {...obj};
  newObj[key] = val;
  return newObj;
}

const removeKey = (obj, key) => {
  let newObj = {...obj};
  delete newObj[key];
  return newObj;
}

const combine = (obj1, obj2) => ({...obj1, ...obj2})

const update = (obj, key, val) => {
  let newObj = {...obj};
  newObj[key] = val;
  return newObj;
}

