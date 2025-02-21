import Footer from "../../components/footer/Footer.jsx";
import { useState } from "react";
import { useForm } from "react-hook-form";
// import below is to log out the user when admin logs in:
import { useAuthStore } from "../../store/AuthContext.js";
import { useNavigate } from "react-router-dom";
import { useAdminAppContext } from "../../store/adminAppContext.js";

import axios from "axios";

const Admin = () => {
  const [message, setMessage] = useState("");

  // trying to log out other user when admin logs in:
  const { logoutUser } = useAuthStore();

  // use the admin global stores's login:
  const { loginAdmin, logoutAdmin } = useAdminAppContext();

  // imported from react form:
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  //   on submit

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await axios.post(
        `http://localhost:5000/api/auth/admin`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const auth = response.data;
      //   console.log(auth);
      if (auth.token) {
        loginAdmin(auth.token);
        setTimeout(() => {
          logoutAdmin();
          alert("Token has been expired, please login again!");
          navigate("/");
        }, 3600 * 1000);
      }
      alert("Admin login successful");
      await logoutUser();
      navigate("/dashboard");
    } catch (error) {
      setMessage("Please provide valid email and password");
      console.error("Login failed", error.message);
    }
  };

  return (
    <>
      <div className="font-primary h-screen w-screen grid justify-center items-center">
        <div className="w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-6 mb-4">
          <h2 className="text-xl font-semibold mb-4">Admin Dashboard Login</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Username
              </label>
              <input
                {...register("username", { required: true })}
                type="text"
                name="username"
                id="username"
                placeholder="username"
                className="appearance-none shadow border rounded w-full py-2 px-3 leading-tight focus:outline-none"
              />
            </div>
            {/* password */}
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Password
              </label>
              <input
                {...register("password", { required: true })}
                type="password"
                name="password"
                id="password"
                className="appearance-none shadow border rounded w-full py-2 px-3 leading-tight focus:outline-none"
              />
            </div>
            {/* error message for wong email and pw */}
            {message && (
              <p className="text-red-500 text-xs italic mb-3">{message}</p>
            )}
            {/* error message for wong email and pw */}
            {/* submit button */}
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded focus:outline-none">
              Login
            </button>
          </form>

          {/* google registrations */}
          {/* we dont need the google registration here */}
          {/* google registrations */}
          <p className="mt-2 text-center text-gray-500 text-xs">
            ©2025 Book Store. All rights reserved
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Admin;
