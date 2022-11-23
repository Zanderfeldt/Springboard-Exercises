$('#movie-form').on('submit', function (evt){
  evt.preventDefault();

  let title = $('#title').val();
  let rating = $('#rating').val();
  let movieData = { title, rating };

  if(title.length <= 2){
    return alert('Title must be longer!')
  }
  
  if(isNaN(rating) || rating <= 0 || rating > 10){
    return alert('Rating must be a number from 1-10')
  }

  let movieHTML = createHTML(movieData);

  $('#movie-table').append(movieHTML)
})

$('body').on('click', '.rmv-btn', function (evt) {
  $(evt.target).closest('tr').remove();
})




function createHTML(data) {
  return `
  <tr>
    <td>${data.title}</td>
    <td>${data.rating}</td>
    <td>
      <button class="rmv-btn"> DELETE </button>
    </td>
  </tr>`;
}