import bcrypt from "bcrypt";
import User from "../model/userModel.js";
import jwt from "jsonwebtoken";

// get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// register API
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Unexpected User Details" });
    }

    // check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // secure your password
    const hashPassword = await bcrypt.hash(password, 10);

    const createUser = await User.create({
      name,
      email,
      password: hashPassword,
    });

    return res.status(200).json({
      success: true,
      message: "User created successfully",
      createUser,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// login API
export const login = async (req, res) => {
  try {
    const { email, password } = JSON.parse(JSON.stringify(req.body)) || req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and Password required" });
    }
    // check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User does not exist" });
    }

    // check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect Password" });
    }

    // jwt token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: 3000,
      }
    );

    return res
      .status(200)
      .json({ success: true, message: "User logged in successfully", token });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const logout = async (req, res) => {
  localStorage.removeItem("token");
  return res
    .status(200)
    .json({ success: true, message: "User logged out successfully" });
};
