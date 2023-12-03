const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/usuario');


const usersGet = async(req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { uStatus:true };

    // const users = await User.find(query)
    //                     .skip(Number(desde))
    //                     .limit(Number(limite));
    // const total = await User.countDocuments(query);

    const [total, users] = await Promise.all([
      User.countDocuments(query),
      User.find(query)
          .skip(Number(desde))
          .limit(Number(limite))
    ])

    res.json({
        total,
        users
    });
  }

const usersPost = async (req, res = response) => {

    
    // Es posbile desestructurar con {campo...rest}
    const {userName, email, password, role} = req.body;

    const user = new User( {userName, email, password, role} );

    // hash del password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);
    // guardar en la BD
    await user.save();

    res.json({
        msg: 'User has been created successfuly',
        user
    });
  }

const usersPut = async(req , res = response) => {

    const { id } = req.params;
    const { _id, password, google, email,...restOfThem} = req.body;

    if (password) {
      // hash del password
      const salt = bcryptjs.genSaltSync();
      restOfThem.password = bcryptjs.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, restOfThem);

    res.json({
        msg: `User ${id} has been updated successfuly`,
    });
  }

const usersPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - controller'
    });
  }

  const usersDelete = async(req, res = response) => {

    const { id } = req.params;

    //Borrado físico
    //const user = await User.findByIdAndDelete(id);

    const user = await User.findByIdAndUpdate(id, {uStatus:false});

    res.json({
        msg: `User ${id} has been marked deleted successfuly`
    });
  }

module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersPatch,
    usersDelete
}