let grades = [99, 98, 76, 54, 66, 90, 81];
let sum = 0;
for (let i = 0; i <= grades.length; i++) {
  sum += grades[i];
  console.log("i", i);
  console.log("grade", grades[i]);
  console.log("sum", sum)
}
// Why is avg NaN?
let avg = sum / grades.length;


function hasEnoughFundsToBuy(price, qty, balance) {
  const subtotal = Math.round(price * qty * 100) / 100;
  console.log("subtotal:", subtotal);
  console.log("balance:", balance);
  if (subtotal <= balance) {
    return 'YOU HAVE ENOUGH MONEY!'
  }
  return 'SORRY, YOU NEED MORE MONEY TO BUY THAT'
}

// WHY AREN'T YOU WORKING??!!
hasEnoughFundsToBuy(200.3, 3, 600.9)