const Config = require("./config")
const axios = require("axios")
const moment = require("moment")
const chalk = require("chalk")

module.exports = {
    redeploy: async function(){
        let config = Config.load()
        if (!config["rancher-url"]) {
            console.log(chalk.red("No rancher url specified"))
            process.exit(0)
        }
        
        let token = process.env.RANCHER_TOKEN

        if (!token) {
            console.log(chalk.red("No token found in environment, set token in RANCHER_TOKEN as a environment variable"))
            process.exit(0)
        }




        let {data} = await axios.get(config["rancher-url"], {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).catch(({response}) => {
            console.log(chalk.red("Something went wrong... " + JSON.stringify(response.data, null, 4)))
            process.exit(0)
        })
        data.annotations["cattle.io/timestamp"] = moment(Date.now()).format("YYYY-MM-DDTHH:mm:ssZ")
        
        await axios.put(config["rancher-url"], data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).catch(({response}) => {
            console.log(chalk.red("Something went wrong... " + JSON.stringify(response.data, null, 4)))
            process.exit(0)
        })


        console.log(chalk.green("Deployed successfully to rancher!"))
    }
}