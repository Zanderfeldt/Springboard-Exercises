"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

function navSubmitClick(evt) {
  console.debug('navSubmitClick', evt);
  hidePageComponents();
  $allStoriesList.show();
  $submitForm.show();
}

$('#nav-submit').on('click', navSubmitClick);

function navFavoritesClick(evt) {
  console.debug('navFavoritesClick', evt);
  hidePageComponents();
  putFavoritesOnPage();
}

$('#nav-favorites').on('click', navFavoritesClick);

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}

/** Shows my stories when clicking on 'my stories*/

function navMyStories(evt) {
  console.debug('navMyStories', evt);
  hidePageComponents();
  putUserStoriesOnPage();
  $ownStories.show();
}

$body.on('click', '#nav-my-stories', navMyStories);