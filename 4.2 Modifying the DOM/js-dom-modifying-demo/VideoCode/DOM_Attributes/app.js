const imgs = document.querySelectorAll('img');

// for (let img of imgs) {
//   console.log(img.getAttribute('src'))
// }

const src = imgs[0].getAttribute('src');
for (let img of imgs) {
  img.setAttribute('src', src);
}

const quote = document.querySelector('blockquote');
quote.setAttribute('class', 'section-title')

const h2 = document.querySelector('h2');
h2.setAttribute('class', 'big');