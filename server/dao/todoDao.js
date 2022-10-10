const pool = require("../db");

class TodoDao {
    async getAll() {
        try {
            const allTodos = await pool.query(
                "SELECT * FROM todos;"
            );
            return allTodos.rows
        } catch (error) {
            console.log(error.message)
        }
    }

    async getById(id) {
        try {
            const todo = await pool.query("SELECT * FROM todos WHERE todo_id = $1",
                [id]
            )
            return todo.rows[0]
        } catch (error) {
            console.log(error)
        }
    }

    async getByUserId(id) {
        try {
            const todo = await pool.query("SELECT * FROM todos WHERE user_id = $1", [id])
            return todo.rows
        } catch (error) {
            console.log(error)
        }
    }

    async addTodo(description, user_id) {
        try {
            const newTodo = await pool.query(
                "INSERT INTO todos (description,user_id) VALUES($1,$2) RETURNING *",
                [description, user_id]
            );

            return newTodo.rows[0]
        } catch (error) {
            console.log(error)
        }
    }

    async deleteTodo(todoId){
        try {
            const deleteTodo = await pool.query("DELETE FROM todos WHERE todo_id = $1",[todoId])
        } catch (error) {
            console.log(error)
        }
    }

    async updateTodo(description,todoId){
        try {
            const updateTodo = await pool.query("UPDATE todos SET description=$1 WHERE todo_id=$2",[description,todoId])
            console.log(description,todoId)
            return updateTodo.rows[0]
        } catch (error) {
            console.log(error)
        }
    }


}

module.exports = new TodoDao()