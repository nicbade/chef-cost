var express = require('express');
var router = express.Router();
var pool = require('../modules/pool.js');

// addProduct post route
router.post('/', function(req, res) {
    var newRecipe = req.body;
    console.log('addRecipe post was hit!');
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

router.delete('/:id', function(req, res) {
    var recipeId = req.params.id;
    console.log('recipe delete was hit!', recipeId);
    pool.connect(function(errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            // when connecting to database failed
            console.log('Error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            // when connecting to database worked!
            client.query('DELETE FROM recipe WHERE id=$1;', [recipeId],
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
    var recipeId = req.params.id;
    console.log('message put was hit!', req.body);
    pool.connect(function(errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            // when connecting to database failed
            console.log('Error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            // when connecting to database worked!
            client.query('UPDATE recipe SET name=$1, type=$2, yield=$3, yield_amount=$4 WHERE id=$5;', [req.body.name, req.body.type, req.body.yield, req.body.yield_amount, recipeId],
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

router.get('/details', function(req, res) {
    pool.connect(function(errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('Error connecting to Database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query('SELECT * FROM recipe WHERE id=$1', [req.query.id], function(errorMakingQuery, result) {
                if (errorMakingQuery) {
                    console.log('Error Making Query', errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    if (result.rows.length > 0) {
                        res.send(result.rows[0]);
                    } else {
                        console.log('No recipe with that id');
                        res.sendStatus(404);
                    }
                }
            });
        }
    });
});
module.exports = router;