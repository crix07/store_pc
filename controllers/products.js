'use strict'


const Product = require('../models/products');
const nodemailer = require('nodemailer');

// function sharedProduct(req, res){
//       // create reusable transporter object using the default SMTP transport
//       console.log(req.params.url)
//       let transporter = nodemailer.createTransport({
//           service: "Gmail",
//           auth: {
//               user: 'christianmota07@gmail.com',
//               pass: '458217821782'
//           }
//       });
//
//       let mailOptions = {
//           from: 'GeeK PC <christianmota07@gmail.com>',
//           to: 'crixgaymer@gmail.com',
//           subject: 'Hello ✔',
//           text: 'Hello world!! this works! :v'
//       }
//
//       // send mail with defined transport object
//       transporter.sendMail(mailOptions, (err, info) => {
//           if (err) return res.status(500).send({message: `error al enviar el Email ${err}`})
//           return res.status(200).send({info})
//       })
// }

function addProducts(req, res) {
    let params = req.body;
    let products = new Product();

    console.log(params)
    let asin = params.ASIN;
    products.ASIN = params.ASIN;
    products.name = params.name;
    products.image = params.image;
    products.price = params.price;
    products.DetailPageURL = params.DetailPageURL;
    products.user = params.user;
    products.Quantity = params.quantity;

    Product.findOne({ ASIN: asin }, (err, productExist) => {
        if (err) {
            res.status(500).send({ message: `error al buscar los productos ${err}` })
        } else {
            if (!productExist) {

                products.save((err, products) => {
                    if (err) {
                        res.status(500).send({ message: `error al agregar los products ${err}` })
                        console.log(err)
                    } else {
                        if (!products) {
                            res.status(404).send({ message: 'no se pudo guardar los productos' })
                        } else {
                            res.status(200).send({ product: products })
                        }
                    }
                })

            } else {
                res.status(500).send({ message: 'no se pudo guardar el producto porque ya existe' })
            }
        }
    })
}



function borrarAll(req, res) {
    let items = req.params.items;
    console.log(items)
    Product.remove({ user: items }, (err, products) => {
        if (err) {
            res.json(err)
        } else {
            res.json(products)
        }
    })

}

function updateProduct(req, res) {

    let productId = req.params.item
    console.log(req.params.item)
    let params = req.body;

    Product.findByIdAndUpdate(productId, params, { new: true }, (err, productStored) => {
        if (err) {
            res.status(500).send({ message: `error al actualizar el producto` })
        } else {
            if (!productStored) {
                res.status(404).send({ message: 'no se pudo actualizar el producto' })
            } else {
                res.status(200).send({ productStored: productStored })
            }
        }
    })

}




function getProducts(req, res) {
    console.log(req.params.id);

    let user = req.params.id;

    Product.find({ user: user }, (err, products) => {
        if (err) {
            res.status(500).send({ message: `hubo un error al buscar los products ${err}` })
        } else {
            res.status(200).send({ products: products })
        }
    })

}

function deleteProduct(req, res) {
    let product = req.params.id;
    Product.deleteOne({ _id: product }, (err, product) => {
        if (err) {
            res.json(err)
        } else {
            res.json(product)
        }
    })


}


module.exports = {
    addProducts,
    getProducts,
    deleteProduct,
    borrarAll,
    updateProduct
}