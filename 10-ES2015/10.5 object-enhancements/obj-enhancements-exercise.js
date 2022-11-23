//same keys and values 

// function createInstructor(firstName, lastName){
//   return {
//     firstName: firstName,
//     lastName: lastName
//   }
// }

const createInstructor = (firstName, lastName) => {
  return {
    firstName,
    lastName
  };
}

//Computed property names

// var favoriteNumber = 42;

// var instructor = {
//   firstName: "Colt"
// }

// instructor[favoriteNumber] = "That is my favorite!"

var favoriteNumber = 42;

var instructor = {
  firstName: "Colt",
  [favoriteNumber]: "That is my favorite!"
}

//Object Methods

// var instructor = {
//   firstName: "Colt",
//   sayHi: function(){
//     return "Hi!";
//   },
//   sayBye: function(){
//     return this.firstName + " says bye!";
//   }
// }

var instructor = {
  firstName: "Colt",
  sayHi(){
    return "Hi!";
  },
  sayBye(){
    return this.firstName + " says bye!";
  }
}

//createAnimal Function

const createAnimal = (species, verb, noise) => {
  return {
    species,
    [verb](){
      return noise;
    }  
  }
}