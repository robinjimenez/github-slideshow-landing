// UI UPDATING FUNCTIONS
 
export const updateUser = (user) => {
  const resultsContainer = document.getElementById("search-results");
  resultsContainer.innerHTML = "";
    let userProfile = document.importNode(document.getElementById("user"), true)
        .content;

    userProfile.querySelector("#user-login").innerHTML = user.login;
    user.name
        ? (userProfile.querySelector("#user-name").innerHTML = user.name)
        : userProfile.querySelector("#user-name").remove();
    user.location
        ? (userProfile.querySelector("#user-location").innerHTML = "based in " + user.location)
        : userProfile.querySelector("#user-location").remove();
    user.followers
        ? (userProfile.querySelector("#user-followers").innerHTML = "Followers: " + user.followers)
        : userProfile.querySelector("#user-followers").remove();
    if (user.public_repos < 1) userProfile.querySelector(".user-public-repos__title").innerHTML = "User has no public repositories"
      
    resultsContainer.appendChild(userProfile);
};

export const updatePublicRepos = (repos) => {
  document.getElementById("user-public-repos").innerHTML = "";
  repos.map((repo) => {
    let template = document.importNode(
      document.getElementById("public-repo"),
      true
    ).content;
    template.querySelector(".repo-details").id = "repo-" + repo.id;
    template.querySelector(".repo-name").innerHTML = repo.name;
    template.querySelector(".repo-name").href = repo.html_url;
    template.querySelector(".repo-forks").innerHTML = "Forks: " + repo.forks;
    document.getElementById("user-public-repos").appendChild(template);
  });
};

export const showError = (message) => {
    const resultsContainer = document.getElementById("search-results");
    resultsContainer.innerHTML = `<p class="github-search__message github-search__message--error">${message}</p>`
}