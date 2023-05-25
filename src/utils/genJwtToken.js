const jwt = require("jsonwebtoken");

module.exports = genJWTtoken = (data) => {
    console.log(data._id);
    console.log(process.env.JWT_SECRET);
    return jwt.sign({ _id : data._id }, "amangusain", {
        expiresIn: "15d"
    })
}