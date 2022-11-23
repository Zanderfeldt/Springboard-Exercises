// const removeButtons = document.querySelectorAll('li button');
// const form = document.querySelector('#add-friend');
// const input = document.querySelector('#first-name');
// const friendList = document.querySelector('#friend-list');

// for (let btn of removeButtons) {
// 	btn.addEventListener('click', function(e) {
// 		e.target.parentElement.remove();
// 	});
// }

// form.addEventListener('submit', function(e) {
// 	e.preventDefault();
// 	const newFriend = document.createElement('li');
// 	const removeBtn = document.createElement('button');
// 	removeBtn.innerText = 'UnFriend';
// 	removeBtn.addEventListener('click', function(e) {
// 		e.target.parentElement.remove();
// 	});
// 	newFriend.innerText = input.value;
// 	newFriend.appendChild(removeBtn);
// 	friendList.appendChild(newFriend);
// 	input.value = '';
// });

// const form = document.querySelector('#add-friend');
// const input = document.querySelector('#first-name');
// const friendList = document.querySelector('#friend-list');

// friendList.addEventListener('click', function(e) {
// 	if (e.target.tagName === 'BUTTON') {
// 		e.target.parentElement.remove();
// 	}
// 	else if (e.target.tagName === 'LI') {
// 		e.target.classList.add('best-friend');
// 		const heart = document.createElement('span');
// 		heart.innerHTML = '&hearts;';
// 		e.target.prepend(heart);
// 	}
// });

// form.addEventListener('submit', function(e) {
// 	e.preventDefault();
// 	const newFriend = document.createElement('li');
// 	const removeBtn = document.createElement('button');
// 	removeBtn.innerText = 'UnFriend';

// 	newFriend.innerText = input.value;
// 	newFriend.appendChild(removeBtn);
// 	friendList.appendChild(newFriend);
// 	input.value = '';
// });

//MINE----------------------------------------------------------
// const removeButtons = document.querySelectorAll('li button');
// const form = document.querySelector('#add-friend')
// const input = document.querySelector('#first-name')
// const friendList = document.querySelector('#friend-list');

// for(let btn of removeButtons){
// 	btn.addEventListener('click', function(e){
// 		e.target.parentElement.remove();
// 	})
// }


// form.addEventListener('submit', function(e){
// 	e.preventDefault();
// 	const newFriend = document.createElement('li');
// 	const removeBtn = document. createElement('button');
// 	removeBtn.innerText = 'UnFriend';
// 	removeBtn.addEventListener('click',function(e){
// 		e.target.parentElement.remove();
// 	})
// 	newFriend.innerText = input.value;
// 	input.value = '';
// 	friendList.append(newFriend);
// 	newFriend.append(removeBtn);
// })

//BETTER WAY: Event Listener on Parent

const form = document.querySelector('#add-friend')
const input = document.querySelector('#first-name')
const friendList = document.querySelector('#friend-list');

friendList.addEventListener('click', function(e){
	if(e.target.tagName === 'BUTTON'){
		e.target.parentElement.remove();
	}
	else if(e.target.tagName === 'LI'){
		e.target.classList.add('best-friend');
		const heart = document.createElement('span');
		heart.innerHTML = '&hearts;';
		e.target.prepend(heart);
	}
})


form.addEventListener('submit', function(e){
	e.preventDefault();
	const newFriend = document.createElement('li');
	const removeBtn = document. createElement('button');
	removeBtn.innerText = 'UnFriend';
	newFriend.innerText = input.value;
	input.value = '';
	friendList.append(newFriend);
	newFriend.append(removeBtn);
})