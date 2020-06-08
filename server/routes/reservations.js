const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
require('dotenv-safe').config();
const url = process.env.MONGO_URL;
const crypto = require('crypto');
const hash = crypto.createHash('sha512');
require('dotenv-safe').config();
const jwt = require('jsonwebtoken');

router.get('/', function (request, response, next) {

    MongoClient.connect(url, {useUnifiedTopology: true}, function (err, client) {

        if (err) {
            response.status(500);
            response.send({
                message: 'Deu merda',
                error: err
            });
            return;
        }

        const db = client.db('vagasdb');

        db.collection('reservations').find({
            user_id: request.user.id
        }).toArray((error, result) => {

            if (error) {
                response.status(500).send({
                    success: false
                });
                return;
            }

            response.json(result);
        });
    });
});

router.post('/', function (request, response, next) {

    const {sector, time} = request.body;

    MongoClient.connect(url, {useUnifiedTopology: true}, function (err, client) {

        if (err) {
            response.status(500);
            response.send({
                message: 'Deu merda',
                error: err
            });
            return;
        }

        const db = client.db('vagasdb');

        db.collection('sectors').findOne({_id: sector }, (error, sectorObj) => {
            db
                .collection('reservations').insertOne({
                    user_id: request.user.id,
                    sector_id: sector,
                    time: time,
                    name: sectorObj.sector
                })
                .then(() => db.collection('sectors').findOneAndUpdate({_id: sector}, {$inc: { available: -1 }}))
                .then(() => response.send({ success: true }));
        })


    });
});

router.delete('/:id', function (request, response, next) {

    const { sector_id } = request.body;

    MongoClient.connect(url, {useUnifiedTopology: true}, function (err, client) {

        if (err) {
            response.status(500);
            response.send({
                message: 'Deu merda',
                error: err
            });
            return;
        }

        const db = client.db('vagasdb');

        db.collection('reservations')
            .deleteOne({_id: ObjectID(request.params.id) })
            .then((response) => {
                if (response.result.n > 0)
                    return db.collection('sectors').findOneAndUpdate({_id: sector_id }, {$inc: { available: 1 }})

                return Promise.resolve();

            })
            .then(() => response.send({ success: true }))
            .catch(error => { response.status(500); response.send({ error: error})})

    });
});

module.exports = router;