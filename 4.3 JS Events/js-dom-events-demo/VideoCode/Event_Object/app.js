const p = document.querySelector('p');
p.addEventListener('click', function(e) {
	console.log(e.type); //what type of event?
	console.log(e.pageX); //where on the page?
	console.log(e.target); //what element was clicked on? (try clicking the <b> tag inside the paragraph)
});

p.addEventListener('mousedown', function(e) {
	console.log(e.type);
});

p.addEventListener('mouseup', function(cactus) {
	console.log(cactus.type);
});
