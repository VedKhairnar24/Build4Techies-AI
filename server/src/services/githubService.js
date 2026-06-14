const axios = require("axios");

const getGitHubProfile = async (username) => {
  const profile = await axios.get(
    `https://api.github.com/users/${username}`
  );

  const repos = await axios.get(
    `https://api.github.com/users/${username}/repos?per_page=100`
  );

  return {
    profile: profile.data,
    repos: repos.data,
  };
};

module.exports = {
  getGitHubProfile,
};
