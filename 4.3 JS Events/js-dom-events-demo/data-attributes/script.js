const ul = document.querySelector("ul");

ul.addEventListener("click", function(event) {
  const selectedElement = event.target;
  console.log("see all data attributes", selectedElement.dataset);
  console.log(
    "see one data attribute",
    selectedElement.getAttribute("data-model")
  );
});
