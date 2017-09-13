var express = require('express');
var router = express.Router();
var pool = require('../modules/pool.js');

// addProduct post route
router.post('/', function(req, res) {
    var newRecipe = req.body;
    console.log('addProduct post was hit!');
    // Add an INSERT query
    pool.connect(function(errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            //when connecting to database failed
            console.log('Error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            // when connecting to database worked aka HAPPYPATH!
            client.query('INSERT INTO recipe (name, type, yield, yield_amount) VALUES ($1, $2, $3, $4;', [newRecipe.name, newRecipe.type, newRecipe.yield, newRecipe.yield_amount], function(errorMakingQuery, result) {
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

module.exports = router;