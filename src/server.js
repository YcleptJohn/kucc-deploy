const express = require('express')
const bodyParser = require('body-parser')
const crypto =  require('crypto')
const deploy = require('./deploy.js')

const app = express()

app.use(bodyParser.json());
app.post('/deploy', (req, res) => {
    if (!req.get('X-Hub-Signature')) return res.sendStatus(403)
    const hmac = crypto.createHmac("sha1", process.env.WEBHOOK_DEPLOY_SECRET || '')
    const calculatedSignature = "sha1=" + hmac.update(JSON.stringify(req.body)).digest("hex")
    if (req.get('X-Hub-Signature') !== calculatedSignature) return res.sendStatus(403)
    res.sendStatus(200)
    deploy.run(req.body)
    return
})

app.listen(8500, () => {
    console.log('Listening on 8500')
})