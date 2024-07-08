const Clients = require("../Models/ClientModel");
const Users = require("../Models/userModel");
const Role = require("../Models/RoleModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  home: async (req, res, next) => {
    try {
      res.status(200).send("Welcome");
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Internal server error" });
    }
  },

  // addClientDetails: async function (req, res, next) {
  //   const { ClientName, description } = req.body;
  //   const currentDate = new Date();

  //   try {
  //     // Create a new client object with the details
  //     const newClient = new Clients({
  //       ClientName: ClientName,
  //       description: description,
  //       created_at: currentDate.toISOString(),
  //       updated_at: currentDate.toISOString(),
  //       data_created_at: currentDate,
  //     });

  //     // If an image is uploaded, add it to the client object
  //     if (req.file) {
  //       newClient.image = req.file.buffer.toString("base64");
  //     }

  //     // Save the new client object to the database
  //     const savedClient = await newClient.save();

  //     console.log("Client details and image added successfully:", savedClient);
  //     res.status(200).send(savedClient);
  //   } catch (error) {
  //     console.error("Error adding client details and image:", error.message);
  //     res.status(500).send({ error: error.message });
  //   }
  // },
   addClientDetails : async function (req, res, next) {
    const { ClientName, description, email, password, role, data_created_by } = req.body;
    const currentDate = new Date();

    try {
        // Create a new client object with the details
        const newClient = new Clients({
            ClientName: ClientName,
            description: description,
            email: email,
            password: password,
            role: role, // This will use the default value if not provided
            created_at: currentDate.toISOString(),
            updated_at: currentDate.toISOString(),
            data_created_at: currentDate,
            data_created_by: data_created_by,
            data_updated_at: currentDate,
            isDelete: false
        });

        // Save the new client object to the database
        const savedClient = await newClient.save();

        console.log("Client details added successfully:", savedClient);
        res.status(200).send(savedClient);
    } catch (error) {
        console.error("Error adding client details:", error.message);
        res.status(500).send({ error: error.message });
    }
},
  updateClientDetails: async (req, res, next) => {
    const { id } = req.params;
    const { ClientName, description } = req.body;
    const currentDate = new Date();

    try {
      // Find the client by ID and update the details
      const updatedClient = await Clients.findById(id);

      if (!updatedClient) {
        return res.status(404).send({ message: "Client not found" });
      }

      updatedClient.ClientName = ClientName || updatedClient.ClientName;
      updatedClient.description = description || updatedClient.description;
      updatedClient.updated_at = currentDate.toISOString();

      // If an image is uploaded, update the image
      if (req.file) {
        updatedClient.image = req.file.buffer.toString("base64");
      }

      // Save the updated client object to the database
      const savedClient = await updatedClient.save();

      console.log(
        "Client details and image updated successfully:",
        savedClient
      );
      res.status(200).send(savedClient);
    } catch (error) {
      console.error("Error updating client details and image:", error.message);
      res.status(500).send({ error: error.message });
    }
  },

  allClients: async (req, res) => {
    let clients = await Clients.find({});
    console.log("all users fatched");
    res.send(clients);
  },
  updateClientId: (req, res) => {
    const id = req.params.id;
    Clients.find({ _id: id }).then((Clients) =>
      res.json({ message: "updated successfully", Clients })
    );
  },
  deleteClient: async function (req, res, next) {
    const clientId = req.params.id;

    try {
      let client = await Clients.findById(clientId);

      if (!client) {
        return res.status(404).json({ message: "Client not found" });
      }

      client.isDelete = true;

      const updatedClient = await client.save();

      console.log("Client deleted successfully:", updatedClient);
      res.status(200).json(updatedClient);
    } catch (error) {
      console.error("Error deleting client:", error.message);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  // Master Qp
  addQpDetails: async (req, res) => {
    const { QpName, code, qpJobRole, description, created_by } = req.body;
    const currentDate = new Date();

    try {
      // Create a new QP object with the details
      const newQp = new Qps({
        QpName: QpName,
        code: code,
        qpJobRole: qpJobRole,
        description: description,
        created_at: currentDate,
        updated_at: currentDate,
        created_by: created_by,
        updated_by: created_by, // Assuming updated_by is the same as created_by initially
      });

      // Save the new QP object to the database
      const savedQp = await newQp.save();

      console.log("QP details added successfully:", savedQp);
      res.status(200).send(savedQp);
    } catch (error) {
      console.error("Error adding QP details:", error.message);
      res.status(500).send({ error: error.message });
    }
  },

  // User Management
  userLogin: async (req, res) => {
    try {
      const { email, password } = req.body;
      const userExist = await Users.findOne({ email });

      if (!userExist) {
        return res.status(404).json({ msg: "User not found" });
      }

      const isMatch = await bcrypt.compare(password, userExist.password);

      if (isMatch) {
        const token = await jwt.sign(
          { user: userExist },
          process.env.JWT_SECRETE_KEY,
          
          {
            expiresIn: "1h",
          }
        );
        console.log("isMatchhhhh",isMatch )

        return res.status(200).json({
          msg: "Login successful",
          token: token,
          tokentype: "Bearer",
          data: userExist,
        });
      } else {
        return res.status(400).json({ msg: "Invalid email or password" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "Internal server error" });
    }
  },

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

  // Role Management
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
