const User = require("../models/user.model");
const Contact = require("../models/contact.model")

const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({}, { password: 0 });
        console.log(users);
        
        if (!users || users.legnth === 0) {
            return res.status(404).json({ message: "No Users Found" });
        }
        return res.status(200).json(users);
    } catch (error) {
        next(error);
    }
}; 


const deleteUserById = async (req,res,next) => {
    try {
        const id = req.params.id;
        await User.deleteOne({ _id: id });
        return res.status(200).json({ message: "user deleted successfully" });
        
    } catch (error) {
        next(error);
    }
}


const updateAdminRoleById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId); // ✅

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.isAdmin = !user.isAdmin; // ✅ toggle the role
    await user.save();

    res.status(200).json({
      message: user.isAdmin
        ? "User is promoted to admin"
        : "User is demoted from admin",
      isAdmin: user.isAdmin,
    });
  } catch (error) {
    console.error("MakeAdmin error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//single user Logic

const getUsersById = async (req,res,next) => {
    try {
        const id = req.params.id;
        const data = await User.findOne({ _id: id },{password:0});
        return res.status(200).json(data);
        
    } catch (error) {
        next(error);
    }
}

//update user Logic

const updateUserById = async (req,res,next) => {
    try {
        const id = req.params.id;
        const updateUserData = req.body;

        const updatedData = await User.updateOne({ _id: id }, { $set: updateUserData, });
        return res.status(200).json(updatedData)
        
    } catch (error) {
        next(error);
    }
}

const getAllContacts = async (req, res, next) => {
    try {
        const contacts = await Contact.find();
        console.log(contacts);
        
        if (!contacts || contacts.legnth === 0) {
            return res.status(404).json({ message: "No Contacts Found" });
        }
        return res.status(200).json(contacts);
    } catch (error) {
        next(error);
    }
}


const deleteContactById = async (req, res, next) => {
  try {
    const id = req.params.id;
    await Contact.deleteOne({ _id: id });
    return res.status(200).json({ message: "contact deleted successfully" });
  } catch (error) {
    next(error);
  }
};


module.exports = { getAllUsers, getAllContacts,updateAdminRoleById,deleteUserById,getUsersById,updateUserById,deleteContactById};