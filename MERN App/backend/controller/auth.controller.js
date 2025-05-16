const User = require("../models/user.model.js");
// const bcrypt = require("bcrypt")

const home = async (req, res) => {
  try {
    res.status(200).send("I am Home route");
  } catch (error) {
    console.log(error);
  }
};

const register = async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;

    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({ message: "email already exists" });
    }

    // const saltRound = 10;
    // const hase_password = await bcrypt.hash(password,saltRound0)

    const userCreated = await User.create({ username, email, phone, password });

    return res.status(201).json({
      message: "Registration successful",
      token: await userCreated.generateToken(),
      userId: userCreated._id.toString(),
    });
  } catch (error) {
    console.error("Error in register function:", error);
    return res.status(500).json("internal server err");
  }
};

// User-Login

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email });
    console.log(userExist)

    if (!userExist) {
      return res.status(404).json({ message: "Invalid Credential" });
    }

    const user = await userExist.comparePassword(password);

    if (user) {
      return res.status(200).json({
        message: "login successful",
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      });
    } else {
      return res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json("internal server errors");
  }
};

// user logic

const user = async (req, res) => {
  try {
    const userData = req.user;
    console.log(userData);
    res.status(200).json({ userData });
  } catch (error) {
    console.log(`error from the user route ${error}`);
  }
};

module.exports = { home, register, login, user };
