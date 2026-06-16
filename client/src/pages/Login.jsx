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
        toast.error(error.response?.data?.message || "Login failed");
      }
    };

  return (
    <div className="min-h-screen flex items-center justify-center">

      <form
        onSubmit={handleSubmit}
        className="border p-8 rounded-xl w-full max-w-md"
      >

        <h1 className="text-3xl font-bold mb-6">
          Login
        </h1>

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
          className="w-full bg-black text-white p-3 rounded"
        >
          Login
        </button>

      </form>

    </div>
  );
}

export default Login;
