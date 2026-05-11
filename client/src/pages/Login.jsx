import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import API from "../api/axios";

import AuthLayout from "../layouts/AuthLayout";

import Input from "../components/ui/Input";

import Button from "../components/ui/Button";

function Login() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //
    // TRIM VALUES
    //
    const trimmedData = {
      email: formData.email.trim(),

      password: formData.password.trim(),
    };

    //
    // EMPTY CHECK
    //
    if (!trimmedData.email || !trimmedData.password) {
      return toast.error("All fields are required");
    }

    //
    // EMAIL VALIDATION
    //
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(trimmedData.email)) {
      return toast.error("Invalid email address");
    }

    try {
      setLoading(true);

      const response = await API.post("/auth/login", trimmedData);

      localStorage.setItem("token", response.data.data.token);

      toast.success("Login successful");

      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Welcome Back" subtitle="Track your consistency">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="email"
          placeholder="Email Address"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        <Input
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />

        <Button type="submit" loading={loading}>
          Login
        </Button>
      </form>

      <p
        className="mt-6 text-center"
        style={{
          color: "var(--text-secondary)",
        }}
      >
        Don’t have an account?{" "}
        <Link
          to="/register"
          className="font-semibold"
          style={{
            color: "var(--accent-green)",
          }}
        >
          Register
        </Link>
      </p>
    </AuthLayout>
  );
}

export default Login;
