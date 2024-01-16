const { response, request } = require('express');
const { Product } = require('../models');

//
//Consulta de todas los productos
//
const productsGet = async(req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { prodStatus:true };

    const [total, products] = await Promise.all([
      Product.countDocuments(query),
      Product.find(query)
          .populate({path: 'user', select: 'userName'})
          .skip(Number(desde))
          .limit(Number(limite))
    ])

    res.json({
        total,
        products
    });
  }

//
//Consulta de un producto en específico
//
const productGet = async(req , res = response) => {

    const { id } = req.params;

    const product = await Product.findById(id)
                                   .populate({path: 'user', select: 'userName'});

    res.json({
        product
    });
  }

//
// Crear un producto nuevo
//
const createProduct = async (req, res = response) => {

    
    // Es posbile desestructurar con {campo...rest}
    const {prodName, prodStatus, user, category, description} = req.body;

    const product = new Product( {prodName, prodStatus, user, category, description} );

    // guardar en la BD
    await product.save();

    res.json({
        msg: 'Product has been created successfuly',
        product
    });
  }

//
// Actualizar un producto dado y sus campos asociados
//
const productPut = async(req , res = response) => {

    const { id } = req.params;
    const { prodName, user, price, category, description, available} = req.body;

    const product = await Product.findByIdAndUpdate(id, { prodName, user, price, category, description, available});

    res.json({
        msg: `Product ${id} has been updated successfuly`,
    });
  }

//
// Eliminar de manera lógica -no fisica- un producto dado
//
const deleteProduct = async(req, res = response) => {

    const { id } = req.params;

    const uid = req.uid;  
    
    const product = await Product.findByIdAndUpdate(id, {prodStatus:false});

    res.json({
        msg: `Product ${id} has been marked deleted successfuly`,
        uid
    });
  }

  module.exports = {
    productsGet,
    productGet,
    createProduct,
    productPut,
    deleteProduct
  }