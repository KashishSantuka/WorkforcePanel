import { useState, useEffect } from "react";
import "./employeList.css";
import SideBar from "../dashBoard/sideBar/SideBar";
import EditButton from "./EdittButton";

const EmployeList = () => {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState(""); // Error message
  const [editingEmployeeId, setEditingEmployeeId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    designation: "",
    gender: "",
    courses: "",
  });

  useEffect(() => {
     const fetchEmployees = async () => {
      try {
        const response = await fetch(
          "https://workforcepanel.onrender.com/create/employee/get",
          {
            method: "GET",
            credentials: "include",  // Include cookies or credentials if necessary
          }
        );

        console.log(response);

        if (!response.ok) {
          throw new Error("Failed to fetch employee data");
        }

        const data = await response.json();
        setEmployees(data);
        console.log({ message: data });
      } catch (error) {
        setError(error.message);
      }
    };

    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `https://workforcepanel.onrender.com/create/employee/delete/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete employee");
      }

      setEmployees((prevEmployees) =>
        prevEmployees.filter((employee) => employee._id !== id)
      );
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="Wrapper">
      <div className="mainContent">
        <span className="SideBar">
          <SideBar />
        </span>
        <h1>Employee List</h1>
      </div>
      {error && <p className="error">{error}</p>}
      <div className="table">
        <table>
          <thead>
            <tr>
              <td className="tableHeader">Unique Id</td>
              <td className="tableHeader">Image</td>
              <td className="tableHeader">Name</td>
              <td className="tableHeader">Email</td>
              <td className="tableHeader">Mobile Number</td>
              <td className="tableHeader">Designation</td>
              <td className="tableHeader">Gender</td>
              <td className="tableHeader">Courses</td>
              <td className="tableHeader">Create Date</td>
              <td className="tableHeader">Action</td>
            </tr>
          </thead>
          <tbody>
            {employees[0] ? (
              employees.map((employee) => {
                return (
                  <tr key={employee._id}>
                    <td>{employee._id}</td>
                    <td>
                      <img
                        src={employee.imgUpload}
                        alt={employee.name}
                        style={{ width: "50px", height: "50px" }}
                      />
                    </td>
                    <td>{employee.name}</td>
                    <td>{employee.email}</td>
                    <td>{employee.mobileNumber}</td>
                    <td>{employee.designation}</td>
                    <td>{employee.gender}</td>
                    <td>{employee.courses}</td>
                    <td>{new Date(employee.createdAt).toLocaleString()}</td>
                    <td>
                     <EditButton employees = {employees} employeeData={employee} deleteEmployee={handleDelete} />
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="10">
                  <h4>No Data</h4>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeList;
