const model = require("./model")
const filtersController = require("./filtersController")
const logger = require("./logger")


const filterRouter = async (req, res) => {
    if (req.method == "GET" && req.url.match(/\/api\/filters\/metadata\/([0-9]+)/)) {
        const input = req.url.split("/").at(-1)
        let response = await filtersController.metaData(input)
        res.end(JSON.stringify(response, null, 5))
    }
    if (req.method == "POST" && req.url == "/api/filters") {
        let body = await model.getUrldata(req, res)
        console.log(body)
        let response = filtersController.useFilter(body)
        res.end(JSON.stringify(response, null, 5))
    }

}




module.exports = filterRouter