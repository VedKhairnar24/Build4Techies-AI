import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  registerUser,
} from "../services/authService";
import toast from "react-hot-toast";

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
        toast.error(error.response?.data?.message || "Registration failed");
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="min-h-screen flex items-center justify-center">

      <form
        onSubmit={handleSubmit}
        className="border p-8 rounded-xl w-full max-w-md"
      >

        <h1 className="text-3xl font-bold mb-6">
          Create Account
        </h1>

        <input
          type="text"
          name="name"
          placeholder="Name"
          className="w-full border p-3 mb-4 rounded"
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full border p-3 mb-4 rounded"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border p-3 mb-4 rounded"
          onChange={handleChange}
        />

        <button
          disabled={loading}
          className="w-full bg-black text-white p-3 rounded flex justify-center items-center gap-2 disabled:opacity-50"
        >
          {loading ? "Creating Account..." : "Register"}
        </button>

      </form>

    </div>
  );
}

export default Register;
