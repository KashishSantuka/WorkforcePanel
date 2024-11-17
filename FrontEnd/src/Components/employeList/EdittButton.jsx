import React, { useState } from "react";
import Modal from "react-modal";
import Form from "./Form.jsx";
import "./edit.css";

Modal.setAppElement("#root");
const EditButton = ({ employees, employeeData, deleteEmployee }) => {
  console.log("Hi i am kasish");
  console.log("Employedata:", employeeData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);

  console.log("Employedata:", employeeData);
  console.log("hello");

  const openModal = (Id) => {
    console.log("EmployeeId is:", Id);
    setEditId(Id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditId(null);
  };

  return (
    <>
      <div>
        {/* Render buttons for this particular employee */}
        <button onClick={() => openModal(employeeData._id)}>Edit</button>
        <button onClick={() => deleteEmployee(employeeData._id)}>Delete</button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Edit Employee Form"
        className="custom-modal"
        overlayClassName="custom-overlay"
      >
        <Form
          handleClose={closeModal}
          employeeData={employees}
          employee={employeeData}
          editId={editId}
          setEditSection={setIsModalOpen}
        />
      </Modal>
    </>
  );
};

export default EditButton;


// import React, { useState } from "react";
// import Modal from "react-modal";
// import Form from "./Form.jsx";
// import "./edit.css";

// Modal.setAppElement("#root");
// const EditButton = ({ children, employeeData }) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editId, setEditId] = useState(null);

//   const openModal = (employeeId) => {
//     setEditId(employeeId);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setEditId(null);
//   };

//   return (
//     <>
//       {employeeData && employeeData.length > 0 && (
//         <div>
//           {employeeData.map(
//             (employee, index) =>
//               index === 0 && (
//                 <button
//                   key={employee._id}
//                   onClick={() => openModal(employee._id)}
//                 >
//                   {children}
//                 </button>
//               )
//           )}
//         </div>
//       )}

//       <Modal
//         isOpen={isModalOpen}
//         onRequestClose={closeModal}
//         contentLabel="Edit Employee Form"
//         className="custom-modal"
//         overlayClassName="custom-overlay"
//       >
//         <Form
//           handleClose={closeModal}
//           employeeData={employeeData}
//           editId={editId}
//           setEditSection={setIsModalOpen}
//         />
//       </Modal>
//     </>
//   );
// };

// export default EditButton;


