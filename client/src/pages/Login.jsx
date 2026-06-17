import { useState } from "react";

import { useNavigate } from "react-router-dom";

import {
  loginUser,
} from "../services/authService";

import {
  useContext,
} from "react";

import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import handleApiError from "../utils/handleApiError";
import { UI } from "../constants/ui";
import Spinner from "../components/Spinner";

function Login() {

  const navigate =
    useNavigate();

  const {
    login,
  } = useContext(
    AuthContext
  );

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e
  ) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit =
    async (e) => {

      e.preventDefault();
      setLoading(true);

      try {

        const response =
          await loginUser(
            formData
          );

        login(response);
        toast.success("Login successful");
        navigate("/dashboard");
      } catch (error) {
        console.error(error);
        handleApiError(error, "Login failed");
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="min-h-screen flex items-center justify-center p-4">
        <form
          onSubmit={handleSubmit}
          className={`${UI.card} w-full max-w-md`}
        >
          <h1 className={`${UI.pageTitle} mb-6 text-center`}>
            Login
          </h1>

          <input
            type="email"
            name="email"
            aria-label="Email"
            placeholder="Email"
            className={`${UI.input} mb-4`}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            aria-label="Password"
            placeholder="Password"
            className={`${UI.input} mb-4`}
            onChange={handleChange}
          />

          <button
            disabled={loading}
            className={`${UI.buttonPrimary} w-full flex justify-center items-center gap-2 disabled:opacity-50`}
          >
            {loading ? (
              <>
                <Spinner />
                Logging in...
              </>
            ) : "Login"}
          </button>

        </form>
      </div>

    </div>
  );
}

export default Login;
