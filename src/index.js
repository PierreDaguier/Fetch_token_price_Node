// This is main program

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const dbtools = require('./mongodbstuff.js')
const fspromises = require('fs/promises')
const fs = require('fs')
const config = fs.readFileSync('./config.json')
const infos = JSON.parse(config)
const dbName = infos.db_name

// Cron module use harvester to fetch ethereum values every hour
const CronJob = require('cron').CronJob
const job = new CronJob('0 0 */1 * * *', dbtools.findtokens())
job.start()

const PORT = process.env.PORT || 4000

// This is the express answer to request on /
app.get('/', async (req, res) => {
    const last24values = await dbtools.findvalues()
    const jsonlast24values = JSON.stringify(last24values)
    await fspromises.writeFile('./tokenvalues.json', jsonlast24values)
    res.send(jsonlast24values)
    await fspromises.unlink('./tokenvalues.json')
    console.log('tokenvalues.json was deleted')
})

app.listen(PORT, (req, res) => {
    console.log(`Server Started at PORT ${PORT}`)
})