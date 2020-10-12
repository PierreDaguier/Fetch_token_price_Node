// This is main program

const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const dbtools = require("./mongodbstuff.js")
const fs = require("fs")
const config = fs.readFileSync("./config.json")
const infos = JSON.parse(config)
const dbName = infos.db_name


// Cron module use harvester to fetch ethereum values every hour
const CronJob = require('cron').CronJob
const job = new CronJob('0 0 */1 * * *', dbtools.findtokens() )
job.start()

const PORT = process.env.PORT || 4000


app.get("/", (req, res) => {
  fs.writeFile('./tokenvalues.json', jsonlast24values, (err) => {
    if (err) {
        throw err
    };
    res.json({message: `${jsonlast24values}`})
    fs.unlink('./tokenvalues.json', (err) => {
        if (err) throw err;
        console.log('tokenvalues.json was deleted');
    });
  }
)})

app.listen(PORT, (req, res) => {
  console.log(`Server Started at PORT ${PORT}`);
}); 