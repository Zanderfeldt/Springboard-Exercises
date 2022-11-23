const buttonWrong = document.querySelector("#wrong");
const buttonRight = document.querySelector("#right");

buttonWrong.addEventListener("click", function() {
  alert("clicked!");
});

// will not work!
buttonWrong.removeEventListener("click", function() {
  alert("clicked!");
});

function handleClick() {
  alert("clicked!");
}

buttonRight.addEventListener("click", handleClick);

// will work!
buttonRight.removeEventListener("click", handleClick);
