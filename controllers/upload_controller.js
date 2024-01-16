const path = require('path');
const fs   = require('fs');
const { response, request } = require("express");
const { uploadFile }        = require('../helpers');
const {User, Product}       = require('../models')


const loadfiles = async (req=request, res=response) => {

    try {
        //const filename = await uploadFile(req.files, ['txt'], 'textfiles');
        const filename = await uploadFile(req.files, undefined, 'imgs');
        res.json({
            filename
        });
    } catch (msg) {
        res.status(400).json({msg});
    }

}

const updateImage = async (req=request, res=response) => {

    const {id, collection} = req.params;

    let modelo;

    switch (collection) {
            case 'users':
                modelo = await User.findById(id);
                if (!modelo) {
                    return res.status(400).json({msg: `There is no any user with this id ${id}`});
                }
            break;

            case 'products':
                modelo = await Product.findById(id);
                if (!modelo) {
                    return res.status(400).json({msg: `There is no any product with this id ${id}`});
                }
            break;
            default: 
                return res.status(500).json({msg: 'Faltó validar esto'});
        }


    //Limpiar imagenes previamente cargadas
    try {
        if (modelo.img) {
            //Borrar la imagen del servidor
            const pathImage = path.join(__dirname, '../uploads', collection, modelo.img);
            if ( fs.existsSync( pathImage ) ){
                fs.unlinkSync( pathImage );
            }
        }
    } catch (error) {
        
    }    

    const filename = await uploadFile(req.files, undefined, collection);

    modelo.img = filename;

    modelo.save();

    res.json({modelo})

} 

const showImage =  async (req=request, res=response) => {

    const {id, collection} = req.params;

    let modelo;

    switch (collection) {
            case 'users':
                modelo = await User.findById(id);
                if (!modelo) {
                    return res.status(400).json({msg: `There is no any user with this id ${id}`});
                }
            break;

            case 'products':
                modelo = await Product.findById(id);
                if (!modelo) {
                    return res.status(400).json({msg: `There is no any product with this id ${id}`});
                }
            break;
            default: 
                return res.status(500).json({msg: 'Faltó validar esto'});
        }


    
    try {
        if (modelo.img) {
            //Borrar la imagen del servidor
            const pathImage = path.join(__dirname, '../uploads', collection, modelo.img);
            if ( fs.existsSync( pathImage ) ){
                return res.sendFile(pathImage);
            }
        }
    } catch (error) {
        
    }    

    const pathImage = path.join(__dirname, '../assets', 'no-image.jpeg');
    return res.sendFile(pathImage);

} 


module.exports = {
    loadfiles,
    updateImage,
    showImage
}