import { NavLink } from "react-router-dom";
import Footer from "../../components/footer/Footer.jsx";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useAuthStore } from "../../store/AuthContext.js";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // imported from react form API
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // this register function is from our zustand store.
  const { registerUser, signInWithGoogle } = useAuthStore();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      await registerUser(data.email, data.password);
      alert("User registered successfully!");
    } catch (error) {
      setMessage("Please provide a valid email and password");
      console.error(error);
    }
  };

  // handle google sign in:
  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate("/");
    } catch (error) {
      alert("Google Sign-in failed");
      console.error("Login failed", error.message);
    }
  };

  return (
    <>
      <div className="font-primary h-screen w-screen grid justify-center items-center">
        <div className="w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-6 mb-4">
          <h2 className="text-xl font-semibold mb-4">Please Register</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Email
              </label>
              <input
                {...register("email", { required: true })}
                type="email"
                name="email"
                id="email"
                placeholder="user@example.com"
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
              Register
            </button>
          </form>
          <p className="align-baseline font-medium mt-4 text-sm">
            Already have an account?{" "}
            <NavLink to="/login" className={`text-blue-500`}>
              {" "}
              Please Login
            </NavLink>
          </p>
          {/* google registrations */}
          <div className="mt-4">
            <button
              onClick={handleGoogleSignIn}
              className="w-full flex flex-wrap gap-1 items-center justify-center bg-secondary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
            >
              <FaGoogle />
              Sign in with google
            </button>
          </div>
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
export default Register;
