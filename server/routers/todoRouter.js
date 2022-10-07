const router = require('express').Router()
const authorize = require('../middlewares/authorize');
const todoService = require('../service/todoService');

router.get("/", async (req, res) => {
    try {
        const result = await todoService.getAll()
        res.json(result)
    } catch (error) {
        console.log(error)
    }
})

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const result = todoService.getById(id)
        res.json(result)
    } catch (error) {
        console.log(error)
    }
})

router.post("/add", async (req, res) => {
    try {
        console.log(req.body)
        const result = await todoService.addTodo(req.body)
        res.json(result)
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;