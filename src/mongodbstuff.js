// In this script you can find all functions i need to trade informations with my MongoDB database

const fs = require("fs")
const config = fs.readFileSync("./config.json")
const infos = JSON.parse(config)
const fspromises = require('fs/promises')
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert')
const mongodbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
 
// Connection URL
const url = infos.Mongodb_adress

 
// Database Name
const dbName = infos.db_name

// Document insertion fonction
const insertvalues = async (newtokenvalue) => {
    // Get the values collection
    const client = await MongoClient.connect(url, mongodbOptions)
    const db = client.db(dbName)
	const collection = db.collection(`${infos.db_collection}`)

	await collection.insertOne(
	    newtokenvalue, function(err, result) {
	    assert.equal(err, null)
		console.log("Inserted one data into the collection")
		client.close()
	    return result 
        }
	);}

// Values find function
const findvalues = async () => {
    // Get the values collection
    const client = await MongoClient.connect(url, mongodbOptions)
    const db = client.db(dbName)
 
    // Get the values collection
    const collection = db.collection(`${infos.db_collection}`)
    // Find some values
    const valuesdisplayed = await collection
        .find()
        .sort({ _id: -1 })
        .limit(24)
        .toArray()
    
    client.close()
    return valuesdisplayed
}



// This is the functions exported to be used in harvester.js
module.exports = {
    // Use connect method to connect to the server and insert documents in the collection
    insertion: async (newtokenvalue) => {
		await insertvalues(newtokenvalue)
		console.log('Connected successfully to server')
        
    },
    // Use connect method to connect to the server and shows what's in, in an array
    findtokens: async (callback, err) => {
        await findvalues()
        console.log('Connected successfully to server')
    },
  	findvalues: findvalues,
}