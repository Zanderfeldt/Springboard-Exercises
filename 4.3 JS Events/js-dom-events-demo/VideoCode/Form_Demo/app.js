const form = document.querySelector('#logo-form');
const brandInput = document.querySelector('input[name="brandname"]');
const colorInput = document.querySelector('input[name="color"]');
const sizeInput = document.querySelector('input[name="fontsize"]');
const resultSection = document.querySelector('#results');

form.addEventListener('submit', function(e) {
	e.preventDefault();
	const logo = makeLogo(brandInput.value, colorInput.value, sizeInput.value);
	resultSection.appendChild(logo);
});

function makeLogo(text, color, size) {
	const newLogo = document.createElement('h2');
	newLogo.innerText = text;
	newLogo.style.color = color;
	newLogo.style.fontSize = size + 'px';
	return newLogo;
}
