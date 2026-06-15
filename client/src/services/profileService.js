import api from "../api/axios";

export const getProfile = async (token) => {
  const response = await api.get(
    "/user/profile",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const updateProfile = async (
  profileData,
  token
) => {
  const response = await api.put(
    "/user/profile",
    profileData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
