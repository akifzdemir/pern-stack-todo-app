const pool = require("../db");

class TodoDao{
    async getAll(){
        try {
            const allTodos = await pool.query(
                "SELECT * FROM todos;"
            ); 
            return allTodos.rows
        } catch (error) {
            console.log(error.message)
        }
    }

    async getById(id){
        try {
            const todo = await pool.query("SELECT * FROM users WHERE user_id = $1",
            [id]
            )
            return todo.rows[0]
        } catch (error) {
            
        }
    }

    async addTodo(description,user_id){
        try {
            const newTodo = await pool.query(
                "INSERT INTO todos (description,user_id) VALUES($1,$2) RETURNING *",
                [description,user_id]
            );
            return newTodo.rows[0]
        } catch (error) {
            console.log(error)
        }
    }

    
}

module.exports = new TodoDao()