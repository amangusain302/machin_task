const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: String,
}, { timestamps: true });

const Admin = new mongoose.model('admin', schema);

module.exports = Author;