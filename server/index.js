const express = require('express')
const cors = require('cors')
const todoRouter = require('./routers/todoRouter')
const userRouter = require('./routers/userRouter')
const authorize = require('./middlewares/authorize')

const app = express()

app.use(cors())
app.use(express.json())

app.use("/todo",todoRouter)
app.use("/user",userRouter)

app.get("/",(req,res)=>{
    res.send("api")
})

app.listen(5000, () => {
    console.log("server has started on port 5000");
  });

