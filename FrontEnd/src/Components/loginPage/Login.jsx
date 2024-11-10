// import "./login.css";

import { useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import "./login.css";

const Login = () => {
  const initialValues = { email: "", password: "" };
  const [inputValues, setInputValues] = useState(initialValues);
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSubmit) {
      const timer = setTimeout(() => {
        navigate("/dashBoard");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isSubmit, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    console.log("hello");
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/users/login", {
        method: "POST",
        body: JSON.stringify({
          email: inputValues.email,
          password: inputValues.password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("hello");
      console.log(response);

      if (!response.ok) {
        const error = new Error("HTTP error!");
        error.status = response.status;
        error.response = response;
        throw error;
      }

      const responseData = await response.json();

      if (responseData.token) {
        localStorage.setItem("token", responseData.token);
      }

      setIsSubmit(true);
      console.log("User registered successfully:", responseData);
    } catch (error) {
      throw new Error(`Registration failed: ${error.message}`);
    }
  };

  return (
    <div className="wrapper">
      <div className="login-form">
        <h2 className="flex-container">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="InputBox">
            <label>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={inputValues.email}
              onChange={handleChange}
            />
          </div>
          <div className="InputBox">
            <label>Password</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={inputValues.password}
              onChange={handleChange}
            />
          </div>
          <div className="InputBox">
            <button type="submit">Submit</button>
          </div>
          <div className="flex-end">
            <a href="/forgotPassword">Forgot Password?</a>
            <h3>
              Don't have an account? <a href="/signup">SignUp</a>
            </h3>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
