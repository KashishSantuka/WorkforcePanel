import { useState, useEffect } from "react";
import "./signUp.css";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./Button";

const SignUp = () => {
  const initialValues = { username: "", password: "" , email: ""};
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  useEffect(() => {
    if (isSubmit && Object.keys(formErrors).length === 0) {
      const timer = setTimeout(() => {
        navigate("/");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isSubmit, formErrors, navigate]);

  return (
    <div className="wrapper">
      <form className="login-form" >
        <div className="flex-container">
          <h1>SignUp</h1>
        </div>
        <div className="InputBox">
          
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            required
            value={formValues.username}
            onChange={handleChange}
          />
          <p>{formErrors.username}</p>

          <label htmlFor="username">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formValues.email}
            onChange={handleChange}
          />
          <p>{formErrors.email}</p>

          <label htmlFor="password">Password:</label>
          <input
            type="password" 
            id="password"
            name="password"
            required
            value={formValues.password}
            onChange={handleChange}
          />
          <p>{formErrors.password}</p>

          <Button
            label="SignUp"
            formValues={formValues}
            formErrors={formErrors}
            setFormErrors={setFormErrors}
            setIsSubmit={setIsSubmit}
          />
        </div>
        <div className="flex-end">
          <h3>
             Have an account?
            <Link to="/">Back  to login</Link>
          </h3>
        </div>
        {isSubmit ? (
          Object.keys(formErrors).length === 0 ? (
            <div className="ui message success">
              Signed in successfully. 
            </div>
          ) : null
        ) : null}
      </form>
    </div>
  );
};

export default SignUp;
