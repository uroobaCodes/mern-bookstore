import { NavLink } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useAuthStore } from "../../store/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [message, setMessage] = useState("");
  // redirect to homepage after login successful
  const navigate = useNavigate();

  // imported from react form:
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // this login function is from our zustand store.
  const { loginUser, signInWithGoogle } = useAuthStore();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      await loginUser(data.email, data.password);
      alert("Login Successful");
      navigate("/");
    } catch (error) {
      setMessage("Please provide valid email and password");
      console.error("Login failed", error.message);
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
          <h2 className="text-xl font-semibold mb-4">Please Login</h2>
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
              Login
            </button>
          </form>
          <p className="align-baseline font-medium mt-4 text-sm">
            Don't have an account?{" "}
            <NavLink to="/register" className={`text-blue-500`}>
              {" "}
              Register here
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
export default Login;
