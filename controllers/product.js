'use strict'
const Product = require("../models/product")

function getProduct(req, res){
  let id = req.params.id
  Product.findById(id, (err, product) => {
    if(err){
      res.status(500)
      res.send({mensaje: "Error al buscar dato: " + err})
    }else{
      if(!product){
        res.status(404)
        res.send({mensaje: "El producto no existe!"})
      }else{
        res.status(200)
        res.send({ product })
      }
    }
  })
}

function getProducts(req, res){
  Product.find({}, (err, products) => {
    if(err){
       res.status(500)
       res.send("Error en consultar base de datos => " + err)
    }else{
      if(!products){
        res.status(404)
        res.send({ message : "No se encontro lo que buscaste" })
      }else{
        res.status(200)
        res.send({ products })   
      }
    }
  })
}

function updateProduct(req, res){
  let id = req.params.id
  let update = req.body
  Product.findByIdAndUpdate(id, update, (err, updated) => {
    if(err){
      res.status(500)
      res.send({message: "Error al actualizar => " + err })
    }else{
      if(!updated){
        res.status(404)
        res.send({message:"El producto no existe"})
      }else{
        res.status(200)
        res.send({product: updated})
      }
    }
  })
}

function deleteProduct(req, res){
  let id = req.params.id
  Product.findById(id, (err, product) => {
    if(err){
      res.status(500)
      res.send({message:"Error al borrar => " + err})
    }else{
      if(!product){
         res.status(404)
         res.send({message:"El producto no existe"})
      }else{
        product.remove(err => {
          if(err){
            res.status(500)
            res.send({message: "Ocurrio un error al borrar => " + err})
          }else{
            res.status(200)
            res.send({message:"Producto eliminado"})
          }
        })
      }
    }
  })
}

function saveProduct(req, res){
  let product = new Product()
  product.name = req.body.name
  product.picture = req.body.picture
  product.price = req.body.price
  product.category = req.body.category
  product.description = req.body.description
  product.save((err, productStored) => {
    if(err){
      res.status(500)
      res.send({message: err})
    }else{
      res.status(200)
      res.send({producto: productStored})
    }
  })
}

exports = {
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  saveProduct
}

module.exports = exports