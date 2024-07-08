const mongoose = require("mongoose");

const qpSchema = new mongoose.Schema({
    QpName: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    qpJobRole:{
        type: String,
    },
    description:{
        type: String,
        required: true,
    },
    isActive:{
        type: Boolean,
        default: true
    },
    created_at: Date,
    updated_at: Date,
    created_by: String,
    updated_by: String,


});

const Qps = mongoose.model("Qp", qpSchema);
module.exports = Qps;
