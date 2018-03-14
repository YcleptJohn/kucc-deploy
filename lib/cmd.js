const cmd = module.exports = {}
const exec = require('child_process').execSync

cmd.run = (cmnd, path) => {
    console.log(`\nRunning command: (in ${path || process.cwd()})`)
    console.log(`$`, cmnd)
    let result = exec(cmnd, {
        cwd: path || process.cwd()
    })
    result = result.toString()
    console.log(result)    
    return result
}