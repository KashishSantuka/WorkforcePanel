import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();



const login = async (req, res, next) => {
  console.log("hello")
  const { email, password } = req.body;
  console.log(req.body);

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  try {
    const formattedEmail = email.toLowerCase();
    const findedUser = await User.findOne({ email: formattedEmail });
    if (!findedUser) {
      const error = new Error("no user found");
      error.statusCode = 404;
      throw error;
    }

    const isPassMatch = await bcrypt.compare(password, findedUser.password);

    if (!isPassMatch) {
      const error = new Error("Password is not correct");
      error.statusCode = 401;
      throw error;
    }

    const accessToken = jwt.sign(
      {
        email: formattedEmail,
        userId: findedUser._id,
      },
      process.env.Secret_Key,
      { expiresIn: "2hr" }
    );


    res.status(200).json({
        message: "Success",
        status: true,
        token: accessToken,
    })
  } catch (error) {
    const err = new Error(error.message);
    err.statusCode = 500;
    throw error;
  }
};

export default login;
