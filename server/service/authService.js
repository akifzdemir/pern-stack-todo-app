const authDao = require('../dao/authDao')
const jwtGenerator = require("../utils/jwtGenerator")
const bcrypt = require('bcryptjs');

class AuthService {
    async register(user) {
        const { firstName, lastName, email, password } = user;

        const salt = await bcrypt.genSalt(10);
        const bcryptPassword = await bcrypt.hash(password, salt);

        const existedUser = await authDao.getByEmail(email);

        if (existedUser) {
            return { message: "User Already Exist" }
        }

        let newUser = await authDao.add(firstName, lastName, email, bcryptPassword)
        const jwtToken = jwtGenerator(newUser.user_id);
        return { jwtToken }
    }


    async login(user) {
        const { email, password } = user;

        const getUser = await authDao.getByEmail(email);

        if (!getUser) {
            return { message: "User Not Found" }
        }

        const validPassword = await bcrypt.compare(
            password,
            getUser.password
        )

        if (!validPassword) {
            return { message: "Wrong Password" }
        }

        const jwtToken = jwtGenerator(getUser);

        return { jwtToken }
    }
}

module.exports = new AuthService()