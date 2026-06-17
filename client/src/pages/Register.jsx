import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  registerUser,
} from "../services/authService";
import toast from "react-hot-toast";
import handleApiError from "../utils/handleApiError";
import { UI } from "../constants/ui";
import Spinner from "../components/Spinner";

function Register() {

  const navigate =
    useNavigate();

  const [formData, setFormData] =
    useState({
      name: "",
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

        await registerUser(formData);
        toast.success("Account created successfully");
        navigate("/login");
      } catch (error) {
        console.error(error);
        handleApiError(error, "Registration failed");
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
            Create Account
          </h1>

          <input
            type="text"
            name="name"
            aria-label="Name"
            placeholder="Name"
            className={`${UI.input} mb-4`}
            onChange={handleChange}
          />

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
                Creating Account...
              </>
            ) : "Register"}
          </button>

        </form>
      </div>

    </div>
  );
}

export default Register;
