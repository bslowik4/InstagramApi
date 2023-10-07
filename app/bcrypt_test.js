const bcrypt = require('bcryptjs');
const pass = "moje tajne hasło"

const encryptPass = async (password) => {

    let encryptedPassword = await bcrypt.hash(password, 10);
    //console.log({ encryptedPassword: encryptedPassword });
}

encryptPass(pass)


const decryptPass = async (userpass, encrypted) => {

    let decrypted = await bcrypt.compare(userpass, encrypted)
    console.log(decrypted);

}

decryptPass("b", "$2a$10$rtL9RKrQxrnoBDGXY91EPexmh6lBv2/tjykMoVV0WlU30rcfFkfyi")