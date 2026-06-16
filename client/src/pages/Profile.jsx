import {
  useContext,
  useEffect,
  useState,
} from "react";

import {
  AuthContext,
} from "../context/AuthContext";

import Layout from "../components/Layout";
import handleApiError from "../utils/handleApiError";
import {
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
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

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
      } finally {
        setInitialLoading(false);
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
      setLoading(true);

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
        handleApiError(error, "Failed to update profile");
      } finally {
        setLoading(false);
      }
    };

  return (
    <Layout>
      <div className="p-4 md:p-8">

        <h1 className="text-3xl md:text-4xl font-bold mb-8">
          Profile
        </h1>

        {initialLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-gray-500 text-xl font-medium animate-pulse">Loading Profile...</div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-2xl bg-white border rounded-xl p-4 md:p-8"
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
            disabled={loading}
            className="bg-black text-white px-6 py-3 rounded flex justify-center items-center gap-2 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Profile"}
          </button>

        </form>
        )}

      </div>
    </Layout>
  );
}

export default Profile;
