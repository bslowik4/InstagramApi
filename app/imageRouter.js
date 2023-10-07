const fileController = require("./fileController")
const jsonController = require("./jsonController")
const model = require("./model")
const logger = require("./logger")


const imageRouter = async (req, res) => {
    if (req.method == "POST" && req.url == "/api/photos") {
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            let token = req.headers.authorization.split(" ")[1]
            let userLogin = await model.verifyToken(token)
            let data = await fileController.saveFile(req, userLogin)
            let response = jsonController.jsonController(data)
            res.end(JSON.stringify(response, null, 5))
        }
        else res.end("no token")

    }
    if (req.method == "GET" && req.url == "/api/photos") {
        res.end(JSON.stringify(jsonController.controller, null, 5))
    }
    if (req.method == "POST" && req.url == "/api/photos/getPicture") {
        let data = await model.getUrldata(req)
        let path = jsonController.getPhotoPath(data.id)
        let response = fileController.getPicByID(path, res)
    }
    if (req.method == "GET" && req.url.match(/\/api\/photos\/([0-9]+)/)) {
        let data = jsonController.getRequestData(req.url)
        res.end(JSON.stringify(data, null, 5))
    }
    if (req.method == "DELETE" && req.url.match(/\/api\/photos\/([0-9]+)/)) {
        let data = jsonController.deleteRequest(req.url)
        res.end(JSON.stringify(data, null, 5))
    }
    if (req.method == "PATCH" && req.url == "/api/photos") {
        let body = await model.getUrldata(req, res)
        let dataEnd = jsonController.patchRequest(body)
        res.end(JSON.stringify(dataEnd, null, 5))
    }
    if (req.method == "PATCH" && req.url == "/api/photos/tags") {
        let body = await model.getUrldata(req, res)
        jsonController.addTagToPhoto(body)
        let response = jsonController.getPhotoById(body.id)
        res.end(JSON.stringify(response, null, 5))
    }
    if (req.method == "PATCH" && req.url == "/api/photos/tags/mass") {
        let body = await model.getUrldata(req, res)
        jsonController.addTagsToPhoto(body)
        let response = jsonController.getPhotoById(body.id)
        res.end(JSON.stringify(response, null, 5))
    }
    if (req.method == "GET" && req.url.match(/\/api\/photos\/tags\/([0-9]+)/)) {
        const input = req.url.split("/").at(-1)
        let response = jsonController.getTagsfromPhoto(input)
        res.end(JSON.stringify(response, null, 5))
    }
}



module.exports = imageRouter
