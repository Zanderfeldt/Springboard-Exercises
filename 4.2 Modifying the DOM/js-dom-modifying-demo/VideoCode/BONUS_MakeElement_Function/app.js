// makeElement('li', {class:'todo', id:'special'}, 'Wash Dishes');


function makeElement(type, attributes, text) {
  const newEl = document.createElement(type);
  for (let attr of attributes) {
    newEl.setAttribute(attr, atributes[attr])
  }
}

const h1 = makeElement('hi', {
  class: 'title',
  id: 'blahhh'
})