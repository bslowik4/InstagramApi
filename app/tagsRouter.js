const model = require("./model")
const tagsController = require("./tagsController")
const logger = require("./logger")


const tagsRouter = async (req, res) => {
    if (req.method == "GET" && req.url == "/api/tags/raw") {
        res.end(JSON.stringify(tagsController.tagsRawArray, null, 5))
    }
    if (req.method == "GET" && req.url == "/api/tags") {
        let data = tagsController.objectTags()
        res.end(JSON.stringify(data, null, 5))
    }
    if (req.method == "GET" && req.url.match(/\/api\/tags\/([0-9]+)/)) {
        let data = tagsController.getOneTag(req.url)
        res.end(JSON.stringify(data, null, 5))
    }
    if ((req.method == "POST") && req.url == "/api/tags") {
        console.log("teraz musi")
        let body = await model.getUrldata(req, res)
        let result = tagsController.addOneTag(body)
        res.end(JSON.stringify(result, null, 5))
    }

}



module.exports = tagsRouter
