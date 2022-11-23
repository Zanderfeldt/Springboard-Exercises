document.addEventListener('mousemove', function(e) {
	//take the ratio of the mouse X vs. the entire window available X
	// and compute the equivalent color value from 0-255:
	const r = Math.round(e.pageX * 255 / window.innerWidth);
	// Do thee same thing for the mouse Y:
	const b = Math.round(e.pageY * 255 / window.innerHeight);
	// Make our rgb formatted color string:
	const color = `rgb(${r}, 0,${b})`;
	//Set the body backgroundColor!
	document.body.style.backgroundColor = color;
	console.log(color);
});
