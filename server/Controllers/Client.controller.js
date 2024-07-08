const Clients = require("../Models/ClientModel");
const uploadImage = require("../Utils/fileStore")
const Role = require('../Models/RoleModel'); // Adjust the path as necessary
const Users = require("../Models/userModel");


module.exports = {

    // addClientDetails: async function (req, res, next) {
      
    //     const { ClientName, description } = req.body;
    //     const currentDate = new Date();
    
    //     try {
    //       const newClient = new Clients({
    //         ClientName: ClientName,
    //         description: description,
    //         created_at: currentDate.toISOString(),
    //         updated_at: currentDate.toISOString(),
         
    //       });
    
    //       // If an image is uploaded, add it to the client object
    //       // if (req.file) {
    //       //   newClient.image = req.file.buffer.toString("base64");
    //       // }
    
    //       // Save the new client object to the database
    //       const savedClient = await newClient.save();
    
    //       console.log("Client details and image added successfully:", savedClient);
    //       res.status(200).send(savedClient);
    //     } catch (error) {
    //       console.error("Error adding client details and image:", error.message);
    //       res.status(500).send({ error: error.message });
    //     }
    //   },

  //    addClientDetails : async function (req, res, next) {
  //     const {
  //         ClientName,
  //         description,
  //         client_Company_Name,
  //         Address,
  //         Status,
  //         email,
  //         mobile,
  //         owner,
  //         contact_person_name,
  //         contact_person_email,
  //         contact_person_mobile,
  //         plan_type
  //     } = req.body;
      
  //     const currentDate = new Date();
  
  //     try {
  //         const newClient = new Clients({
  //             ClientName: ClientName,
  //             description: description,
  //             client_Company_Name: client_Company_Name,
  //             Address: Address,
  //             Status: Status,
  //             email: email,
  //             mobile: mobile,
  //             owner: owner,
  //             contact_person_name: contact_person_name,
  //             contact_person_email: contact_person_email,
  //             contact_person_mobile: contact_person_mobile,
  //             plan_type: plan_type,
  //             created_at: currentDate.toISOString(),
  //             updated_at: currentDate.toISOString(),
  //             data_created_at: currentDate,
  //             data_created_by: req.user ? req.user._id : null, // Assuming user info is available in req.user
  //             data_updated_at: currentDate,
  //             rowCreatedBy: req.user ? req.user._id : null // Assuming user info is available in req.user
  //         });
  
  //         // If an image is uploaded, add it to the client object
  //         if (req.file) {
  //             newClient.image = req.file.buffer.toString('base64');
  //         }
  
  //         // Save the new client object to the database
  //         const savedClient = await newClient.save();
  
  //         console.log("Client details and image added successfully:", savedClient);
  //         res.status(200).send(savedClient);
  //     } catch (error) {
  //         console.error("Error adding client details and image:", error.message);
  //         res.status(500).send({ error: error.message });
  //     }
  // },
  
 addClientDetails : async function (req, res, next) {
    const {
        ClientName,
        description,
        client_Company_Name,
        Address,
        Status,
        email,
        mobile,
        owner,
        contact_person_name,
        contact_person_email,
        contact_person_mobile,
        plan_type,
        password // Assuming password is included in the request body for creating the user
    } = req.body;
    
    const currentDate = new Date();

    try {
        // Create a new User entry for the client
        const newUser = new Users({
            email: email,
            password: password, // Hash the password before saving (not shown here)
            
            created_at: currentDate.toISOString(),
            updated_at: currentDate.toISOString(),
            data_created_at: currentDate,
            data_created_by: req.user ? req.user._id : null,
            data_updated_at: currentDate,
            rowCreatedBy: req.user ? req.user._id : null
        });

        // Save the new user object to the database
        const savedUser = await newUser.save();

        // Create a new Client entry
        const newClient = new Clients({
            ClientName: ClientName,
            description: description,
            client_Company_Name: client_Company_Name,
            Address: Address,
            Status: Status,
            email: email,
            mobile: mobile,
            owner: owner,
            contact_person_name: contact_person_name,
            contact_person_email: contact_person_email,
            contact_person_mobile: contact_person_mobile,
            plan_type: plan_type,
            user_id: savedUser._id, // Reference to the corresponding user
            created_at: currentDate.toISOString(),
            updated_at: currentDate.toISOString(),
            data_created_at: currentDate,
            data_created_by: req.user ? req.user._id : null,
            data_updated_at: currentDate,
            rowCreatedBy: req.user ? req.user._id : null
        });

        // If an image is uploaded, add it to the client object
        if (req.file) {
            newClient.image = req.file.buffer.toString('base64');
        }

        // Save the new client object to the database
        const savedClient = await newClient.save();

        console.log("Client details and image added successfully:", savedClient);
        res.status(200).send(savedClient);
    } catch (error) {
        console.error("Error adding client details and image:", error.message);
        res.status(500).send({ error: error.message });
    }
},
 updateClientDetails : async (req, res, next) => {
  const { id } = req.params;
  const {
      ClientName,
      description,
      client_Company_Name,
      Address,
      Status,
      email,
      mobile,
      owner,
      contact_person_name,
      contact_person_email,
      contact_person_mobile,
      plan_type,
      password // Assuming password is included in the request body for updating the user
  } = req.body;

  const currentDate = new Date();

  try {
      // Find the client by ID
      const client = await Clients.findById(id);

      if (!client) {
          return res.status(404).send({ message: "Client not found" });
      }

      // Update client details
      client.ClientName = ClientName || client.ClientName;
      client.description = description || client.description;
      client.client_Company_Name = client_Company_Name || client.client_Company_Name;
      client.Address = Address || client.Address;
      client.Status = Status || client.Status;
      client.email = email || client.email;
      client.mobile = mobile || client.mobile;
      client.owner = owner || client.owner;
      client.contact_person_name = contact_person_name || client.contact_person_name;
      client.contact_person_email = contact_person_email || client.contact_person_email;
      client.contact_person_mobile = contact_person_mobile || client.contact_person_mobile;
      client.plan_type = plan_type || client.plan_type;
      client.updated_at = currentDate.toISOString();

      // Save the updated client object
      const savedClient = await client.save();

      console.log("Client details updated successfully:", savedClient);
      res.status(200).send(savedClient);
  } catch (error) {
      console.error("Error updating client details:", error.message);
      res.status(500).send({ error: error.message });
  }
},


      // updateClientDetails: async (req, res, next) => {
      //   const { id } = req.params;
      //   const { ClientName, description } = req.body;
      //   const currentDate = new Date();
    
      //   try {
      //     // Find the client by ID and update the details
      //     const updatedClient = await Clients.findById(id);
    
      //     if (!updatedClient) {
      //       return res.status(404).send({ message: "Client not found" });
      //     }
    
      //     updatedClient.ClientName = ClientName || updatedClient.ClientName;
      //     updatedClient.description = description || updatedClient.description;
      //     updatedClient.updated_at = currentDate.toISOString();
    
      //     // If an image is uploaded, update the image
      //     if (req.file) {
      //       updatedClient.image = req.file.buffer.toString("base64");
      //     }
    
      //     // Save the updated client object to the database
      //     const savedClient = await updatedClient.save();
    
      //     console.log(
      //       "Client details and image updated successfully:",
      //       savedClient
      //     );
      //     res.status(200).send(savedClient);
      //   } catch (error) {
      //     console.error("Error updating client details and image:", error.message);
      //     res.status(500).send({ error: error.message });
      //   }
      // },
    
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

}