import React from "react";
// import { Link } from 'react-router-dom';

export const Button = ({ label, formValues, setFormErrors, setIsSubmit }) => {
  const validate = (values) => {
    const errors = {};
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const regexUsername = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!values.username) {
      errors.username = "Username is required!";
    } else if (regexUsername.test(values.username)) {
      errors.username = "Username cannot contain special characters!";
    }

    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regexEmail.test(values.email)) {
      errors.email = "Please enter a valid email address.";
    }

    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    } else if (!regex.test(values.password)) {
      errors.password =
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));

    try {
      const data = await fetch("http://localhost:3000/users/register", {
        method: "POST",
        body: JSON.stringify({
          username: formValues.username,
          email: formValues.email,
          password: formValues.password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(data);

      if (!data.ok) {
        const error = new Error("HTTP error!");
        error.status = data.status;
        error.data = data;
        throw error;
      }

      const responseData = await data.json();
      console.log("User registered successfully:", responseData);

      setIsSubmit(true);
    } catch (error) {
      throw new Error(`Registration failed: ${error.message}`);
    }
  };

  return (
    <div>
      <button type="submit" onClick={handleSubmit}>
        {label}
      </button>
    </div>
  );
};
