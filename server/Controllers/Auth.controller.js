const Users = require("../Models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Clients = require('../Models/ClientModel')

module.exports = {
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
          
          // tokentype: "Bearer",
          // data: userExist,
        });
      } else {
        return res.status(400).json({ msg: "Invalid email or password" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "Internal server error" });
    }
  },
  
}