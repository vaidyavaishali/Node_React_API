const express = require("express")
// const mongoose = require("mongoose")
const bodyparser = require("body-parser")
const mongoose = require("mongoose")
const data_router = require("./routes/dataRoutes")
const PORT = 8000
const app = express()
app.use(bodyparser.json())
mongoose.connect("mongodb+srv://test:test@cluster0.vcdyq8z.mongodb.net/?retryWrites=true&w=majority").then(()=>{
  console.log("connected")
}) 

// app.get("/", (req, res)=>{
//     console.log("ok")
// })

app.use("/", data_router)

app.listen(PORT, ()=>{
    console.log(`Server Running at port ${PORT}`)
})