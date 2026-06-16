const axios = require("axios");

const githubApi = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  },
});

const getGitHubProfile = async (username) => {
  const profile = await githubApi.get(
    `/users/${username}`
  );

  const repos = await githubApi.get(
    `/users/${username}/repos?per_page=100`
  );

  return {
    profile: profile.data,
    repos: repos.data,
  };
};

module.exports = {
  getGitHubProfile,
};
