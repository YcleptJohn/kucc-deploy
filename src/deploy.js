const deploy = module.exports = {}
const cmd = require('../lib/cmd.js')

deploy.run = (payload) => {
    if (payload.ref !== 'refs/heads/master') return console.log('PUSH event was NOT to the master branch')
    cmd.run('pm2 stop kucc-server', './kucc')
    cmd.run('git fetch origin master', './kucc')
    cmd.run('git reset --hard origin/master', './kucc')
    cmd.run('NODE_ENV=production npm install && NODE_ENV=production npm run build:all', './kucc')
    cmd.run('pm2 start src/server.js --name kucc-server', './kucc')
    console.log('Deployment finished!')
}