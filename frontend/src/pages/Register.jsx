import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const nav = useNavigate();

  const handle = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const submit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/auth/register", form);
      localStorage.setItem("token", data.token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
      nav("/");
    } catch (e) {
      setError(e.response?.data?.msg || "Registration failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 bg-[url('/public/register.jpg')]
        bg-center
        bg-cover">
      <form onSubmit={submit} className="p-6 bg-white/30 rounded-xl shadow-xl w-80 backdrop-blur-md">
        <h2 className="mb-4 text-xl">Register</h2>
        {error && <p className="text-red-600">{error}</p>}
        <input
          name="name"
          onChange={handle}
          placeholder="Name"
          className="w-full mb-2 p-2 border rounded shadow-xl drop-shadow-md"
        />
        <input
          name="email"
          onChange={handle}
          placeholder="Email"
          className="w-full mb-2 p-2 border rounded shadow-xl drop-shadow-md"
        />
        <input
          name="password"
          type="password"
          onChange={handle}
          placeholder="Password"
          className="w-full mb-4 p-2 border rounded shadow-xl drop-shadow-md"
        />
        <button
          type="submit"
          className="w-full py-2 bg-purple-600 text-white rounded shadow-xl drop-shadow-md"
        >
          Sign Up
        </button>
        <p className="mt-2 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
}
