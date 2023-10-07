const model = require("./model")
const userController = require("./userController")
const logger = require("./logger")


const userRouter = async (req, res) => {
    if (req.method == "POST" && req.url == "/api/user/register/") {
        let body = await model.getUrldata(req)
        let response = await userController.registerUser(body)
        res.end(JSON.stringify(response, null, 5))
    }
    if (req.method == "GET" && req.url.match(/\/api\/user\/confirm\/(.*)/)) {
        const input = req.url.split("/").at(-1)
        let response = await userController.activateUser(input)
        res.end(JSON.stringify(response, null, 5))
    }
    if (req.method == "POST" && req.url == "/api/user/login") {
        let body = await model.getUrldata(req)
        let response = await userController.loginUser(body)
        res.end(JSON.stringify(response, null, 5))
    }
    if (req.method == "GET" && req.url == "/api/user") {
        let response = model.userTab
        res.end(JSON.stringify(response, null, 5))
    }

}




module.exports = userRouter