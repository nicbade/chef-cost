var express = require('express');
var router = express.Router();
var pool = require('../modules/pool.js');

// addProduct post route
router.post('/', function(req, res) {
    var newProduct = req.body;
    console.log('addProduct post was hit!', newProduct);
    // Add an INSERT query
    pool.connect(function(errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            //when connecting to database failed
            console.log('Error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            // when connecting to database worked aka HAPPYPATH!
            client.query('INSERT INTO product (product, product_number, vendor, price, unit, unit_measure,cost_oz) VALUES ($1, $2, $3, $4, $5, $6, $7);', [newProduct.product, newProduct.productNumber, newProduct.vendor, newProduct.price, newProduct.caseSize, newProduct.unitMeasure, newProduct.cost_oz], function(errorMakingQuery, result) {
                done(); //needed
                if (errorMakingQuery) {
                    console.log('Error making database query', errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(201);
                }
            }); // end client.query
        }
    }); // end pool.connect
}); // end post route

router.post('/recipeProduct', function(req, res) {
    var recipeProduct = req.body;
    console.log('req.params', req.params);
    console.log('req.query', req.query);
    console.log('recipeProduct post hit', recipeProduct, recipeProduct.id)
    pool.connect(function(errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            //when connecting to database failed
            console.log('Error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            // when connecting to database worked aka HAPPYPATH!
            client.query('INSERT INTO recipe_products (product_id, recipe_id, recipe_amount, amount_type, product_cost) VALUES ($1, $2, $3, $4, $5);', [recipeProduct.product.id, recipeProduct.recipeId.id, recipeProduct.amount, recipeProduct.unitMeasure, recipeProduct.product_cost], function(errorMakingQuery, result) {
                done(); //needed
                if (errorMakingQuery) {
                    console.log('Error making database query', errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(201);
                }
            }); // end client.query
        }
    }); // end pool.connect
}); // end post route


router.get('/', function(req, res) {
    pool.connect(function(err, db, done) {
        if (err) {
            console.log('Error connecting to the DB', err);
            res.sendStatus(500);
            done();
            return;
        } // end error
        else {
            db.query('SELECT * FROM product', function(errorMakingQuery, result) {
                done();
                if (errorMakingQuery) {
                    console.log('Error making database query', errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    res.send(result.rows);
                } // end if statement
            });
        } // end no error
    }); // end pool connect
}); // end get 

router.delete('/:id', function(req, res) {
    var productId = req.params.id;
    console.log('product delete was hit!');
    pool.connect(function(errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            // when connecting to database failed
            console.log('Error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            // when connecting to database worked!
            client.query('DELETE FROM product WHERE id=$1;', [productId],
                function(errorMakingQuery, result) {
                    done();
                    if (errorMakingQuery) {
                        console.log('Error making database query', errorMakingQuery);
                        res.sendStatus(500);
                    } else {
                        res.sendStatus(200);
                    }
                });
        }
    });
});

router.put('/:id', function(req, res) {
    var productId = req.params.id;
    console.log('product put was hit!', req.body);
    pool.connect(function(errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            // when connecting to database failed
            console.log('Error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            // when connecting to database worked!
            client.query('UPDATE product SET product=$1, product_number=$2, vendor=$3, price=$4, unit=$5, unit_measure=$6, cost_oz=$7 WHERE id=$8;', [req.body.product, req.body.product_number, req.body.vendor, req.body.price, req.body.unit, req.body.unit_measure, req.body.cost_oz, productId],
                function(errorMakingQuery, result) {
                    done();
                    if (errorMakingQuery) {
                        console.log('Error making database query', errorMakingQuery);
                        res.sendStatus(500);
                    } else {
                        res.sendStatus(200);
                    }
                });
        }
    });
});
module.exports = router;