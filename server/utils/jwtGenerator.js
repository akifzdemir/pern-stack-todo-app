const jwt = require('jsonwebtoken')
require('dotenv').config()

function JwtGenerator(user) {
    const {user_id , firstname, lastname,email  } = user
    const payload = {
        id: user_id,
        userName: firstname +" "+ lastname,
        email: email
    }
    return jwt.sign(payload, process.env.jwtSecret, { expiresIn: "1h" })
}

module.exports = JwtGenerator;