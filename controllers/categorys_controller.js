const { response, request } = require('express');
const { Category } = require('../models');

//
//Consulta de todas las categorias
//
const categoriesGet = async(req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { catStatus:true };

    const [total, categories] = await Promise.all([
      Category.countDocuments(query),
      Category.find(query)
          .populate({path: 'user', select: 'userName'})
          .skip(Number(desde))
          .limit(Number(limite))
    ])

    res.json({
        total,
        categories
    });
  }

//
//Consulta de una categoría en específico
//
const categoryGet = async(req , res = response) => {

    const { id } = req.params;

    const category = await Category.findById(id)
                                   .populate({path: 'user', select: 'userName'});

    res.json({
        category
    });
  }

//
//Crea una categoría
//
const createCategory = async(req = request, res = response) => {

    const {catName} = req.query;

    //verificar si existe una categoría con ese nombre
    const categoryDB = await Category.findOne({catName});

    if (categoryDB) {
        return res.status(400).json({
            msg: `Category ${catName} already exist`
        })
    }

    //Generar la data a guardar
    const data = {
        catName,
        user: req.uid
    }

    const category = new Category( data );
    // Guardar en la BD
    await category.save();

    res.status(201).json(category);
}

//
//Actualizar una categoría
//
const updateCategory = async(req , res = response) => {

    const { id } = req.params;
    const catName = req.body;

    const category = await Category.findByIdAndUpdate(id, catName);

    res.json({
        msg: `Category ${id} has been updated successfuly`,
    });
  }

//
// Eliminar de manera lógica -no fisica- una categoría dada
//
const deleteCategory = async(req, res = response) => {

    const { id } = req.params;

    const uid = req.uid;  
    
    const category = await Category.findByIdAndUpdate(id, {catStatus:false});

    res.json({
        msg: `Category ${id} has been marked deleted successfuly`,
        uid
    });
  }

module.exports = {
    createCategory,
    categoriesGet,
    categoryGet,
    updateCategory,
    deleteCategory
}