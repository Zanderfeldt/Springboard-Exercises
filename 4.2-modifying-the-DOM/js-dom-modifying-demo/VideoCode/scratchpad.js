//Select <i> element
const i = document.querySelector('i');
//Get it's current innerText and uppercase it
const caps = i.innerText.toUpperCase() //"SEQUOIADENDRON GIGANTEUM"
//Use the new uppercase caps variable to update innerText:
i.innerText = caps;