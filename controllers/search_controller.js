const {request, response} = require('express');
const {ObjectId} = require('mongoose').Types;
const {User, Category, Product} = require('../models');

const allowedCollections = [
    'categories',
    'products',
    'roles',
    'users'
];

const searchUsers = async(term = '', res = response) => {
    const isMongoId = ObjectId.isValid(term);

    if (isMongoId) {
        const user = await User.findById(term);
        return res.json({
            results: ( user ) ? [user] : []
        });
    }

    const regex = new RegExp(term, 'i');
    const user = await User.find({ 
        $or: [{ userName: regex }, {email: regex }],
        $and: [{ uStatus: true }]
    });

    res.json({
        results: user
    });

}

const searchCategories = async(term = '', res = response) => {
    const isMongoId = ObjectId.isValid(term);

    if (isMongoId) {
        const category = await Category.findById(term);
        return res.json({
            results: ( category ) ? [category] : []
        });
    }

    const regex = new RegExp(term, 'i');
    const category = await Category.find({ 
        catName: regex, 
        catStatus: true
    });

    res.json({
        results: category
    });

}

const searchProducts = async(term = '', res = response) => {
    const isMongoId = ObjectId.isValid(term);

    if (isMongoId) {
        const product = await Product.findById(term).populate('category', 'catName');
        return res.json({
            results: ( product ) ? [product] : []
        });
    }

    const regex = new RegExp(term, 'i');
    const product = await Product.find({ 
        $or: [{ prodName: regex }, {description: regex}],
        $and: [{ prodStatus: true }]
    }).populate('category', 'catName');

    res.json({
        results: product
    });

}

const search = (req=request, res=response) => {

    const {colection, term} = req.params;

    if (!allowedCollections.includes( colection)) {
        return res.status(400).json({
            msg: `Collection: ${ colection } does not exist. Allowed are: ${ allowedCollections }`
        })
    }

    switch(colection){
        case 'categories':
            searchCategories(term, res);
        break;
        case 'products':
            searchProducts(term, res);
        break;
        case 'users':
            searchUsers(term, res);
        break;
        default:
            res.status(500).json({
                msg: `Falta implementar esta coleccion: ${colection}`
            })
    }
}

module.exports = {
    search
}