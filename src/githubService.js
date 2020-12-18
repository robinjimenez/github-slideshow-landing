const GITHUB_API_BASE_URL = "https://api.github.com/users/";

const updateUser = (user) => {
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
  resultsContainer.appendChild(userProfile);
};

const updatePublicRepos = (repos) => {
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

export default class githubService {
  constructor() {
    this.user = {};
    this.status = "INIT";
  }

  fetchUserPublicRepos = (username) => {
    fetch(GITHUB_API_BASE_URL + username + "/repos")
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Not found") {
          this.status = "NO_REPOS_ERR";
          this.user.publicRepos = {};
        } else {
          this.user.publicRepos = data;
          updatePublicRepos(this.user.publicRepos);
        }
      })
      .catch((error) => {
        console.log("error " + error);
        this.status = "NETWORK_ERR";
      });
  };

  fetchUser = (username) => {
    fetch(GITHUB_API_BASE_URL + username)
      .then((response) => response.json())
      .then((data) => {
        if (data.message == "Not Found") {
          this.status = "NO_USER_ERR";
          this.user = {};
          throw new Error("No users found");
        } else {
          this.status = "OK";
          this.user = (({ name, login, location, avatar_url, followers }) => ({
            name,
            login,
            location,
            avatar: avatar_url,
            followers,
          }))(data);
          if (data.public_repos > 0) {
            this.fetchUserPublicRepos(username);
          }
        }
        updateUser(this.user);
      })
      .catch((error) => {
        console.log("error " + error.message);
        this.status = "NETWORK_ERR";
      });
  };
}