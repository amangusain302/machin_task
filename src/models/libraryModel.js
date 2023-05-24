const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    book_name: {
        type: String,
        required: true,
        unique: true
    },
    author: {
        type : mongoose.Schema.Types.ObjectId
    },
    description : String
}, { timestamps: true });

const Library = new mongoose.model('library', schema);

module.exports = Library;