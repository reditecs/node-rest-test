'use strict'
const mongoose = require("mongoose")
const User = require("../models/user")
const service = require("../services")

function signUp(req, res){
  let user = new User({
    email: req.body.email,
    displayName: req.body.displayName
  })
  user.save((err) => {
    if(err){
      res.status(500)
      res.send({message: "Error al crear el usuario => " + err})
    }else{
      res.status(200)
      res.send({token: service.createToken(user)})
    }
  })
}

function signIn(req, res){
  User.find({email: req.body.email}, (err, user) => {
    if(err){
      res.status(500).send({message: "Ocurrio un error => " + err})
    }else{
      if(!user){
        res.status(404).send({message: "No existe el usuario"})
      }else{
        req.user = user
        res.status(200).send({
          message: "Inicio de sesion correcto",
          token: service.createToken(user)
        })
      }
    }
  })
}

module.exports = {
  signUp,
  signIn
}