import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import API from "../api/axios";

import AuthLayout from "../layouts/AuthLayout";

import Input from "../components/ui/Input";

import Button from "../components/ui/Button";

function Register() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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
      name: formData.name.trim(),

      email: formData.email.trim(),

      password: formData.password.trim(),

      confirmPassword: formData.confirmPassword.trim(),
    };

    //
    // EMPTY CHECK
    //
    if (
      !trimmedData.name ||
      !trimmedData.email ||
      !trimmedData.password ||
      !trimmedData.confirmPassword
    ) {
      return toast.error("All fields are required");
    }

    //
    // EMAIL VALIDATION
    //
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(trimmedData.email)) {
      return toast.error("Invalid email address");
    }

    //
    // PASSWORD LENGTH
    //
    if (trimmedData.password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }

    //
    // PASSWORD MATCH
    //
    if (trimmedData.password !== trimmedData.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      setLoading(true);

      const response = await API.post("/auth/register", {
        name: trimmedData.name,

        email: trimmedData.email,

        password: trimmedData.password,
      });

      localStorage.setItem("token", response.data.data.token);

      toast.success("Registration successful");

      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Create Account" subtitle="Start building consistency">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          placeholder="Full Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />

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

        <Input
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
        />

        <Button type="submit" loading={loading}>
          Create Account
        </Button>
      </form>

      <p
        className="mt-6 text-center"
        style={{
          color: "var(--text-secondary)",
        }}
      >
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-semibold"
          style={{
            color: "var(--accent-green)",
          }}
        >
          Login
        </Link>
      </p>
    </AuthLayout>
  );
}

export default Register;
