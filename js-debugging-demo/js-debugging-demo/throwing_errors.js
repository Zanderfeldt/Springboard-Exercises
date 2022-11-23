
try {
  throw new TypeError("I don't like you doing that!")
  // undefined.pop();
} catch (err) {
  console.log("what kind of error?", err.name);
  console.log("what is the message?", err.message);
  console.log("where did it happen?", err.stack);
}

function DateError(message) {
  this.message = message;
  this.name = 'DateError';
}

function getMonthName(mo) {
  if (typeof mo !== 'number') {
    throw new DateError("Month number must be a number!")
  }
  mo = mo - 1; // Adjust month number for array index (1 = Jan, 12 = Dec)
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul',
    'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  if (months[mo]) {
    return months[mo];
  } else {
    throw new DateError("Month out of bounds")
  }
}

try {
  getMonthName('asda');
} catch (e) {
  console.log("ERROR:", e)
}


