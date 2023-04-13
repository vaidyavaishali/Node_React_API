const mongoose = require("mongoose")

const dataSchema = new mongoose.Schema({
    id:{type:Number, unique:true},
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    catagory: { type: String, required: true }
})
const dataModel = mongoose.model("product", dataSchema)

module.exports = dataModel