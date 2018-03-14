const express = require('express')
const tokens = require('../../shared/tokens.json')
console.log(tokens)
const app = express()

app.post('/deploy', (req, res) => {
    console.log(JSON.parse(req))
    if (!req.query || !req.query.token) return res.send(403)
    if (req.query.token !== tokens.deploy_token) return res.send(404)
    return res.send('Good work')
})

app.listen(8500, () => {
    console.log('Listening on 8500')
})

// toolbox.routing.getExpressApp().post('/api/pod-transfer', async (req, res) => {
// +  try {
// +    await actions.movePods(req.body.currentUser, req.body.targetUserId, req.body.fromPod, req.body.toPod)
// +    return res.status(200).end()
// +  } catch (e) {
// +    if (e.message === 'No permission') return res.status(403).send(e.message)
// +    toolbox.logger.warn(e.message, 'Error occured during pod transfer')
// +    return res.status(500).send(e.message)
// +  }
// +})