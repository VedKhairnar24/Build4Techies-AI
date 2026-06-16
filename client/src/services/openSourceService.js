import api from "../api/axios";

export const getRecommendations = async (token) => {
  const response = await api.get("/open-source/recommendations", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const getRecommendationHistory = async (token) => {
  const response = await api.get("/open-source/history", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
