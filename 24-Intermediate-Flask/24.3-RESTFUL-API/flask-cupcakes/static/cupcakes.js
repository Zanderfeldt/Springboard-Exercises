const BASE_URL = "http://127.0.0.1:5000/api";

function generateCupcakeHTML(cupcake) {
  return `
  <div data-cupcake-id=${cupcake.id}>
    <li>
      ${cupcake.flavor} / ${cupcake.size} / ${cupcake.rating}
      <button class="delete-button">X</button>
    </li>
    <img class="cupcake-img" src="${cupcake.image}" alt="(no image provided)"
  </div>
  `;
}

async function showCupcakes() {
  const response = await axios.get(`${BASE_URL}/cupcakes`);

  for (let cupcake of response.data.cupcakes) {
    let newCupcake = $(generateCupcakeHTML(cupcake));
    $("#cupcakes-list").append(newCupcake);
  }
}


$("#new-cupcake-form").on("submit", async function(evt){
  evt.preventDefault();

  let flavor = $("#flavor").val();
  let rating = $("#rating").val();
  let size = $("#size").val();
  let image = $("#image").val();

  const response = await axios.post(`${BASE_URL}/cupcakes`, {
    flavor,
    size,
    rating,
    image
  });

  let newCupcake = $(generateCupcakeHTML(response.data.cupcake));
  $("#cupcakes-list").append(newCupcake);
  $("#new-cupcake-form").trigger("reset");
});

$("#cupcakes-list").on("click", ".delete-button", async function (evt) {
  evt.preventDefault();
  let $cupcake = $(evt.target).closest("div");
  let cupcakeId = $cupcake.attr("data-cupcake-id");

  await axios.delete(`${BASE_URL}/cupcakes/${cupcakeId}`);
  $cupcake.remove();
});

$(showCupcakes);