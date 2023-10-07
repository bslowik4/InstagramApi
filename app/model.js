const jwt = require('jsonwebtoken');
const logger = require("./logger")
const bcrypt = require('bcryptjs');
require('dotenv').config();
const secrectKey = process.env.SECRECT_KEY
let userTab = []
let userEmailTab = []

const getUrldata = async (req) => {
    return new Promise((resolve, reject) => {
        try {
            let body = "";
            req.on("data", function (data) {
                body += data.toString();
                console.log(JSON.parse(body))
                resolve(JSON.parse(body))
            })
        }
        catch (error) {
            reject(error)
        }
    })
}


const encryptPass = async (password) => {

    let encryptedPassword = await bcrypt.hash(password, 10);
    return encryptedPassword
}

const decryptPass = async (userpass, encrypted) => {

    let decrypted = await bcrypt.compare(userpass, encrypted)
    return decrypted
}


const createToken = async (data) => {
    let token = jwt.sign(
        {
            name: data.name,
            lastName: data.lastName,
            email: data.email,
            password: data.password
        },
        secrectKey,
        {
            expiresIn: "1h" // "1m", "1d", "24h"
        }
    );
    logger.log({ token: token });
    return token
}

const createTokenLogin = async (email) => {
    let token = jwt.sign(
        {
            email: email
        },
        secrectKey,
        {
            expiresIn: "1h" // "1m", "1d", "24h"
        }
    );
    logger.log({ token: token });
    return token
}

const verifyToken = async (token) => {
    try {
        let decoded = jwt.verify(token, process.env.SECRECT_KEY)
        logger.log({ decoded: decoded });
        return decoded.email
    }
    catch (ex) {
        logger.log({ message: ex.message });
        return ex.message
    }
}







module.exports = { getUrldata, encryptPass, decryptPass, userTab, userEmailTab, createToken, verifyToken, createTokenLogin }