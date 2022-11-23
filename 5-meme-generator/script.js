const form = document.querySelector('#meme-generator');
const image = document.querySelector('#image');
const topText = document.querySelector('#top-text');
const botText = document.querySelector('#bot-text');
const memeSpace = document.querySelector('#meme-space');

form.addEventListener('submit', function(e){
  e.preventDefault();
  const memeContainer = document.createElement('div');
  memeContainer.setAttribute('class', 'meme-container');
  const memePic = document.createElement('img');
  const top = document.createElement('h2');
  const bot = document.createElement('h2');
  const overlay = document.createElement('div');
  overlay.innerText = 'BYE BYE';
  overlay.setAttribute('class', 'overlay');

  memePic.src = image.value;
  memeSpace.append(memeContainer);
  memeContainer.append(memePic);
  memeContainer.append(overlay);

  top.setAttribute('id' , 'top');
  bot.setAttribute('id' , 'bot')
  top.innerText = topText.value;
  bot.innerText = botText.value;
  memeContainer.append(top);
  memeContainer.append(bot);

  image.value = '';
  topText.value = '';
  botText.value = '';
})

memeSpace.addEventListener('click', function(e){
  if(e.target.className === 'overlay'){
    e.target.parentElement.remove();
  }
})

