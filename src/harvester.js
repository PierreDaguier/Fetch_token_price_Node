const axios = require("axios");

const dbtools = require("./mongodbstuff.js")
const fs = require("fs")
const config = fs.readFileSync("./config.json")
const infos = JSON.parse(config)


module.exports = {
    exportdatatodb() {
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
            
            
            dbtools.insertion(newtokenvalue)
            

        })

        .catch((error)=>{
            console.log(error)
        })
    }
}

