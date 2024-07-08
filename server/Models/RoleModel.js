const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    isDelete:{
        type:Boolean,
        default:false,
    }
});

module.exports = mongoose.model('Role', RoleSchema);
