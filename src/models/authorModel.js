const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    password: String,
    status : {
        type : String,
        enum : ["approved", "pending", "rejected"],
        default : "pending"
    }
}, { timestamps: true });

const Author = new mongoose.model('author', schema);

module.exports = Author;