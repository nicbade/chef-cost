var express = require('express');
var router = express.Router();
var pool = require('../modules/pool.js');

router.post('/', function(req, res) {
    var newProduct = req.body;
    console.log('addProduct post was hit!');
    // Add an INSERT query
    pool.connect(function(errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            //when connecting to database failed
            console.log('Error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            // when connecting to database worked aka HAPPYPATH!
            client.query('INSERT INTO product (product, product_number, vendor, price, unit, unit_measure) VALUES ($1, $2, $3, $4, $5, $6);', [newProduct.product, newProduct.productNumber, newProduct.vendor, newProduct.price, newProduct.caseSize, newProduct.unitMeasure], function(errorMakingQuery, result) {
                done(); //needed
                if (errorMakingQuery) {
                    console.log('Error making database query', errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(201);
                }
            });
        }
    });
});



module.exports = router;