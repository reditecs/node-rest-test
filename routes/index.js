'use strict'
const express = require("express")
const api = express.Router()
const isAuth = require("../middlewares/auth")
const ProductCtrl = require("../controllers/product")
const UserCtrl = require("../controllers/user")

//Product Routes
api.get("/product", ProductCtrl.getProducts)
api.get("/product/:id", ProductCtrl.getProduct)
api.post("/product/", isAuth, ProductCtrl.saveProduct)
api.put("/product/:id", isAuth, ProductCtrl.updateProduct)
api.delete("/product/:id", isAuth, ProductCtrl.deleteProduct)
//User Routes
api.post("/signup", UserCtrl.signUp)
api.post("/signin", UserCtrl.signIn)

module.exports = api