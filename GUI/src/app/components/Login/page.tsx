"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Footer from "../footer/page";
import Header from "../header/page";
import Head from "../head/page";
export default function AuthPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    rememberMe: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("https://backstatzone.runasp.net/Auth/Login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          rememberMe: formData.rememberMe
        }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      localStorage.setItem("userId", data.userId);
      router.push("/");
    } catch (error) {
      console.error("Error:", error);
      alert("Login failed. Please check your credentials.");
    }
  };

  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
  
    try {
      const response = await fetch("https://backstatzone.runasp.net/Auth/Register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword
        })
      });
  
      // Check if response is JSON
      const contentType = response.headers.get("content-type");
      if (!contentType) {
        const text = await response.text();
        throw new Error(`Unexpected response: ${text}`);
      }
  
      if (!response.ok) {
        const errorMsg = "Signup failed";
        throw new Error(errorMsg);
      }
  
      const data = await response.json();
      localStorage.setItem("userId", data.userId);
      router.push("/");
    } catch (error) {
      console.error("Error:", error);
      alert(error.message);
    }
  };

  return (
    <>
      <Head />
      <Header />

      {/* Full-page background container */}
      <div className="auth-page">
        {/* Centered login/signup card */}
        <div className="auth-card">
          {/* Brand / Logo area */}
          <div className="auth-brand"></div>

          {/* Toggle Buttons */}
          <div className="auth-toggle">
            <button
              onClick={() => setIsLogin(true)}
              className={isLogin ? "active" : ""}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={!isLogin ? "active" : ""}
            >
              Sign Up
            </button>
          </div>

          {/* Login or Sign Up form */}
          {isLogin ? (
            <form onSubmit={handleLoginSubmit} className="auth-form">
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Password:</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group checkbox-group">
                <label>Remember Me:</label>
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={(e) =>
                    setFormData({ ...formData, rememberMe: e.target.checked })
                  }
                />
              </div>
              <button type="submit" className="submit-btn">
                Login
              </button>
            </form>
          ) : (
            <form onSubmit={handleSignUpSubmit} className="auth-form">
              <div className="form-group">
                <label>Username:</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Password:</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Confirm Password:</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <button type="submit" className="submit-btn">
                Sign Up
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
