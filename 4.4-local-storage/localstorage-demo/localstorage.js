//*******************************
// SETTING AND GETTING PRIMITIVES
//*******************************

const catName = 'King Rocket the III';
localStorage.setItem('catName', catName);

localStorage.getItem('catName')

//*******************************
// SETTING AND GETTING OBJECTS
//*******************************
const preferences = {
  fontSize: '18px',
  favColor: 'teal'
}

localStorage.setItem('preferences', JSON.stringify(preferences))

const { favColor } = JSON.parse(localStorage.preferences);
document.body.style.backgroundColor = favColor;