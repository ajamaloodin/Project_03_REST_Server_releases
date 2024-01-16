const Role = require('../models/roles');
const User = require('../models/usuario');
const Category = require('../models/category');
const { Product } = require('../models');

const isAValidRole = async(role = '') => {
    const existeRol = await Role.findOne({ role });
    if (!existeRol) {
        throw new Error('User role is not defined in the DB collection');
    }
}

const emailExist = async(email = '') => {
    // Validar si el email existe
    const existEmail = await User.findOne({ email });

    if (existEmail) {
        throw new Error(`User with this email: ${email} already exist.`);
      };
}

const allowedCollections = async(collection = '', collections = []) => {

    const isIncluded = collections.includes(collection);
    if (!isIncluded) {
        throw new Error(`This collection: ${collection} is not allowed.`);
    }
    return true;
} 

const userExistByID = async( id ) => {
    // Validar si existe un User Id dado
    const userExist = await User.findById( id );

    if (!userExist) {
        throw new Error(`There is no any User with this id: ${id}`);
      };
}

const categoryExistByID = async( id ) => {
    // Validar si existe una category Id dado
    const categoryExist = await Category.findById( id );

    if (!categoryExist) {
        throw new Error(`There is no any Category with this id: ${id}`);
      };
}

const categoryExistByName = async(catName = '') => {
    // Validar si la categoria existe
    const existCategory = await Category.findOne({ catName });

    if (existCategory) {
        throw new Error(`A Category with this name: ${catName} already exist.`);
      };
}

const productExistByID = async( id ) => {
    // Validar si existe un product Id dado
    const productExist = await Product.findById( id );

    if (!productExist) {
        throw new Error(`There is no any Product with this id: ${id}`);
      };
}

const productExistByName = async(prodName = '') => {
    // Validar si el producto ya existe
    const existProduct = await Product.findOne({ prodName });

    if (existProduct) {
        throw new Error(`A Product with this name: ${prodName} already exist.`);
      };
}


module.exports = {
    allowedCollections,
    categoryExistByID,
    categoryExistByName,
    emailExist,
    isAValidRole,
    productExistByName,
    productExistByID,
    userExistByID
};

