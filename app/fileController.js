const logger = require("./logger")
const formidable = require('formidable');
const fs = require('fs')

const saveFile = async (req, nextFolder) => {
    if (nextFolder == undefined) nextFolder = ""
    return new Promise((resolve, reject) => {
        try {
            let form = formidable({});

            form.keepExtensions = true
            form.uploadDir = __dirname + '/upload/' + nextFolder

            logger.log("działa")

            form.on('fileBegin', function (name, file) {
                file.path = form.uploadDir + "/" + file.name;
                if (fs.existsSync(file.path)) file.path = form.uploadDir + "/" + Date.now() + file.name;
            })

            form.parse(req, function (err, fields, files) {
                //console.log(fields);

                //console.log("----- przesłane formularzem pliki ------");

                //console.log(files);

                resolve([files, fields])
            });
        }
        catch (error) {
            reject(error)
        }
    })
}

const saveProfile = async (req, nextFolder) => {
    if (nextFolder == undefined) nextFolder = ""
    return new Promise((resolve, reject) => {
        try {
            let form = formidable({});

            form.keepExtensions = true
            form.uploadDir = __dirname + '/upload/' + nextFolder

            logger.log("działa")

            form.on('fileBegin', function (name, file) {
                file.path = form.uploadDir + "/" + "profile.jpg";
            })

            form.parse(req, function (err, fields, files) {
                logger.warn(files)
                //console.log(fields);

                //console.log("----- przesłane formularzem pliki ------");

                //console.log(files);

                resolve([files, fields])
            });
        }
        catch (error) {
            reject(error)
        }
    })
}

const getProfilePic = (login, res) => {
    let path = __dirname + '/upload/' + login
    fs.readFile(path + "/profile.jpg", function (err, content) {
        if (err) {
            res.writeHead(400, { 'Content-type': 'text/html' })
            console.log(err);
            res.end("No such image");
        } else {
            //specify the content type in the response will be an image
            res.writeHead(200, { 'Content-type': 'image/jpg' });
            res.end(content);
        }
    });
}

const getPicByID = (path, res) => {
    fs.readFile(path, function (err, content) {
        if (err) {
            res.writeHead(400, { 'Content-type': 'text/html' })
            console.log(err);
            res.end("No such image");
        } else {
            res.writeHead(200, { 'Content-type': 'image/jpg' });
            res.end(content);
        }
    });
}



module.exports = { saveFile, saveProfile, getProfilePic, getPicByID }