// models/Permission.js
const mongoose = require('mongoose');

const PermissionSchema = new mongoose.Schema({
  roleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  pCode: { type: String, required: true },
  hasAccess: { type: Boolean, default: false }
});

module.exports = mongoose.model('Permission', PermissionSchema);

