try {
  undefined.pop(); //This results in an error
} catch (e) {
  // BUT WE CATCH IT!!
  console.log("OH NO ERROR!!!")
  console.log(e);
}
console.log("did we make it?");


function displayInitials(user) {
  let firstNameLetter;
  let lastNameLetter;
  try {
    firstNameLetter = user.firstName[0].toUpperCase();
    lastNameLetter = user.lastName[0].toUpperCase();
  } catch (e) {
    return "Invalid input!";
  }
  return `Hello ${firstNameLetter}.${lastNameLetter}`;
}

displayInitials({ lastName: "Momoa" })