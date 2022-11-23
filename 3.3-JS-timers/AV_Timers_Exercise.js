function countDown(num){
  let timer = setInterval(function(){
    num--;
    if(num <= 0){
      clearInterval(timer);
      console.log('DONE!');
    }
    else {
      console.log(num);
    }
  },1000)

}

function randomGame(){
  let num;
  let counter = 0;
  let random = setInterval(function(){
    num = Math.random();
    counter++;
    if(num > 0.75){
      clearInterval(random);
      console.log("It took " + counter + " tries.");
    }
  },1000)
}
