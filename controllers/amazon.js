'use strict'

const {OperationHelper} = require('apac');
const details = require('../routes/details');
const Product = require('../models/products');
// Acciones

var opHelper = new OperationHelper({
    awsId:     details.AccessId,
    awsSecret: details.Secret,
    assocId:   details.Tag,
    locale:    'US'
});

function getProducts(req, res){
  Product.find({}, (err, products)=>{
    if (err) {
      res.json(err)
    } else {
      res.json(products)
    }
  })
}

function saveProducts(req, res){


  let products = new Product();
  products.ASIN = req.body.ASIN;
  products.name = req.body.name;
  products.image = req.body.image;
  products.category = req.body.category;
  products.DetailPageURL = req.body.category;
  products.price = req.body.price;


  products.save((err, ProductsStored)=>{
    if (err) {
      res.status(500).send({message: `error al guardar los productos ${err}`})
    } else {
      if (!ProductsStored) {
        res.status(403).send({message: 'no se guardaron los productos correctamente'})
      } else {
        res.status(200).send({products: ProductsStored})
      }
    }
  })


}

function similar(req, res){

  const item = req.params.item;

  opHelper.execute('SimilarityLookup', {
    'ItemId': item,
    'ResponseGroup': 'Images,ItemAttributes'
  }).then((response) => {
    res.status(200).send(response.result.SimilarityLookupResponse.Items.Item)
  }).catch((err) => {
      console.error("Hubo un error en la api de amazon, Quizas no tienes internet! ", err);
  });


}



function searchOne(req, res){

    const id = req.params.id;

  opHelper.execute('ItemLookup', {
    'ItemId': id,
    'ResponseGroup': 'Accessories,Small,Tracks,Variations,VariationSummary,SalesRank,Reviews,EditorialReview,Similarities,Images,ItemAttributes,Offers'
  }).then((response) => {
    res.status(200).send(response.result.ItemLookupResponse.Items.Item)
  }).catch((err) => {
      console.error("Hubo un error en la api de amazon, Quizas no tienes internet! ! ", err);
  });
}

function amazon(req, res){
  var keyword = req.params.keyword;
  var page = req.params.pages || 1
  var category = req.body.category;

  opHelper.execute('ItemSearch', {
    // PCHardware
    'SearchIndex': 'Electronics',
    'Keywords': keyword,
    'ResponseGroup': 'Similarities,Images,ItemAttributes,Offers',
    'ItemPage': page
  }).then((response) => {
    res.status(200).send({
      result: response.result.ItemSearchResponse.Items.Item,
      totalResults: response.result.ItemSearchResponse.Items.TotalResults,
      totalPages: response.result.ItemSearchResponse.Items.TotalPages
    })
  }).catch((err) => {
      console.error("Hubo un error en la api de amazon, Quizas no tienes internet! ! ", err);
  });
}

module.exports = {
  amazon,
  saveProducts,
  getProducts,
  searchOne,
  similar
}
