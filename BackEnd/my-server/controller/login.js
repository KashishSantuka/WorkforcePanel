import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const login = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(req.body);

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  }

  try {
    const formattedEmail = email.toLowerCase();
    const findUser = await User.findOne({ email: formattedEmail });

    if (!findUser) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isPassMatch = await bcrypt.compare(password, findUser.password);

    if (!isPassMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const accessToken = jwt.sign(
      {
        email: formattedEmail,
        userId: findUser._id,
      },
      process.env.Secret_Key,
      { expiresIn: "2hr" }
    );

    res.status(200).json({
      message: "Success",
      status: true,
      token: accessToken,
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};


export default login;
