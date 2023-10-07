const { log } = require("console");
const logger = require("./logger")
const model = require("./model")
const fs = require('fs');
const { resolveTxt } = require("dns");

const registerUser = async (body) => {
    if (body.name !== undefined && body.lastName !== undefined && body.email !== undefined && body.password !== undefined) {
        if (!model.userEmailTab.includes(body.email)) {
            let encrypted = await model.encryptPass(body.password)
            let final = { id: model.userTab.length, name: body.name, lastName: body.lastName, email: body.email, confirmed: false, password: encrypted }
            model.userTab.push(final)
            model.userEmailTab.push(body.email)
            let tokenForUser = await model.createToken(final)
            let userFolder = __dirname + '/upload/' + body.email
            console.log(userFolder)
            logger.warn(__dirname)
            if (!fs.existsSync(userFolder)) fs.mkdirSync(userFolder);
            return `wklej poniższy link do przeglądarki http://localhost:3000/api/user/confirm/${tokenForUser} w celu potwierdzenia konta Uwaga: link jest ważny przez godzinę`
        }
        else return "Email exists"
    }
    else return "Missing data"
}

const activateUser = async (token) => {
    let mail = await model.verifyToken(token)
    model.userTab.forEach(element => {
        if (element.email == mail) {
            element.confirmed = true
        }
    });
    return mail
}

const loginUser = async (data) => {
    let status;
    let test = false;
    let token;
    for (let i = 0; i < model.userTab.length; i++) {
        const element = model.userTab[i];
        if (element.email == data.email) {
            if (await model.decryptPass(data.password, element.password)) {
                if (element.confirmed) {
                    token = await model.createTokenLogin(data.email)
                    test = true;
                    status = "logged"
                    return { token: token, status: status };
                } else return "account not validated"
            } else return "bad password"
        }
    }
    if (!test) return "bad email"
}


module.exports = { registerUser, activateUser, loginUser }