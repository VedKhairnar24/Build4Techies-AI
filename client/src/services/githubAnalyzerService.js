import api from "../api/axios";

export const analyzeGitHub = async (githubUsername, token) => {
  const response = await api.post(
    "/github/analyze",
    { githubUsername },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const getGitHubHistory = async (token) => {
  const response = await api.get("/github/history", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
