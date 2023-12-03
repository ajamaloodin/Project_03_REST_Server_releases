const {Schema, model} = require('mongoose');

const RoleSchema = Schema({
    rol: {
        type: String,
        required: [true, 'User role is required']
    }
})

module.exports = model('Role', RoleSchema);