/**
 * Main JS file, loads githubService and slideshow controls
 */

import githubService from './githubService.js';

const github = new githubService();

document.querySelector('#search-form').addEventListener("submit", (e) => {
    e.preventDefault(true);
    github.fetchUser(document.querySelector('#username').value);
});

document.querySelector('#slideshow').addEventListener("click", (e) => {
    e.preventDefault(true);
    if (e.clientX < window.innerWidth / 2) {
        document.querySelectorAll(".slide").forEach((slide)=>{
            slide.setAttribute("data-index", parseInt(slide.dataset.index) + 1)
            if (slide.dataset.index == "4") slide.setAttribute("data-index", "0")
        })
    } else {
        document.querySelectorAll(".slide").forEach((slide)=>{
            slide.setAttribute("data-index", parseInt(slide.dataset.index) - 1)
            if (slide.dataset.index == "-1") slide.setAttribute("data-index", "3")
        })
    }
    
});