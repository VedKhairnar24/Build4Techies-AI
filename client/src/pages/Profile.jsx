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
import { UI } from "../constants/ui";
import Spinner from "../components/Spinner";

function Profile() {

  const { user, login } =
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
    document.title = "Build4Techies AI | Profile";
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

        const res = await updateProfile(
          {
            ...formData,
            skills: formData.skills.split(",").map((skill) => skill.trim()),
          },
          user.token
        );

        if (res.user) {
          login({ ...user, user: res.user });
        }

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
      <div className="max-w-7xl mx-auto">
        <div className={UI.pageContainer}>

          <h1 className={`${UI.pageTitle} mb-8`}>
            Profile
          </h1>

          {initialLoading ? (
            <div className="flex justify-center items-center py-20 gap-2">
              <Spinner />
              <div className="text-gray-500 text-xl font-medium">Loading Profile...</div>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className={`${UI.card} w-full max-w-2xl`}
            >

            <input
              type="text"
              name="name"
              aria-label="Name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className={`${UI.input} mb-4`}
            />

            <input
              type="email"
              name="email"
              aria-label="Email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className={`${UI.input} mb-4`}
            />

            <input
              type="text"
              name="skills"
              aria-label="Skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="React, Node.js, MongoDB"
              className={`${UI.input} mb-4`}
            />

            <input
              type="text"
              name="careerGoal"
              aria-label="Career Goal"
              value={formData.careerGoal}
              onChange={handleChange}
              placeholder="Full Stack Developer"
              className={`${UI.input} mb-4`}
            />

            <button
              disabled={loading}
              className={`${UI.buttonPrimary} flex justify-center items-center gap-2 disabled:opacity-50`}
            >
              {loading ? (
                <>
                  <Spinner />
                  Saving...
                </>
              ) : (
                "Save Profile"
              )}
            </button>

          </form>
          )}

        </div>
      </div>
    </Layout>
  );
}

export default Profile;
