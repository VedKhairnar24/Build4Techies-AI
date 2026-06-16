import api from "../api/axios";

export const generateRoadmap = async (token) => {
  const response = await api.post(
    "/roadmap/generate",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const getRoadmapHistory = async (token) => {
  const response = await api.get("/roadmap/history", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
