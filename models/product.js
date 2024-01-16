const {Schema, model} = require('mongoose');

const ProductSchema = Schema({
    prodName: {
        type: String,
        required: [true, 'Product name is required'],
        unique: true
    },
    prodStatus: {
        type: Boolean,
        default: true, // siempre activo (para borrado logico)
        required: true
    },
    user: { // Usuario que creó el producto
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    price: {
        type: Number,
        default: 0
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    description: {type: String},
    available: {type: Boolean, default: true},
    img: {type: String}
})

module.exports = model('Product', ProductSchema);