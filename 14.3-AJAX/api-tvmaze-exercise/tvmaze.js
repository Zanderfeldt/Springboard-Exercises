"use strict";

const $showsList = $("#shows-list");
const $episodesArea = $("#episodes-area");
const $searchForm = $("#search-form");




//  Given a search term, search for tv shows that match that query.
async function getShowsByTerm(term) {
  // make request to TVMaze search shows API.
  const res = await axios.get(`https://api.tvmaze.com/search/shows?q=${term}`);
  console.log(res)
  // Returns (promise) array of show objects: [show, show, ...]
  let shows = res.data.map(function(result){
    let show = result.show;
    // Each show object should contain exactly: {id, name, summary, image}
    return { 
      id: show.id,
      name: show.name,
      summary: show.summary,
      image: show.image ? show.image.medium : 'https://tinyurl.com/tv-missing'
    }
    // (if no image URL given by API, put in a default image URL)
  });
  return shows;
}


/** Given list of shows, create markup for each and add to DOM */

function populateShows(shows) {
  $showsList.empty(); //empty show content upon another search

  for (let show of shows) { //loop over shows and create HTML for each that includes relevent data and a button to view episode list
    const $show = $(
        `<div data-show-id="${show.id}" class="Show col-md-12 col-lg-6 mb-4">
         <div class="media">
         <img class="card-img-top" src="${show.image}">
           <div class="media-body">
             <h5 class="text-primary">${show.name}</h5>
             <div><small>${show.summary}</small></div>
             <button class="btn btn-outline-light btn-sm Show-getEpisodes" id="epi-btn">
               Episodes
             </button>
           </div>
         </div>  
       </div>
      `);

    $showsList.append($show);  }
}


/** Handle search form submission: get shows from API and display.
 *    Hide episodes area (that only gets shown if they ask for episodes)
 */
async function searchForShowAndDisplay() {
  const term = $("#search-query").val(); //grab search term from input
  const shows = await getShowsByTerm(term); //invoke search of show based on term

  $episodesArea.hide(); //hide episode list
  populateShows(shows); //append shows and their data to page
}

$searchForm.on("submit", async function (evt) {
  evt.preventDefault();
  await searchForShowAndDisplay();
});


/** Given a show ID, get from API and return (promise) array of episodes:
 *      { id, name, season, number }
 */
async function getEpisodesOfShow(id) {
  const res = await axios.get(`https://api.tvmaze.com/shows/${id}/episodes`);
  
  const episodes = res.data.map(function(result){
    return {
      id : result.id,
      name : result.name,
      season : result.season,
      number : result.number
    }
  });
  return episodes;
}

//based on an array of episodes from getEpisodesOfShow, create a li item for each with relevent data
function populateEpisodes(episodes) { 
  for (let episode of episodes) {
    const $episode = $(
      `<li>${episode.name} (${episode.season}, ${episode.number})</li>`
    );

    $episodesArea.append($episode); //append new items to episode list
  }
  $episodesArea.show(); //show the episode list that was hidden earlier
}

//handle click event on episode button
$('#shows-list').on('click', "#epi-btn", async function(e){
  const id = $(e.target).closest('.Show').data('show-id'); //grab id from show that button corresponds to
  const episodes = await getEpisodesOfShow(id); //invoke the search of episodes based on that id
  populateEpisodes(episodes); //append the list of episodes grabbed from API
});