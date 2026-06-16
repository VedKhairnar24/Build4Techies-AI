import toast from "react-hot-toast";

const handleApiError = (error, defaultMessage = "Network error") => {
  toast.error(
    error.response?.data?.message || defaultMessage
  );
};

export default handleApiError;
