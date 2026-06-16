import api from "../api/axios";

export const getJobReadiness = async (token) => {
  const response = await api.get("/job-readiness", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
