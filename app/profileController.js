const model = require("./model")
const logger = require("./logger")

const getUserDataByLogin = (login) => {
    for (let i = 0; i < model.userTab.length; i++) {
        const element = model.userTab[i];
        if (element.email == login) return { name: element.name, lastName: element.lastName, mail: element.email }
    }
}

const updateUserInfo = (data) => {
    for (let i = 0; i < model.userTab.length; i++) {
        const element = model.userTab[i];
        if (element.email == data.login) {
            element.name = data.name
            element.lastName = data.lastName
            return element
        }
    }
}


module.exports = { getUserDataByLogin, updateUserInfo }