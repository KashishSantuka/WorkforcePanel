import User from "../models/User.js";
import bcrypt from "bcrypt";
import joi from "joi";
import jwt from "jsonwebtoken";

function validationUser(data) {
  const userSchema = joi.object({
    username: joi.string().min(2).required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).max(12).required(),
  });

  return userSchema.validate(data);
}

const register = async (req, res, next) => {
  console.log("Received data on /register:", req.body);

  const { error: validationError } = validationUser(req.body);
  const { username, email, password } = req.body;

  try {
    if (validationError) {
      const error = new Error(validationError.details[0].message);
      error.statusCode = 400;
      throw error;
    }

    const formattedName = username.toLowerCase();
    const formattedEmail = email.toLowerCase();

    const findUser = await User.findOne({ email: formattedEmail });
    if (findUser) {
      const error = new Error("This Email Already Exist");
      error.statusCode = 400;
      throw error;
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

    res.status(200).json({
      message: "user registered suucessfully",
      status: true,
      token: token
    });
  } catch (error) {
    next(error);
  }
};

export default register;
