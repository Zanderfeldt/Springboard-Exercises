
console.log("Let's get this party started!");

const $searchInput = $('#search');
const $gifArea = $('#gif-area');

//make GET request to giphy API for a gif based on search term
$('form').on('submit', async function(e) {
  e.preventDefault();

  const searchTerm = $searchInput.val();
  $searchInput.val('');

  const res = await axios.get('http://api.giphy.com/v1/gifs/search', 
    {params: {
      q: searchTerm,
      api_key: '7nhSuWEBiyvax0kYwc2589zWVTKB1dnV'
      }
    }
  );
  console.log(res);
  appendGif(res.data)
});

//append GIF to page using URL from AJAX response data
function appendGif(res) {
  const results = res.data.length;
  if (results) {
    const randomIndex = Math.floor(Math.random() * results);
    const $newContainer = $('<div>', {class : 'container'});
    const $newGif = $('<img>', {
      src : res.data[randomIndex].images.original.url,
      class : 'gif'
    });
    $gifArea.append($newContainer.append($newGif));
  }
}

$('#rmv').on('click', function() {
  $gifArea.empty();
});