const jwt = require("jsonwebtoken");

module.exports = genJWTtoken = (data) => {
    return jwt.sign({ _id : data._id }, process.env.JWT_SECRET, {
        expiresIn: "15d"
    })
}