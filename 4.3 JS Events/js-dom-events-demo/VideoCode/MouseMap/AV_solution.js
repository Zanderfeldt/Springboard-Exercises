const pos = document.addEventListener('mousemove', function(d){
  // console.log(d.pageX, d.pageY);
  const r = Math.floor(((d.pageX * 255) / window.innerWidth)+1)
  const b = Math.floor(((d.pageY * 255) / window.innerHeight)+1)
  // console.log(r,0,b);
  const color = `rgb(${r}, 0, ${b})`;
  document.body.style.backgroundColor = color;
});

// innerHeight: 927
// inenrWidth: 962

// rgb(0,0,0)

//MATH:

// d.x             x (some number)
// _____       =   ______________  
// innerWidth        255

// cross multiple to find x