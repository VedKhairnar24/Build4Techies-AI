import {
  useContext,
  useEffect,
  useState,
} from "react";

import {
  AuthContext,
} from "../context/AuthContext";

import Sidebar from "../components/Sidebar";

  getProfile,
  updateProfile,
} from "../services/profileService";
import toast from "react-hot-toast";

function Profile() {

  const { user } =
    useContext(AuthContext);

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      skills: "",
      careerGoal: "",
    });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile =
    async () => {

      try {

        const data =
          await getProfile(
            user.token
          );

        setFormData({
          name:
            data.user.name || "",

          email:
            data.user.email || "",

          skills:
            data.user.skills?.join(", ") ||
            "",

          careerGoal:
            data.user.careerGoal || "",
        });

      } catch (error) {
        console.error(error);
      }
    };

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

        await updateProfile(
          {
            ...formData,
            skills: formData.skills.split(",").map((skill) => skill.trim()),
          },
          user.token
        );

        toast.success("Profile updated successfully");
      } catch (error) {
        console.error(error);
        toast.error("Failed to update profile");
      }
    };

  return (
    <div className="flex">

      <Sidebar />

      <main className="flex-1 p-8 bg-gray-50 min-h-screen">

        <h1 className="text-4xl font-bold mb-8">
          Profile
        </h1>

        <form
          onSubmit={handleSubmit}
          className="max-w-2xl bg-white border rounded-xl p-8"
        >

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full border p-3 mb-4 rounded"
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full border p-3 mb-4 rounded"
          />

          <input
            type="text"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            placeholder="React, Node.js, MongoDB"
            className="w-full border p-3 mb-4 rounded"
          />

          <input
            type="text"
            name="careerGoal"
            value={formData.careerGoal}
            onChange={handleChange}
            placeholder="Full Stack Developer"
            className="w-full border p-3 mb-4 rounded"
          />

          <button
            className="bg-black text-white px-6 py-3 rounded"
          >
            Save Profile
          </button>

        </form>

      </main>

    </div>
  );
}

export default Profile;
