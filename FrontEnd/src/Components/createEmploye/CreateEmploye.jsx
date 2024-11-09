import { useState } from "react";
import "./createEmploye.css";
import SideBar from "../dashBoard/sideBar/SideBar";

const CreateEmploye = () => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    designation: "",
    gender: "",
    course: [],
    imgUpload: null,
  });

  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const isValidPhoneNumber = (phoneNumber) => {
    return /^\d{10}$/.test(phoneNumber);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setSubmissionStatus(null);

    const formData = new FormData();
    formData.append("name", userDetails.name);
    formData.append("email", userDetails.email);
    formData.append("mobileNumber", userDetails.mobileNumber);
    formData.append("designation", userDetails.designation);
    formData.append("gender", userDetails.gender);
    formData.append("courses", JSON.stringify(userDetails.course));
    formData.append("imgUpload", userDetails.imgUpload); 

    try {
      const response = await fetch("http://localhost:3000/create/employee", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();

        if (errorData.details && Array.isArray(errorData.details)) {
          throw new Error(errorData.details.join(", "));
        }

        throw new Error(errorData.message || "Submission failed");
      }

      const data = await response.json();

      setSubmissionStatus("success");
      setErrorMessage("");
      setUserDetails({
        name: "",
        email: "",
        mobileNumber: "",
        designation: "",
        gender: "",
        course: [],
        imgUpload: null,
      });
    } catch (error) {
      console.error("Error submitting the form:", error);
      setSubmissionStatus("error");
      setErrorMessage(error.message);
    }
  };

  const changeHandler = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      setUserDetails({
        ...userDetails,
        imgUpload: files[0], // Handle file input
      });
    } else if (name === "mobileNumber") {
      if (!isValidPhoneNumber(value)) {
        console.log("Invalid mobile number");
      } else {
        console.log("Valid mobile number");
      }
      setUserDetails({
        ...userDetails,
        [name]: value,
      });
    } else if (name === "course") {
      const currentIndex = userDetails.course.indexOf(value);
      const newCourse = [...userDetails.course];

      if (currentIndex === -1) {
        newCourse.push(value);
      } else {
        newCourse.splice(currentIndex, 1);
      }
      setUserDetails({
        ...userDetails,
        course: newCourse, // Update courses
      });
    } else {
      setUserDetails({
        ...userDetails,
        [name]: value, // Update other fields
      });
    }
  };

  return (
    <div className="wrapper">
      <SideBar />
      <div className="formSection">
        <h1>Add Employee Details</h1>
        <form className="sectionStart" onSubmit={submitHandler}>
          <section className="nameSection">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="username"
              name="name"
              required
              value={userDetails.name}
              onChange={changeHandler}
            />
          </section>
          <section className="emailSection">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={userDetails.email}
              onChange={changeHandler}
            />
          </section>

          <section className="phoneSection">
            <label htmlFor="mobileNumber">Mobile Number</label>
            <input
              type="tel"
              id="mobileNumber"
              name="mobileNumber"
              required
              value={userDetails.mobileNumber}
              onChange={changeHandler}
            />
          </section>

          <section className="Designation">
            <label htmlFor="designation">Designation</label>
            <select
              id="designation"
              name="designation"
              required
              onChange={changeHandler}
              value={userDetails.designation}
            >
              <option value="" disabled>
                Select Designation
              </option>
              <option value="HR">HR</option>
              <option value="Manager">Manager</option>
              <option value="Sales">Sales</option>
            </select>
          </section>

          <section className="genderSection">
            <label htmlFor="gender">Gender:</label>
            <input
              type="radio"
              id="male"
              name="gender"
              value="M"
              checked={userDetails.gender === "M"}
              onChange={changeHandler}
            />
            <label htmlFor="male">Male</label>
            <input
              type="radio"
              id="female"
              name="gender"
              value="F"
              checked={userDetails.gender === "F"}
              onChange={changeHandler}
            />
            <label htmlFor="female">Female</label>
          </section>

          <section className="courseSection">
            <label htmlFor="course">Course:</label>
            <input
              type="checkbox"
              id="mca"
              name="course"
              value="MCA"
              checked={userDetails.course.includes("MCA")}
              onChange={changeHandler}
            />
            <label htmlFor="mca">MCA</label>
            <input
              type="checkbox"
              id="bca"
              name="course"
              value="BCA"
              checked={userDetails.course.includes("BCA")}
              onChange={changeHandler}
            />
            <label htmlFor="bca">BCA</label>
            <input
              type="checkbox"
              id="bsc"
              name="course"
              value="BSC"
              checked={userDetails.course.includes("BSC")}
              onChange={changeHandler}
            />
            <label htmlFor="bsc">BSC</label>
          </section>

          <section className="imgSection">
            <label htmlFor="imgUpload">Img Upload:</label>
            <input
              type="file"
              id="imgUpload"
              name="imgUpload"
              required
              onChange={changeHandler}
            />
          </section>

          <button type="submit">Submit</button>
          {submissionStatus === "success" && (
            <p style={{ color: "green" }}>Submitted successfully!</p>
          )}
          {submissionStatus === "error" && (
            <p style={{ color: "red" }}>Error: {errorMessage}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default CreateEmploye;
