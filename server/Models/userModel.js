const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        
    },
    middle_name: {
        type: String,
        
    },
    last_name: {
        type: String,
       
    },
    gender: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        
    },
   
    mobile: {
        type: String,
        
    },
    username: {
        type: String,
        
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',
       
    },
    is_email_verified:{
        type: Boolean,
        default: true,
    },
    email_verified_at:{
        type: Date,
        default: true,
    },
    is_mobile_verified:{
        type: Boolean,
        default: true,
    },
    is_profile_complete:{
        type: Boolean,
        default: true,
    },
    // profileImagePath: {
    //     type: String,
    //     required: true,
    // },
    password: {
        type: String,
        required: true,
    },
    password_change_count:{
type:Number,
    },
//     is_password_reset:{
//         type: Boolean,
//         default: true,
//     },
    is_approved:{
        type: Boolean,
        default: true,
    },
    // is_blocked:{
    //     type: Boolean,
    //     default: true,
    // },
    valid_from:{
        type:Date
    },
    valid_till:{
        type:Date
    },
    isActive:{
        type: Boolean,
        default: true,
    },
    isDelete:{
        type: Boolean,
        default: true,
    },
    highest_qualification:{ 
        type: String,
        required: true,},
        unitAlloted:{ 
            type: String,
          },

    //         otp:{ 
    //             type: String,
    //            },
    //             spin:{ 
    //                 type: String,
    //               },
    created_by: {
        type: mongoose.Types.ObjectId,
      },
      updated_by: {
        type: mongoose.Types.ObjectId,
      },
    created_at: Date,
    updated_at: Date,
   


});
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});
userSchema.methods.generateToken = async function () {
    try {
      return jwt.sign(
        {
          email: this.email,
          isAdmin: this.isAdmin,
        },
        process.env.JWT_SECRETE_KEY,
        {
          expiresIn: "30d",
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
const Users = mongoose.model("User", userSchema);
module.exports = Users;
