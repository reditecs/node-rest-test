'use strict'
const mongoose = require("mongoose")
const app = require("./app")
const config = require("./config")
mongoose.connect(config.dbURL,{ useNewUrlParser: true }, (err, res) => {
  if(err){
    return console.log("Error en base de datos => " + err)
  }
  console.log("Conectado a la base de datos")
  app.listen(config.port, () => {
    console.log("Express iniciado")
  })
})