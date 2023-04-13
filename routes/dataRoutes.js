const express = require("express")
const bodyparser = require("body-parser")
const data_router = express.Router()
const { body, validationResult } = require("express-validator");
const Data_models = require("../models/dataModel")

data_router.post("/products",
    body("name").isAlpha(),
    body("price").isNumeric(), async (req, res) => {
        const { name, description, price, catagory } = req.body
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                });
            } else {
                const time = new Date().getTime();
                // const random = Math.floor(Math.random() * 1000);
                const length = await Data_models.find();
                const newid = time + length.length;
                const product = await Data_models.create({
                    id:newid,
                    name: name,
                    description: description,
                    price: price,
                    catagory: catagory,
                })
                res.status(201).json({
                    status: "Success",
                    result: product
                })
            }
        }
        catch (e) {
            res.status(404).json({
                status: "Failed,",
                message: e.message
            })
        }
    })
data_router.get("/products", async (req, res) => {
    try {
        const product = await Data_models.find()
        res.status(200).json({
            status: "Success",
            result: product
        })
    } catch (e) {
        res.status(404).json({
            status: "Failed,",
            message: e.message
        })
    }
})

data_router.get("/products/:id", async (req, res) => {
    try {
        const findByID = await Data_models.findOne({ id: req.params.id })
        if (findByID) {
            res.status(200).json({
                status: "Success",
                result: findByID
            })
        } else {
            res.status(404).json({
                status: "ID not found",
            })
        }
    } catch (e) {
        res.status(404).json({
            status: "Failed,",
            message: "Invalid Id"
        })
    }
})

data_router.delete("/products/:id", async (req, res) => {
    try {
        const findByID = await Data_models.findOne({ id: req.params.id })
        if (findByID) {
            await Data_models.deleteOne({ id: req.params.id })
            res.status(200).json({
                status: "Successfully deleted",
            })
        } else {
            res.status(404).json({
                status: "ID not found",
            })
        }

    } catch (e) {
        res.status(404).json({
            status: "Failed,",
            message: "There is no contact with that id"
        })
    }
})


data_router.put("/products/:id", async (req, res) => {
    try {
        const findByID = await Data_models.findOne({ id: req.params.id })
        if (findByID) {
            await Data_models.updateOne({ id: req.params.id }, req.body)
            res.status(200).json({
                status: "success"
            })
        } else {
            res.status(404).json({
                status: "ID not found",
            })
        }

    } catch (e) {
        res.status(404).json({
            status: "Failed,",
            message: "There is no contact with that id"
        })
    }

})

module.exports = data_router