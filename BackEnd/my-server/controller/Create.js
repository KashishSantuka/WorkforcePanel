import Employee from "../models/CreateEmployee.js";

// GET route with async/await for the database call
export const getUsers = async (req, res) => {
  try {
    const users = await Employee.find();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send("Error fetching users");
  }
};

// POST route with async/await for creating a user
export const createUsers = async (req, res) => {
  console.log("Received request body:", req.body);
  console.log("Received file:", req.file);

  const { name, email, mobileNumber, designation, gender, courses } = req.body;

  const imgUpload = req.file;

  if (!name || !email || !mobileNumber || !designation || !gender || !courses) {
    return res.status(400).json({
      error: "Missing required fields",
      required: [
        "name",
        "email",
        "mobileNumber",
        "designation",
        "gender",
        "courses",
      ],
    });
  }

  if (!imgUpload) {
    return res.status(400).send("Image upload is required");
  }

  try {
    const employeeData = new Employee({
      name,
      email,
      mobileNumber,
      designation,
      gender,
      courses: JSON.parse(courses),
      imgUpload: `/uploads/${imgUpload.filename}`,
    });

    const data = await employeeData.save();

    return res.status(201).json({
      success: true,
      message: "Employee added successfully",
      data,
    });
  } catch (err) {
    console.error("Error creating employee:", err);

    if (err.code === 11000 && err.keyPattern?.email) {
      return res.status(400).json({
        error: "Duplicate email",
        message: "An employee with this email already exists",
      });
    }

    if (err.name === "ValidationError") {
      return res.status(400).json({
        error: "Validation Error",
        message: err.message,
        details: Object.values(err.errors).map((e) => e.message),
      });
    }

    return res.status(500).json({
      error: "Server Error",
      message: "Error creating employee",
    });
  }
};

// Function to drop the mobile number index
export const dropMobileIndex = async (req, res) => {
  try {
    await Employee.collection.dropIndex("mobileNo_1");
    res.send("Index dropped successfully");
  } catch (error) {
    console.error("Error dropping index:", error);
    res.status(500).send("Error dropping index");
  }
};

export const updateEmployee = async (req, res) => {
  // console.log(hello2);
  const userId = req.params.id;
  console.log(userId);
  // console.log(hello);
  const { name, email, mobileNumber, designation, gender, courses, imgUpload } =
    req.body;
  console.log({ reqBody: req.body });
  try {
    const updatedUser = await Employee.findByIdAndUpdate(
      userId,
      { name, email, mobileNumber, designation, gender, courses, imgUpload },
      { new: true }
    );

    console.log(updatedUser);

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Employee updated successfully",
      updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await Employee.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res
      .status(200)
      .json({ message: "Employee deleted successfully", deletedUser });
  } catch (error) {
    console.error("Error deleting employee:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
