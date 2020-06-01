var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
require('dotenv-safe').config();
var url = process.env.MONGO_URL;
var crypto = require('crypto');
var hash = crypto.createHash('sha512');
require('dotenv-safe').config();
var jwt = require('jsonwebtoken')

router.get('/', (request, response, next) => {
    MongoClient
        .connect(url, { useUnifiedTopology: true }, function (err, client) {
            var db = client.db('vagasdb');

            db.collection('sectors').find({}).toArray((error, result) => {
                if (error) {
                    response.status(500).send({
                        success: false
                    });
                    return;
                }
                console.log(result);
                response.json(result);
            })
        });
})

router.get('/:id', (request, response, next) => {
    
    MongoClient
        .connect(url, { useUnifiedTopology: true }, function (err, client) {
            var db = client.db('vagasdb');

            db
                .collection('sectors')
                .findOne({ "_id": request.params.id }, (error, result) => {
                    if (error) {
                        response.status(500).send({
                            success: false
                        });
                        return;
                    }
                    console.log(result);
                    response.json(result);
                })
        });
})

module.exports = router;