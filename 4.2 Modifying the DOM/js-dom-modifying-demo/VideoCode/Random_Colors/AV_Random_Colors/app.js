function randomRGB() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r},${g},${b})`
}

// const h1 = document.querySelector('h1');

// setInterval(function(){
//   h1.style.color = randomRGB();
// }, 500);


const letters = document.querySelectorAll('.letter');

const intervalId = setInterval(function(){
  for(let letter of letters){
    letter.style.color = randomRGB();
  }
}, 1000)

