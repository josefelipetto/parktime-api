var express = require('express');
var router  = express.Router();
require('dotenv-safe').config();
var jwt = require('jsonwebtoken')

var MongoClient = require('mongodb').MongoClient;
var url = process.env.MONGO_URL;
var crypto = require('crypto');
var hash = crypto.createHash('sha512');

router.post('/', function(request, response, next) {
    
    passwordHashed = hash.update(request.body.password);
    user = request.body.user

    MongoClient
        .connect(url, { useUnifiedTopology: true }, function (err, client) {

            if (err) {
                console.log(err);
                return;
            }

            var db = client.db('vagasdb')
            
            db
             .collection('users')
             .findOne({
                 email: user,
                 password: passwordHashed.digest('hex')
             }, (error, result) => {
                 
                if (err) {
                     response.status(500).send({
                         auth: false, token: null
                     });
                     return;  
                 }

                 if (result.name === null || result.name === undefined) {
                     response.status(500).send({
                         auth: false, token: null
                     });
                     return;
                 }

                const id = result._id;

                var token = jwt.sign({ id }, process.env.SECRET, {
                    expiresIn: 100000
                });

                response.status(200).send({
                    auth: true, token: token, user: {
                        result
                    }
                });
        })
        })

});

router.get('/logout', function(request, response, next) {
    response.status(200).send({
        auth: false,
        token: null
    });
});

module.exports = router;