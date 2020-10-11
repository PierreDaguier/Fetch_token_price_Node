// In this script you can find all functions i need to trade informations with my MongoDB database

const fs = require("fs")
const config = fs.readFileSync("./config.json")
const infos = JSON.parse(config)
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert')
const mongodbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
 
// Connection URL
const url = infos.Mongodb_adress
console.log(url)
 
// Database Name
const dbName = infos.db_name

// Document insertion fonction
const insertvalues = function(db, callback) {
	// Get the values collection
	const collection = db.collection(`${infos.db_collection}`)
	let valjson = fs.readFileSync("./values.json")
	let valjsonparse = JSON.parse(valjson)
	// Insert values into a temporary json values.json file
	collection.insertOne(
	    valjsonparse, function(err, result) {
	    assert.equal(err, null)
	    console.log("Inserted one data into the collection")
	    callback(result)
        }
	);
	// Delete this values.json just after put it into the database
	fs.unlink('./values.json', (err) => {
		if (err) throw err;
		console.log('path/file.txt was deleted');
	});
} 
// Values find function
const findvalues = function(db, callback) {
    // Get the values collection
	const collection = db.collection(`${infos.db_collection}`)
	// Find some values
	collection.find({}).toArray(function(err, docs) {
        assert.equal(err, null)
	    console.log("Found the following records")
	    console.log(docs)
	    callback(docs)
	})


}  
// This is the functions exported to be used in harvester.js
module.exports = {
	// Use connect method to connect to the server and insert documents in the collection
	insertion : function (callback, err) {
    	MongoClient.connect(url, mongodbOptions, function(err, client) {
        	assert.equal(null, err);
        	console.log("Connected successfully to server");
        	const db = client.db(dbName);
        	insertvalues(db, function() {
	        	client.close();
	    	})
    	})
	}
},
{
	// Use connect method to connect to the server and shows what's in, in an array
	findtokens : function (callback, err) {
    	MongoClient.connect(url, mongodbOptions, function(err, client) {
	    	assert.equal(null, err);
	    	console.log("Connected successfully to server");
        	const db = client.db(dbName);
	    	findvalues(db, function() {
		    	client.close();
	    	})
		})
	}
}
