const axios = require("axios");
const config = require('./config.json')
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
    console.log(response)
})

.catch((error)=>{
    console.log(error)
})