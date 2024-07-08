const Users = require("../Models/userModel");
const Role = require("../Models/RoleModel")
module.exports = {
addUser: async (req, res) => {
    const {
      first_name,
      middle_name,
      last_name,
      email,
      mobile,
      username,
      role,
      password,
      gender,
      highest_qualification,
      unitAlloted
    } = req.body;
    const currentDate = new Date();

    try {
      const roleExists = await Role.findById(role);

      if (!roleExists || roleExists.isDelete) {
        return res.status(400).json({ message: "Invalid role specified." });
      }

      const newUser = new Users({
        first_name,
        middle_name,
        last_name,
        email,
        mobile,
        username,
        role: role,
        password,
        gender,
      highest_qualification,
      unitAlloted,
        created_at: currentDate,
        updated_at: currentDate,
        

      });

      const savedUser = await newUser.save();

      console.log("User added successfully:", savedUser);
      res.status(200).send(savedUser);
    } catch (error) {
      console.error("Error adding user:", error.message);
      res.status(500).send({ error: error.message });
    }
  },
  

updateUser: async (req, res) => {
    const { id } = req.params;
    const {
      first_name,
      middle_name,
      last_name,
      email,
      mobile,
      username,
      role,
      password,
    } = req.body;
    const currentDate = new Date();

    try {
      const roleExists = await Role.findById(role);

      if (!roleExists || roleExists.isDelete) {
        return res.status(400).json({ message: "Invalid role specified." });
      }

      const updatedUser = await Users.findByIdAndUpdate(
        id,
        {
          first_name,
          middle_name,
          last_name,
          email,
          mobile,
          username,
          role: role,
          password,
          updated_at: currentDate,
        },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found." });
      }

      console.log("User updated successfully:", updatedUser);
      res.status(200).send(updatedUser);
    } catch (error) {
      console.error("Error updating user:", error.message);
      res.status(500).send({ error: error.message });
    }
  },

  allUsers: async (req, res) => {
    let users = await Users.find({});
    console.log("all users fatched");
    res.send(users);
  },
  selectedUser: (req, res) => {
    const id = req.params.id;
    Users.find({ _id: id }).then((Users) =>
      res.json({ message: " successfully", Users })
    );
  },
  deleteUser: async function (req, res) {
    const userId = req.params.id;

    try {
      // Update the isDeleted field to true
      const updatedUser = await Users.findByIdAndUpdate(
        userId,
        { isDeleted: true, updated_at: new Date() },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }

      console.log("User deleted successfully:", updatedUser);
      res
        .status(200)
        .json({ message: "User deleted successfully", user: updatedUser }); // Return a success message
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ error: "Error deleting user" }); // Return an error response
    }
  },
}