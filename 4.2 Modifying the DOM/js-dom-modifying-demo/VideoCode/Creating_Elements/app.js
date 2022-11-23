// Make a new empty LI
const newTodo = document.createElement('li');
// Make a new empty B element
const boldText = document.createElement('b');
//Add some text to the new B element:
boldText.textContent = "DON'T FORGET TO LOCK THE COOP!"
//Add a class to
newTodo.classList.add('todo');
//Add the B element as a child of the LI
newTodo.append(boldText);

//Create a second LI
const secondTodo = document.createElement('li');
secondTodo.textContent = "Order more la croix";
secondTodo.className = 'todo';

// Select the UL we want to append to
const ul = document.querySelector('ul');
//Append both new LIs at once!
ul.append(newTodo, secondTodo);

//Prepending a new LI to the UL
const thirdTodo = document.createElement('li');
thirdTodo.textContent = "Feed Cats";
ul.prepend(thirdTodo);

// Making a new image
const newImg = document.createElement('img');
newImg.classList.add('thumbnail') //adding a class (to resize the img)
// Setting the img src
newImg.setAttribute('src', 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1320&q=80')

document.body.prepend(newImg)


// Using removeChild, you need to select the parent in order to remove an element
// const removeMe = document.querySelector('#remove-me');
// ul.removeChild(removeMe)

// Using remove() is easier, though it's not supported in IE.
const removeMe = document.querySelector('#remove-me');
removeMe.remove();

const h1 = document.querySelector('h1');
h1.remove();