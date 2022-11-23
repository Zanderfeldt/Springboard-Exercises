console.log('Hello World!');

// functionThatDoesNotExist();
// console.log("did we make it?");

//try catch errors

try {
  functionThatDoesNotExist();
} catch(e) {
  console.log("OH NO ERROR!!!")
  console.log(e);
}
console.log("did we make it?");

//

function displayInitials(user) {
  let firstNameLetter = user.firstName[0]
  .toUpperCase();
  let lastNameLetter = user.lastName[0]
  .toUpperCase();
  return `Hello ${firstNameLetter}.${lastNameLetter}.`;
}

displayInitials({ firstName: 'Jason', lastName: "Momoa"});