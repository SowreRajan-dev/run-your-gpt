import { useState } from "react";
import bcrypt from "bcryptjs";
import { useNavigate } from "react-router-dom";

const inputStyle =
  "mt-1 p-2 block w-full rounded border-gray-300 shadow-sm focus:ring focus:outline-none";
const labelStyle = "block text-sm font-medium text-gray-700 font-poppins";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const hashedPassword = localStorage.getItem(email);

    if (hashedPassword) {
      const passwordMatch = bcrypt.compareSync(password, hashedPassword);
      if (!passwordMatch) {
        return;
      }
      localStorage.setItem(
        "user",
        JSON.stringify({
          email: email,
          hashedPassword: hashedPassword,
          isSignedin: true,
        })
      );

      navigate("/chat");
    }
  };
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl mb-6 font-semibold text-center font-poppins">
          Chat AI
        </h1>
        <form>
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
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <p className="font-poppins my-5 ">
            Not Registered yet? ... <a href="/register">Sign-up</a>
          </p>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600"
            onClick={handleLogin}
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
