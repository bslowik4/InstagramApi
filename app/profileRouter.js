const model = require("./model")
const logger = require("./logger")
const profileController = require("./profileController")
const fileController = require("./fileController")

const profileRouter = async (req, res) => {
    if (req.method == "GET" && req.url == "/api/profile") {
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            let token = req.headers.authorization.split(" ")[1]
            let userLogin = await model.verifyToken(token)
            let response = profileController.getUserDataByLogin(userLogin)
            res.end(JSON.stringify(response, null, 5))
        }
        else res.end("no token")
    }
    if (req.method == "PATCH" && req.url == "/api/profile") {
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            let token = req.headers.authorization.split(" ")[1]
            let userLogin = await model.verifyToken(token)
            let data = await model.getUrldata(req)
            data.login = userLogin
            let response = profileController.updateUserInfo(data)
            res.end(JSON.stringify(response, null, 5))
        }
        else res.end("no token")
    }
    if (req.method == "POST" && req.url == "/api/profile") {
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            let token = req.headers.authorization.split(" ")[1]
            let userLogin = await model.verifyToken(token)
            fileController.saveProfile(req, userLogin)
            let response = "all good"
            res.end(JSON.stringify(response, null, 5))
        }
        else res.end("no token")
    }
    if (req.method == "POST" && req.url == "/api/profile/pic") {
        let data = await model.getUrldata(req)
        let response = fileController.getProfilePic(data.login, res)
    }
}



module.exports = profileRouter
