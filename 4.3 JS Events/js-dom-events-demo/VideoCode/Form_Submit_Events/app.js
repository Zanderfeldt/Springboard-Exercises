const form = document.querySelector('#monkeyform');
form.addEventListener('submit', function(evt) {
	evt.preventDefault(); //stop the http request from being set (stop page reload)
	alert('YOU SUBMITTED THE FORM!!!');
});

// It's VERY WEIRD to do this, but we could prevent links from working!
document.querySelector('a').addEventListener('click', function(e) {
	e.preventDefault();
	console.log('NO GOOGLE FOR YOU!');
});

// We can even prevent default behavior on checkboxes!
document
	.querySelector('input[type="checkbox"]')
	.addEventListener('click', function(e) {
		e.preventDefault();
		console.log('NO CHECKING THAT BOX GUYYY');
	});
