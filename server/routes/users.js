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

router.post('/', function(request, response, next) {
  const { name, email, password } = request.body;
  
  if (isEmptyOrNull(name)) {
    response.status(400)
    response.send({
      success: false,
      message: 'Nome deve ser informado'
    });
    return;
  }
  
  if (isEmptyOrNull(email)) {
    response.status(400)
    response.send({
      success: false,
      message: 'E-mail deve ser informado'
    });
    return;
  }

  if (isEmptyOrNull(password)) {
    response.status(400)
    response.send({
      success: false,
      message: 'Senha deve ser informada'
    });
    return;
  }

  hashedPassword = hash.update(password, 'utf-8');


  MongoClient
    .connect(url, {useUnifiedTopology: true}, function(err, client){

      if (err) {
        console.log(err);
        return;
      }
      
      var db = client.db('vagasdb')
      
      db
      .collection('users')
      .insertOne({
        name: name,
        email: email,
        password: hashedPassword.digest('hex'),
        car: {
          licensePlate: request.body.licensePlate
        }
      })
    })
  
  response.status(200).send({
    success: true
  });

});

router.get('/', function(request, response, next) {
  MongoClient
    .connect(url, { useUnifiedTopology: true }, function (err, client) {
        var db = client.db('vagasdb');
        const token = request.headers["x-access-token"];
        const decoded = jwt.verify(token, process.env.SECRET);
        
        db
          .collection('users')
          .findOne({"_id": ObjectID(decoded.id)}, (err, result) => {
            
            if (err) {
              response.status(500).send(err);
              return;
            }
            
            delete result.password
            response.status(200).send(result);
          })
    });
});

function isEmptyOrNull(value) {
  return value === '' || value === null || value === undefined;
}
module.exports = router;
