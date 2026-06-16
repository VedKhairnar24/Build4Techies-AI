import api from "../api/axios";

export const uploadResume = async (
  formData,
  token
) => {
  const response = await api.post(
    "/resume/upload",
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const analyzeResume = async (
  token
) => {
  const response = await api.post(
    "/resume/analyze",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
