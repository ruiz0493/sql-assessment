var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var massive = require('massive');
//Need to enter username and password for your database
var connString = "postgres://danielruiz:airforce2@localhost/assessbox"


var app = express();

app.use(bodyParser.json());
app.use(cors());



//The test doesn't like the Sync version of connecting,
//  Here is a skeleton of the Async, in the callback is also
//  a good place to call your database seeds.
var db = massive.connect({connectionString : connString},
  function(err, localdb){
    db = localdb;
    app.set('db', db);
    
    db.user_create_seed(function(){
      console.log("User Table Init");
    });
    db.vehicle_create_seed(function(){
      console.log("Vehicle Table Init")
    });
})

app.get('/api/users', function(req, res) {
  db.get_all_users(function(err, users){
    res.json(users);
  })
});

app.get('/api/vehicles', function(req, res) {
  db.get_all_vehicles(function(err, vehicles){
    res.json(vehicles);
  })
});

app.post('/api/users', function(req, res){
  db.add_new_user([req.body.firstname, req.body.lastname, req.body.email], function(err, users) {
    res.status(200).json(users)
    console.log(req.body);
    })
});


app.post('/api/vehicles', function(req, res){
  db.add_new_vehicle([req.body.make, req.body.model, req.body.year, req.body.ownerId], function(err, vehicles) {
    res.status(200).json(vehicles)
    console.log(req.body);
    })
});


app.get('/api/user/:userId/vehiclecount', function(req, res){
    db.count_vehicle([req.params.userId], function(err, users){
        res.status(200).json(users[0])
    })
});

app.get('/api/user/:userId/vehicle', function(req, res){
    db.get_user_vehicle([req.params.userId], function(err, users){
        res.status(200).json(users)
    })
});


app.get('/api/vehicle', function(req, res) {
    if (req.query.email) {
        db.find_by_email([req.query.email + '%'], function(err, users) {
            res.status(200).json(users)
        })
    }
                
    if (req.query.userFirstStart) {
        db.user_first([req.query.userFirstStart + '%'], function(err, vehicles) {
            res.status(200).json(vehicles)
        })
    }
});


app.get('/api/newervehiclesbyyear', function(req, res){
    db.newer_vehicle(function(err, vehicles){
        res.status(200).json(vehicles);
    })
});


app.put('/api/vehicle/:vehicleId/user/:userId', function(req, res) {
  db.new_vehicle_owner([req.params.vehicleId, req.params.userId], function(err, vehicles){
    res.status(200).json(vehicles);
  })

});

app.delete('/api/user/:userId/vehicle/:vehicleId', function(req, res){
    db.remove_owner([req.params.userId, req.params.vehicleId], function(err, vehicles){
        res.status(200).json(vehicles);
    })
});

app.delete('/api/vehicle/:vehicleId', function(req, res){
    db.delete_vehicle([req.params.vehicleId], function(err, vehicles){
        res.status(200).json(vehicles);
    })
});

// app.listen('3043', function(){
//   console.log("Successfully listening on : 3043")
// })

module.exports = app;
