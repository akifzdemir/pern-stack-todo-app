const router = require('express').Router()
const authService = require('../service/authService')

router.post("/register",async (req,res)=>{
    try {
        const result = await authService.register(req.body)
        res.json(result)
    } catch (error) {
        console.log(error)
    }
})
router.post("/login",async (req,res)=>{
    try {
        const result = await authService.login(req.body)
        res.json(result)
    } catch (error) {
        console.log(error)
    }
})

module.exports = router