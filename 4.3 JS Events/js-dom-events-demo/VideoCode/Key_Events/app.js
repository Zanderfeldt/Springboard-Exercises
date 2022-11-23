// LISTENING FOR KEY EVENTS ON THE ENTIRE DOCUMENT:
// document.addEventListener('keypress', function(e) {
// 	console.log(e.key);
// });

// document.addEventListener('keydown', function(e) {
// 	console.log(e.key);
// });

// document.addEventListener('keyup', function(e) {
// 	console.log(e.key);
// });

// LISTENING FOR KEY EVENTS ON A SPECIFIC INPUT...
// keydown fires anytime a key is pressed (down, not when it's released)
document.querySelector('input').addEventListener('keydown', function(e) {
	console.log('KEY DOWN: ', e.key);
});

// keypress is fired only when a character is produced (like 'A' or '1', but not for keys like caps lock or shift)
document.querySelector('input').addEventListener('keypress', function(e) {
	console.log('KEY PRESS: ', e.key);
});
