"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

// handle submitting a new story
async function onNewStorySubmit(evt) {
  console.debug('onNewStorySubmit');
  evt.preventDefault();

  const author = $('#author-input').val();
  const title = $('#title-input').val();
  const url = $('#url-input').val();
  const username = currentUser.username;
  const data = {author, title, url, username};

  const story = await storyList.addStory(currentUser, data);
  const storyHTML = generateStoryMarkup(story);
  $allStoriesList.prepend(storyHTML);

  $submitForm.hide();
  $submitForm.trigger('reset');
}

$submitForm.on('submit', onNewStorySubmit);

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story, showDeleteBtn = false) {
  // console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();

  const displayStar = Boolean(currentUser);

  return $(`
      <li id="${story.storyId}">
        ${displayStar ? starIcon(story, currentUser) : ''}
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>${showDeleteBtn ? deleteBtnHTML() : ''}
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

// **************************ICONS***************************************
//make a star icon that toggles for favorite/unfavorite
function starIcon(story, user) {
  let starType;
  if (user.favorites.some(s => (s.storyId === story.storyId))) {
    starType = 'fas';
  } else {
    starType = 'far';
  }
  return `
  <span class="star">
    <i class="${starType} fa-star"></i>
  </span>`;
}

//make delete button to remove stories
function deleteBtnHTML() {
  return `
    <span class='trash'>
      <button class='trash-btn'>Delete</button>
    </span>`;
}
// **********************************************************************

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}
/** Get favorited stories, generates their HTML, and puts on page. */

function putFavoritesOnPage() {
  console.debug("putFavoritesOnPage");

  $favoritesList.empty();

  if (currentUser.favorites.length === 0){
    $favoritesList.append('<h3>No favorites have been added yet!</h3>');
  } else {  // loop through all of our favorites and generate HTML for them
    for (let story of currentUser.favorites) {
      const $story = generateStoryMarkup(story);
      $favoritesList.append($story);
    }
  }
  $favoritesList.show();
}

// Get user stories, generate HTML, and puts on page

function putUserStoriesOnPage() {
  console.debug('putUserStoriesOnPage');

  $ownStories.empty();

  if (currentUser.ownStories.length === 0){
    $ownStories.append('<h3>You have not added any stories yet!</h3>');
  } else {
    for (let s of currentUser.ownStories) {
      let $story = generateStoryMarkup(s, true);
      $ownStories.append($story);
    }
  }
  $ownStories.show();
}

//FUNCTION FOR TOGGLING FAVORITE (PRESS ON STAR)

async function toggleFavorite(evt) {
  console.debug('toggleFavorite');

  const $target = $(evt.target);
  const $closestStory = $target.closest('li');
  const storyId = $closestStory.attr('id');
  const story = storyList.stories.find(s => s.storyId === storyId);

  if ($target.hasClass('fas')) {
    await currentUser.removeFavorite(story);
    $target.closest('i').toggleClass('fas far');
  } else {
    await currentUser.addFavorite(story);
    $target.closest('i').toggleClass('fas far');
  }
}

$storiesList.on('click', '.star', toggleFavorite);

//FUNCTION FOR DELETING STORY

async function deleteStory(evt) {
  console.debug('deleteStory');

  const $closestStory = $(evt.target).closest('li');
  const storyId = $closestStory.attr('id');

  await storyList.removeStory(currentUser, storyId);

  //recreate story list
  await putUserStoriesOnPage();
}

$ownStories.on('click', '.trash-btn', deleteStory);