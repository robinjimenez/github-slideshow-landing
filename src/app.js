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
            if (slide.dataset.index == "3") slide.setAttribute("data-index", "-1")
        })
    } else {
        document.querySelectorAll(".slide").forEach((slide)=>{
            slide.setAttribute("data-index", parseInt(slide.dataset.index) - 1)
            if (slide.dataset.index == "-2") slide.setAttribute("data-index", "2")
        })
    }
    let theme = document.querySelector(".slide[data-index='0']").dataset.theme;
    document.body.dataset.theme = theme;
});


// TODO: Fix scrolling offset
var mouseX = window.innerWidth / 2;
var mouseY = window.innerHeight / 2;

document.querySelector('.slide__container').addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    const render = () => {
        document.querySelector("#slideshow-cursor").style.transform = `translate(${mouseX}px,${mouseY}px)`;
        if (mouseX < window.innerWidth / 2) {
            document.querySelector(".cursor-image").style.transform = "rotate(180deg)"
        } else {
            document.querySelector(".cursor-image").style.transform = "rotate(0)"
        }
        requestAnimationFrame(render);
    };
    requestAnimationFrame(render);
});


document.querySelector('.slide__container').addEventListener("mouseenter", (e) => {
    document.querySelector("#slideshow-cursor").style.opacity = 1;
});

document.querySelector('.slide__container').addEventListener("mouseleave", () => {
    document.querySelector("#slideshow-cursor").style.opacity = 0;
});

document.querySelector('#username').addEventListener("focusin", () => {
    document.querySelector("#search-form label").classList.add("text-input__label--small");
    document.querySelector("#username").classList.add("text-input__input--focused");
});

document.querySelector('#username').addEventListener("focusout", () => {
    if (document.querySelector('#username').value === "") {
        document.querySelector("#search-form label").classList.remove("text-input__label--small");
        document.querySelector("#username").classList.remove("text-input__input--focused");
    }
});