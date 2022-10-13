const { deleteTodo } = require('../dao/todoDao');
const todoDao = require('../dao/todoDao')

class TodoService{
    async getAll(){
       return await todoDao.getAll()
    }
    async getById(id){
        return await todoDao.getById(id)
    }

     async getByUserId(id){
         return await todoDao.getByUserId(id)
     }

   async addTodo(todo){
        const {description,user_id} = todo;
        return await todoDao.addTodo(description,user_id)
    }

    async deleteTodo(todoId){
         await todoDao.deleteTodo(todoId)
    }
    
    async updateTodo(todo){
        const {description,id} = todo
        await todoDao.updateTodo(description,id)
    }
}

module.exports = new TodoService()