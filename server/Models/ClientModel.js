const mongoose = require("mongoose");
const clientRoleId = '6688e04b387e16de61aa2594';
const clientsSchema = new mongoose.Schema({
    is_active: {
        type: Boolean,
        default: true
    },
    ClientName: {
        type: String,
        // required: true,
    },
    description: {
        type: String,
        // required: true,
    },
    image: {
        type: String,
        // required: false, 
    },
        client_Company_Name:{
        type: String,
    },
    Address:{
        type: String,
    },
    Status:{
        type: String,
    },
    email:{
        type: String,
    },
    mobile:{
        type: String,
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',
        default: clientRoleId
        // default: mongoose.Types.ObjectId('6688e04b387e16de61aa2594') // Set default role ID

    },
    owner:{
        type: String,
    },
    contact_person_name:{
        type: String,
    },
    contact_person_email:{
        type: String,
    },
    contact_person_mobile:{
        type: String,
    },
    plan_type:{
        type: String,
    },
    password:{
        type: String,
    },
    isDelete: {
        type: Boolean,
        default: false
    },
    created_at: String,
    updated_at: String,
    data_created_at: Date,
    data_created_by: String,
    data_updated_at: Date,

    rowCreatedBy:{
        type: mongoose.Types.ObjectId,

    },

});

const Clients = mongoose.model("Client", clientsSchema);
module.exports = Clients;
