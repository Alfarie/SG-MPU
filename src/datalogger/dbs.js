var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var DB;



function DBConnect() {
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db("SmartGrobot");
            DB = db;
            resolve(dbo);
        });
    });
}

function InsertOne(collection, obj) {
    return new Promise((resolve, reject) => {
        DBConnect().then(db => {
            db.collection(collection).insertOne(obj, function(err,res){
                if(err) throw err
                resolve(res);
                DB.close()
            })
        });
    })
}

function Find(collection, obj){
    return new Promise((resolve, reject) => {
        DBConnect().then(db => {
            db.collection(collection).find(obj).toArray(function(err,res){
                if(err) throw err
                resolve(res);
                DB.close()
            })

        });
    })
}

// var moment = require('moment');
// Find("Logger", { "timestamp": {$gte: moment('2018-03-28').toISOString()} }).then(res=>{
//     res.forEach(data=>{console.log(data);})
// })

module.exports = {
    InsertOne,
    Find
}