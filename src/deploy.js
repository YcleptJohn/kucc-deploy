const deploy = module.exports = {}
const cmd = require('../lib/cmd.js')

deploy.run = (payload) => {
    if (payload.ref !== 'refs/heads/master') return console.log('PUSH event was NOT to the master branch')
    cmd.run('pm2 stop kucc-server', '~/code/kucc')
    cmd.run('git fetch origin master', '~/code/kucc')
    cmd.run('git reset --hard origin/master', '~/code/kucc')
    cmd.run('NODE_ENV=production npm install && npm run build:all', '~/code/kucc')
    cmd.run('pm2 start src/server.js --name kucc-server', '~/code/kucc')
    console.log('Deployment finished!')
}