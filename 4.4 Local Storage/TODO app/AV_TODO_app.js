const form = document.querySelector('#add-todo');
const list = document.querySelector('#todo-list');
const input = document.querySelector('#add-to-list');
// first an empty [], then retrieve localStorage
const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
for (let i = 0; i < savedTodos.length; i++){
  let newItem = document.createElement('li');
  newItem.innerText = savedTodos[i].task;
  newItem.isCompleted = savedTodos[i].isCompleted ? true : false;
  if (newItem.isCompleted) {
    newItem.style.textDecoration = 'line-through';
  }
  list.appendChild(newItem);
}

form.addEventListener('submit', function(e){
  e.preventDefault();
  const newItem = document.createElement('li');
  const removeBtn = document.createElement('button');
  removeBtn.innerText = 'X';
  newItem.innerText = input.value;
  newItem.isCompleted = false;
  input.value = '';
  list.append(newItem);
  newItem.append(removeBtn);

  savedTodos.push({ task: newItem.innerText, isCompleted: false});
  localStorage.setItem("todos", JSON.stringify(savedTodos));

})

// list.addEventListener('click', function(e){
//   if(e.target.tagName === 'LI'){
//     e.target.style.textDecoration = 'line-through';
//   }
//   else if(e.target.tagName === 'BUTTON'){
//     e.target.parentElement.remove();
//   }
// })
list.addEventListener('click', function(e){
  let targetItem = e.target;
  if((targetItem.tagName === 'LI') & !targetItem.isCompleted){
    targetItem.style.textDecoration = 'line-through';
    targetItem.isCompleted = true;
  }
  else if (targetItem.tagName === 'BUTTON'){
    targetItem.parentElement.remove();
  }
  else {
   targetItem.style.textDecoration = 'none';
   targetItem.isCompleted = false;
  }

  for (let i = 0; i < savedTodos.length; i++){
    if (savedTodos[i].task === targetItem.innerText){
      savedTodos[i].isCompleted = !savedTodos[i].isCompleted;
      localStorage.setItem('todos', JSON.stringify(savedTodos));
    }
  }
});

