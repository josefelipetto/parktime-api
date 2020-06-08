const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
require('dotenv-safe').config();
const url = process.env.MONGO_URL;
require('dotenv-safe').config();

router.get('/', (request, response, next) => {
    MongoClient
        .connect(url, {useUnifiedTopology: true}, function (err, client) {
            const db = client.db('vagasdb');
            db.collection('sectors').find({}).toArray((error, result) => {
                if (error) {
                    response.status(500).send({
                        success: false
                    });
                    return;
                }
                response.json(result);
            })
        });
});

router.get('/:id', (request, response, next) => {

    MongoClient
        .connect(url, {useUnifiedTopology: true}, function (err, client) {
            const db = client.db('vagasdb');

            db
                .collection('sectors')
                .findOne({"_id": request.params.id}, (error, result) => {
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