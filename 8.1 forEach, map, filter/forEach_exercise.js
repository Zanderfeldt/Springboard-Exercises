//forEach
//doubleValues

function doubleValues(arr) {
  let newArr = [];
  arr.forEach(function (value) {
    newArr.push(value * 2);
  });
  return newArr;
}

//onlyEvenValues

function onlyEvenValues(arr) {
  let newArr = [];
  arr.forEach(function (value) {
    if (value % 2 === 0) {
      newArr.push(value);
    };
  });
  return newArr;
}

//showFirstAndLast

function showFirstAndLast(arr) {
  let newArr = [];
  arr.forEach(function (value) {
    newArr.push(value[0] + value[value.length - 1]);
  });
  return newArr;
}

//addKeyAndValue

function addKeyAndValue(arr, key, value) {
  arr.forEach(function (val) {
    val[key] = value
  });
  return arr;
}

//vowelCount

function vowelCount(word) {
  let wordArr = Array.from(word);
  let newObj = {};
  const vowels = 'aeiou';

  wordArr.forEach(function (letter) {
    let lowerCasedLetter = letter.toLowerCase();
    if (vowels.indexOf(lowerCasedLetter) !== -1) {
      if (newObj[lowerCasedLetter]) {
        newObj[lowerCasedLetter]++;
      } else {
        newObj[lowerCasedLetter] = 1;
      }
    }
  });
  return newObj;
}

//map
//doubleValuesWithMap

function doubleValuesWithMap(arr) {
  return arr.map(function (val) {
    return val * 2;
  });
}

//valTimesIndex

function valTimesIndex(arr) {
  return arr.map(function (val, i) {
    return val * i;
  });
}

//extractKey

function extractKey(arr, key) {
  return arr.map(function (val) {
    if (val[key]) {
      return val[key];
    }
  });
}

//extractFullName

function extractFullName(arr) {
  return arr.map(function (val) {
    return val['first'] + ' ' + val['last'];
  });
}

//filter
//filterByValue

function filterByValue(arr, key) {
  return arr.filter(function (val) {
    return val[key] !== undefined;
  });
}

//find

function find(arr, val) {
  return arr.filter(function (num) {
    return num === val;
  })[0];
}

//findInObj

function findInObj(arr, key, val) {
  return arr.filter(function (value) {
    return value[key] === val;
  })[0];
}

//removeVowels

function removeVowels(str) {
  let vowels = 'aeiou';

  return str.toLowerCase().split('').filter(function (val) {
    return vowels.indexOf(val) === -1;
  }).join('');
}

//doubleOddNumbers

function doubleOddNumbers(arr) {
  return arr.filter(function (val) {
    return val % 2 !== 0;
  })
    .map(function (num) {
      return num * 2;
    });
}