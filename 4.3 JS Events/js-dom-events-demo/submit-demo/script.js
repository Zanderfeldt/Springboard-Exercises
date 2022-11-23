const form = document.querySelector("form");
form.addEventListener("submit", function(event) {
  event.preventDefault();
  console.log("You just submitted the form!");
  const firstNameInput = document.querySelector("input");
  console.log("You just typed in", firstNameInput.value);
  form.reset();
});
