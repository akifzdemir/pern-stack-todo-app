const pool = require("../db")

class UserDao{
    async add(firstName,lastName,email,password){
        try {
            const user = await pool.query(
                "INSERT INTO users (firstName,lastName,email,password) VALUES($1,$2,$3,$4) RETURNING *",
                [firstName,lastName,email,password]
            )
            return user.rows[0]
        } catch (error) {
            console.log(error)
        }

    }
    async getByEmail(email){
        try {
            const user = await pool.query(
                "SELECT * FROM users WHERE email=$1",
                [email]
            )
            return user.rows[0]
        } catch (error) {
            console.log(error)
        }
    }
    
}

module.exports = new UserDao()