//create map
const myMap = new Map();

//set values
myMap.set(7, 'seven');
myMap.set('7', 'seven string');

//to retrieve
myMap.get(7)

//to put arrays in map
const empty = [];
myMap.set(empty, 'empty array!');
//myMap.get(empty);

//MAPS PRESERVE VALUE TYPES

//=========================================

const add = (x,y) => x + y;
const mult = (x,y) => x * y;

const funcCalls = new Map();
funcCalls.set(add, 0);
funcCalls.set(mult, 0);

//funcCalls.get(add)
//funcCalls.get(mult)

const bandData = [
  [3, "3 Doors Down"],
['three', 'Three Dog Night'],
['nine', 'Nine Inch Nails'],
['four', 'The Four Seasons'],
[41, 'Sum 41']
];
//turn array into map
const bandMap = new Map(bandData);

//turn map back into array
// [...bandMap]

bandMap.set(182, 'Blink-182').set('twenty', 'Matchbox Twenty');

//checking for things in map

bandMap.has(41);

//deleting

bandMap.delete('twenty');

//clearing whole map

// bandMap.clear();

//get all keys
bandMap.keys();

//get all values
bandMap.values();

//===============================================

//tells you how many objects are in map
bandMap.size 

//in forEach, val comes before key
// bandMap.forEach((val, key) => {
//   console.log(key + '=>' + val);
// });

//when iterating, each x is an array of the pairs
for(let x of bandMap){
  console.log(x);
}

//for of loops is key before val
for (let [key, value] of bandMap) {
  console.log(key, '=', value);
}

//==================SETS=======================

//sets only store UNIQUE values (of any type)
//only takes one iterable
const bannedHashTags = new Set(['nofilter', 'justsaying', 'winning', 'yolo']);


//to add values
bannedHashTags.add('bestlife').add('selfie');

//to check values
// bannedHashTags.has('yolo');

// //to delete
// bannedHashTags.delete('winning');

// //to clear
// bannedHashTags.clear();

//function that filters 'tags' that are NOT in bannedHashTags
function filterHashTags(tags){
  const bannedHashTags = new Set(['nofilter', 'justsaying', 'winning', 'yolo']);
  return tags.filter((tag) => !bannedHashTags.has(tag));
}

