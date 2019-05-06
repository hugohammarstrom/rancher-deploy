const fs = require("fs-extra")
const path = require("path")

module.exports = {
    load: function(){
        let package = fs.readJSONSync(path.resolve(process.cwd(), "./package.json"))
        if (!package["rancher-deploy"]){
            console.log(chalk.red("No config found in package.json"))
            process.exit(0)
        }

        return package["rancher-deploy"]
    }
}