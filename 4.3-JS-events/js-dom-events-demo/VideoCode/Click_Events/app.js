// When a ____ event occurs on ____ element, do this___

function makeBody(color) {
	document.body.style.backgroundColor = color;
}

// *************************************
// OPTION 1: Inline (look in index.html)
// *************************************

// *************************************
// OPTION 2: onClick property in JS:
// *************************************
const h1 = document.querySelector('h1');
const btn = document.querySelector('#teal');
//set the onclick property to a function:
btn.onclick = function() {
	makeBody('teal');
};
//You cannot attach multiple onclick listeners this way.
//this function will run, but the previous one will not

// btn.onclick = function() {
// 	h1.style.color = 'cyan';
// };

// **************************************
// OPTION 3: addEventListener (THE BEST!)
// *************************************
const violetBtn = document.querySelector('#violet');

// Select an element and call the addEventListener method:
violetBtn.addEventListener('click', function() {
	makeBody('violet');
});

// You can add as many event listeners as you want (even of the same type)
violetBtn.addEventListener('click', function() {
	h1.style.color = 'cyan';
});
