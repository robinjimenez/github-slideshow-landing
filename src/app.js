/**
 * Main JS file, loads githubService and slideshow controls
 */

import githubService from './githubService.js';

const github = new githubService();

document.querySelector('#search-form').addEventListener("submit", (e) => {
    e.preventDefault(true);
    github.fetchUser(document.querySelector('#username').value);
});
