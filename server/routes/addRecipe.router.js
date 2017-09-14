var express = require('express');
var router = express.Router();
var pool = require('../modules/pool.js');

// addProduct post route
router.post('/', function(req, res) {
    var newRecipe = req.body;
    console.log('addProduct post was hit!');
    pool.connect(function(errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            //when connecting to database failed
            console.log('Error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            // when connecting to database worked aka HAPPYPATH!
            client.query('INSERT INTO recipe (name, type, yield, yield_amount) VALUES ($1, $2, $3, $4);', [newRecipe.name, newRecipe.type, newRecipe.yield, newRecipe.yield_amount], function(errorMakingQuery, result) {
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
            db.query('SELECT * FROM recipe', function(errorMakingQuery, result) {
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

module.exports = router;