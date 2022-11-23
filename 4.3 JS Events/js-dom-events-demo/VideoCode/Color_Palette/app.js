const colorsSection = document.querySelector('#colors');

colorsSection.addEventListener('click', function(e) {
	document.body.style.backgroundColor = e.target.dataset.hex;
});
