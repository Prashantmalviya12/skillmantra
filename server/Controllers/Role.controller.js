const Role = require("../Models/RoleModel");

module.exports = {

addRole: async (req, res) => {
    try {
      const { title, description } = req.body;

      if (!title || !description) {
        return res
          .status(400)
          .json({ message: "Title and description are required." });
      }

      const newRole = new Role({
        title,
        description,
      });

      await newRole.save();

      res
        .status(201)
        .json({ message: "Role added successfully!", role: newRole });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  },
  updateRole: async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description } = req.body;

      if (!title || !description) {
        return res
          .status(400)
          .json({ message: "Title and description are required." });
      }

      const updatedRole = await Role.findByIdAndUpdate(
        id,
        { title, description },
        { new: true, runValidators: true }
      );

      if (!updatedRole) {
        return res.status(404).json({ message: "Role not found." });
      }

      res
        .status(200)
        .json({ message: "Role updated successfully!", role: updatedRole });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  },
  allRoles: async (req, res) => {
    let roles = await Role.find({});
    console.log("all users fatched");
    res.send(roles);
  },
  selectedRoles: (req, res) => {
    const id = req.params.id;
    Role.find({ _id: id }).then((Role) =>
      res.json({ message: " successfully", Role })
    );
  },
  deleteRole: async (req, res) => {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: "Role ID is required." });
      }

      // Find the role by ID and update isDelete to true
      const role = await Role.findByIdAndUpdate(
        id,
        { isDelete: true },
        { new: true }
      );

      if (!role) {
        return res.status(404).json({ message: "Role not found." });
      }

      res.status(200).json({ message: "Role deleted successfully!", role });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  },
};