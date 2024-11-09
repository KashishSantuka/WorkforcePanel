import React, { useState, useEffect } from "react";
import "./edit.css";

const Form = ({ handleClose, employeeData, editId, setEditSection}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    designation: "",
    gender: "",
    courses: [],
  });

  console.log(editId);
  useEffect(() => {
    if (editId) {
      const employeeToEdit = employeeData.find(
        (employee) => employee._id === editId
      );

      console.log("Employee to edit:", employeeToEdit);
      if (employeeToEdit) {
        setFormData((prevData) => ({
          ...prevData, 
          _id: employeeToEdit._id,
          name: employeeToEdit.name || "",
          email: employeeToEdit.email || "",
          mobileNumber: employeeToEdit.mobileNumber || "",
          designation: employeeToEdit.designation || "",
          gender: employeeToEdit.gender || "",
          courses: Array.isArray(employeeToEdit.courses)
            ? employeeToEdit.courses
            : employeeToEdit.courses
            ? [employeeToEdit.courses]
            : [],
        }));
      }
    }
  }, [editId, employeeData]);

  console.log("formmData:", formData);

const changeHandler = (e) => {
  const { name, value, type, checked } = e.target;

  if (type === "checkbox" && name === "courses") {
    setFormData((prevData) => {
      let updatedCourses;

      // If `courses` is already an array, copy it; otherwise, start with an empty array
      if (Array.isArray(prevData.courses)) {
        updatedCourses = [...prevData.courses];
      } else {
        updatedCourses = [];
      }

      if (checked) {
        // Only add if the course is not already included
        if (!updatedCourses.includes(value)) {
          updatedCourses.push(value);
        }
      } else {
        // Remove the course if it's unchecked
        updatedCourses = updatedCourses.filter((course) => course !== value);
      }

      console.log("Updated Courses after change:", updatedCourses);  // Debugging line

      // Update formData with the new courses array
      return { ...prevData, courses: updatedCourses };
    });
  } else {
    // For non-checkbox inputs
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }
};

  const handleUpdate = async (e) => {
    console.log("helllo288");
    e.preventDefault();
    console.log("helllo2")
    try {
      console.log(employeeData);
      const updatedData = formData;
      const Id = formData._id;
      console.log({updatedEmployee:updatedData})
      const response = await fetch(
        `http://localhost:3000/create/employee/edit/${Id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",  // Make sure to set headers
          },
          body: JSON.stringify(updatedData),
        }
      );
  //  console.log(hello)
   console.log(response);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Update failed");
      }

      const updatedEmployee = await response.json();
      window.location.reload();
      setEditSection(false);
      console.log("Updated Employee:", updatedEmployee);
    } catch (error) {
      console.error("Error during save:", error);
    }
  };

  return (
    <div>
      <form className="sectionStart">
        <section className="nameSection">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="username"
            name="name"
            required
            value={formData.name}
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
            value={formData.email}
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
            value={formData.mobileNumber}
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
            value={formData.designation}
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
            checked={formData.gender === "M"}
            onChange={changeHandler}
          />
          <label htmlFor="male">Male</label>
          <input
            type="radio"
            id="female"
            name="gender"
            value="F"
            checked={formData.gender === "F"}
            onChange={changeHandler}
          />
          <label htmlFor="female">Female</label>
        </section>

        <section className="courseSection">
          <label htmlFor="course">Course:</label>
          <input
            type="checkbox"
            id="mca"
            name="courses"
            value="MCA"
            checked={formData.courses.includes("MCA")}
            onChange={changeHandler}
          />
          <label htmlFor="mca">MCA</label>
          <input
            type="checkbox"
            id="bca"
            name="courses"
            value="BCA"
            checked={formData.courses.includes("BCA")}
            onChange={changeHandler}
          />
          <label htmlFor="bca">BCA</label>
          <input
            type="checkbox"
            id="bsc"
            name="courses"
            value="BSC"
            checked={formData.courses.includes("BSC")}
            onChange={changeHandler}
          />
          <label htmlFor="bsc">BSC</label>
        </section>

        {/* <section className="imgSection">
          <label htmlFor="imgUpload">Img Upload:</label>
          <input
            type="file"
            id="imgUpload"
            name="imgUpload"
            required
            onChange={changeHandler}
          />
        </section> */}

        <button onClick={handleClose}>Close</button>
        <button type="button" onClick={ handleUpdate}>Save</button>

      </form>
    </div>
  );
};

export default Form;
