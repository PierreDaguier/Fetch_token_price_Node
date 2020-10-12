const axios = require("axios");

const dbtools = require("./mongodbstuff.js")
const fs = require("fs")
const config = fs.readFileSync("./config.json")
const infos = JSON.parse(config)




axios({
    "method":"GET",
    "url":infos.fetch_token_API_url,
    "headers":{
        "content-type":"application/octet-stream",
        "x-rapidapi-host":infos.API_host,
        "x-rapidapi-key":infos.API_Key,
        "useQueryString":true
    },
    "params":{
        "ids":infos.token,
        "vs_currencies":infos.currency
    }
})
.then((response)=>{
    console.log(response.data)
    
    const newtokenvalue = {
        "id" : infos.token,
        "date" : response.headers.date,
        "value" :  response.data.ethereum.eur
    } 
    
    console.log(newtokenvalue)
    let fetch_token_value = JSON.stringify(newtokenvalue)
    fs.writeFile('values.json', fetch_token_value, (err) => {
        if (err) {
            throw err;
        }
        console.log("JSON data is saved.");
    });
    dbtools.insertion()
    

})

.catch((error)=>{
    console.log(error)
})

