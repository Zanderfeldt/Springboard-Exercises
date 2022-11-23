//1
//returns a set with {1,2,3,4}
{1,2,3,4}

//2
[...new Set("referee")].join("")
//returns
'ref'

//3
{[1,2,3] => true}
{[1,2,3] => false}

//hasDuplicate

const hasDuplicate = (arr) => {
  return new Set(arr).size !== arr.length;
}

//vowelCount

const isVowel = (char) => 'aeiou'.includes(char);

const vowelCount = (str) => {
  const vowelMap = new Map();

  for(let char of str){
    let lowerCase = char.toLowerCase()
    if(isVowel(lowerCase)){
      if(vowelMap.has(lowerCase)){
        vowelMap.set(lowerCase, vowelMap.get(lowerCase) + 1);
      } else {
        vowelMap.set(lowerCase, 1);
      }
    }
  }
  return vowelMap;
}