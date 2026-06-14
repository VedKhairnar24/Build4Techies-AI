const isValidEmail = (email) => {
  return /^\S+@\S+\.\S+$/.test(email);
};

const isValidGitHubUsername = (username) => {
  return /^[a-zA-Z0-9-]+$/.test(username);
};

module.exports = {
  isValidEmail,
  isValidGitHubUsername,
};
