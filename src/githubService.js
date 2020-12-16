const GITHUB_API_BASE_URL = "https://api.github.com/users/";

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
