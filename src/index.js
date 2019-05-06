const git = require('git-state')
const chalk = require("chalk")
const Config = require("./modules/config")
const Rancher = require("./modules/rancher")
const exec = require("./modules/exec")

global.initial_cwd = process.cwd()
process.chdir(process.cwd());

if (process.argv[2]) {
    process.chdir(process.argv[2]);
} else {
    process.chdir(process.cwd());
}

(async function(){
    let config = Config.load()
    if (!config["image-tag"]) {
        console.log(chalk.red("Image tag needs to be specified"))
        process.exit(0)
    }

    if (git.isGitSync(process.cwd())){
        let status = git.checkSync(process.cwd())
        if (status.ahead || status.dirty){
            console.log(chalk.red("You need to push before deploying!"))
            process.exit(0)
        }
    }

    await exec(`docker build -t ${config["image-tag"]} .`, {stdout: true})
    await exec(`docker push ${config["image-tag"]}`, {stdout: true})

    await Rancher.redeploy()

})()
