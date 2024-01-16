const {Schema, model} = require('mongoose');

const CategorySchema = Schema({
    catName: {
        type: String,
        required: [true, 'Category name is required'],
        unique: true
    },
    catStatus: {
        type: Boolean,
        default: true, // siempre activa (para borrado logico)
        required: true
    },
    user: { // Usuario que creó la categoria
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true

    }
})

module.exports = model('Category', CategorySchema);