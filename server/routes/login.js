const express = require('express');
const router = express.Router();
require('dotenv-safe').config();
const jwt = require('jsonwebtoken');

const MongoClient = require('mongodb').MongoClient;
const url = process.env.MONGO_URL;
const crypto = require('crypto');
const hash = crypto.createHash('sha512');

router.post('/', function (request, response, next) {

    const passwordHashed = hash.update(request.body.password);
    const user = request.body.user;

    MongoClient
        .connect(url, {useUnifiedTopology: true}, function (err, client) {

            if (err) {
                console.log(err);
                return;
            }

            const db = client.db('vagasdb');

            db
                .collection('users')
                .findOne({
                    email: user,
                    password: passwordHashed.digest('hex')
                }, (error, result) => {

                    if (error) {
                        response.status(500).send({
                            auth: false, token: null, error: error
                        });
                        return;
                    }

                    if (result === null || result.name === null || result.name === undefined) {
                        response.status(500).send({
                            auth: false, token: null
                        });
                        return;
                    }

                    const id = result._id;

                    const token = jwt.sign({id}, process.env.SECRET, {
                        expiresIn: 100000
                    });

                    response.status(200).send({
                        auth: true,
                        token: token,
                        user: {
                            result
                        }
                    });
                })
        })

});

router.get('/logout', function (request, response, next) {
    response.status(200).send({
        auth: false,
        token: null
    });
});

module.exports = router;