import React, { useEffect, useState } from "react";
import bcrypt from "bcryptjs";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inputStyle =
  "mt-1 p-2 block w-full rounded border-gray-300 shadow-sm focus:ring focus:outline-none";
const labelStyle = "block text-sm font-medium text-gray-700 font-poppins";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userRegistered, setUserRegistered] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (userRegistered) {
      toast.success("User registered successfully", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setTimeout(() => navigate("/login"), 5000);
    }
  }, [userRegistered]);

  const handleRegister = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.warning("Password and confirm password is not same", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    const hashedPassword = bcrypt.hashSync(password, 10);

    localStorage.setItem(email, hashedPassword);
    setUserRegistered(true);

    // Clear the form
    setEmail("");
    setPassword("");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl mb-6 font-semibold text-center font-poppins">
          Chat AI
        </h1>
        <div>
          <div className="mb-4">
            <label htmlFor="email" className={labelStyle}>
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={inputStyle}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className={labelStyle}>
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className={inputStyle}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className={labelStyle}>
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className={inputStyle}
              required
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="terms" className="flex items-center">
              <input
                type="checkbox"
                id="terms"
                name="terms"
                className="mr-2"
                required
              />
              <span className="text-sm text-gray-700">
                I agree to the <a href="#">Terms and Conditions</a>
              </span>
            </label>
          </div>
          <p className="font-poppins my-5 ">
            Already signedin? ... <a href="/login">Sign-in</a>
          </p>
          <button
            onClick={handleRegister}
            className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600"
          >
            Register
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Register;
