//require mongodb database
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = "mongodb://azurazen:0%40lternate%3F@aladdin-shard-00-00-x25pa.mongodb.net:27017,aladdin-shard-00-01-x25pa.mongodb.net:27017,aladdin-shard-00-02-x25pa.mongodb.net:27017/test?ssl=true&replicaSet=Aladdin-shard-0&authSource=admin";
// no need to call then() yet
var mongo = MongoClient.connect(url,{ useNewUrlParser: true });


exports.get = async function(collection,query){
    return await mongo.then(async function(client){
        return await client.db("Aladdin").collection(collection).findOne(query,{}).then(function(docs) {
            return docs;
        });
    })
}