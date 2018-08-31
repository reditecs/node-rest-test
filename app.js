'use strict'
const express = require("express")
const bodyParser = require("body-parser")
const hbs = require("express-handlebars")
const app = express()
const api = require("./routes/index")
app.use(bodyParser.urlencoded({ extended : false }))
app.use(bodyParser.json())
app.engine('.hbs', hbs({
  defaultLayout: "default",
  extname: ".hbs"
}))
app.set("view engine", ".hbs")
app.use("/api", api)
app.use("/login", (req, res) => {
  res.render("login")
})
app.use("/product", (req, res) => {
  res.render("product")
})
module.exports = app