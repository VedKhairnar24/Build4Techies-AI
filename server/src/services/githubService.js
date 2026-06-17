const axios = require("axios");
const env = require("../config/env");

const githubApi = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Authorization: `Bearer ${env.GITHUB_TOKEN}`,
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

const searchRepositories = async (query) => {
  const response = await githubApi.get(
    `/search/repositories?q=${encodeURIComponent(query)}&sort=stars&order=desc&per_page=10`
  );
  return response.data.items;
};

module.exports = {
  getGitHubProfile,
  searchRepositories,
};
