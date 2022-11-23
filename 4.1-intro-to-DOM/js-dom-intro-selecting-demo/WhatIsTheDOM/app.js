document.getElementById('content')
//returns <article id="content">...</article>

document.getElementById('muffin-form')
//Casing matters (capital/lowercase)

let btn = document.getElementById('submit');
//^^ returns HTMLButtonElement which are objects

document.getElementById('gallery');
//^^ HTMLElement
//-----------------------------------------------

//getElementsbyTagName: accepts a string which is the name of an element in the DOM
// it returns a list of all the elements that match the string

//document.getElementsByTagName("li");

document.getElementsByTagName('img')
//returns an HTMLCollection *which is not an array*
// cant push, pop, shift, or unshift

//-----------------------------------------------
document.getElementsByClassName('section-title')
//^^ returns HTMLCollection, if nothing matches you get an empty collection []

//to search multiple classes at once: seperate with a space
document.getElementsByClassName('section-title country')

//querySelector-----------------------
//accepts a string which is a valid CSS selector
document.querySelector("#main");  //select id
document.querySelector("h2.section-heading");  //specific selecting, h2 with class of section-heading
//only selects first match

document.querySelectorAll('body > hr')
//only selects hrs that are the direct descendants of body

document.querySelectorAll(':not(p)')
//selects everything that is not a paragraph