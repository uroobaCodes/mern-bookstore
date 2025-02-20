import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FcSignature } from "react-icons/fc";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import footer from "../../assets/footer.png";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Subscribed with: ${email}`);
    setEmail(""); // Clear input after submission
  };

  return (
    <footer
      className="w-full h-64 py-1 px-3 bg-no-repeat bg-cover"
      style={{
        backgroundImage: `url(${footer})`,
        backgroundPosition: "center top 1rem",
      }}
    >
      <div className="max-w-6xl mx-auto py-2 border-b flex justify-between items-center">
        {/* Left Side - Logo & Company Name */}
        <div className="text-center mb-6 md:mb-0">
          <NavLink to="/">
            <FcSignature className="size-10 md:size-14" />
          </NavLink>
          <p className="sm:text-sm md:text-2xl text-black font-semibold mt-2">
            Cay <sup>®</sup>
          </p>
        </div>

        {/* Right Side - Contact & Social Icons */}
        <div className="flex flex-col items-center md:items-end">
          <p className="text-xs md:text-lg mb-1 text-black font-semibold">
            contact@cay.com
          </p>
          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook className="sm:text-md md:text-lg text-black hover:text-[#634f52] transition" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="sm:text-md md:text-lg text-black hover:text-[#634f52] transition" />
            </a>
          </div>
        </div>
      </div>

      {/* Center - Newsletter Signup */}
      <div className="flex flex-col justify-center items-center  text-black mt-5 mb-2 md:mb-0">
        <p className="mb-3 text-sm">
          Enter your email and sign up for our newsletter
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex items-center justify-center"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            required
            className="py-1 px-1  text-sm w-64 rounded-l-md border border-gray-600 focus:outline-none text-gray-900"
          />
          <button
            type="submit"
            className="py-1 px-1 text-sm bg-pink text-black rounded-r-md hover:bg-[#634f52] transition"
          >
            Sign Up
          </button>
        </form>
      </div>
      {/* email sign up */}
    </footer>
  );
};

export default Footer;
