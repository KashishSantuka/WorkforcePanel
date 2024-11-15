import User from "../models/User.js";
import bcrypt from "bcryptjs";
import joi from "joi";
import jwt from "jsonwebtoken";

function validationUser(data) {
  const userSchema = joi.object({
    username: joi.string().min(2).required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).max(12).required(),
  });

  return userSchema.validate(data, { abortEarly: false }); 
}

const register = async (req, res, next) => {
  console.log("Hello");
  console.log("Received data on /register:", req.body);

  const { error: validationError } = validationUser(req.body);
  const { username, email, password } = req.body;

  try {
    if (validationError) {
    console.error("Validation Error Details:", validationError.details); // Log full error details
    return res.status(400).json({
      message: "Validation failed",
      errors: validationError.details.map((detail) => detail.message), // Return all validation error messages
    });
  }

    const formattedName = username.toLowerCase();
    const formattedEmail = email.toLowerCase();

    const findUser = await User.findOne({ email: formattedEmail });
 
    if (findUser) {
  return res.status(400).json({
    success: false,
    message: "This Email Already Exist",
    statusCode: 400,
  });
}


    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username: formattedName,
      email: formattedEmail,
      password: hashPassword,
    });

    const savedUser = await newUser.save();
    
    const token = jwt.sign(
      { userId: savedUser._id, email: savedUser.email },
      process.env.JWT_SECRET_KEY, 
      { expiresIn: "1h" } 
    );

    console.log("JWT_SECRET_KEY:", process.env.JWT_SECRET_KEY);
    
    res.status(200).json({
      message: "user registered suucessfully",
      status: true,
      token: token
    });
  } catch (error) {
   console.error('Registration error:', error);  // This will log the actual error
    res.status(500).json({
      message: "Registration failed",
      error: error.message || error 
    })
  }
};

export default register;
