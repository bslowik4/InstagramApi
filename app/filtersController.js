const photoData = require("./jsonController");
const sharp = require("sharp");


const metaData = (id) => {
    let result;
    photoData.controller.forEach(element => {
        if (element.id == id)
            result = new Promise(async (resolve, reject) => {
                try {
                    if (element.url) {
                        let meta = await sharp(element.url)
                            .metadata()
                        console.log(meta)
                        resolve(meta)
                    }
                    else {
                        resolve("url_not_found")
                    }

                } catch (err) {
                    reject(err.mesage)
                }
            })
    });
    return result
}

const useFilter = (data) => {
    photoData.controller.forEach(element => {
        if (element.id == data.id) {
            let helparray = element.url.split(".")
            let fileExtension = helparray.pop()
            let fileName = helparray.join('.') + "-" + data.filterType + "." + fileExtension;
            element.history.push({ status: data.filterType, timestamp: Date.now(), url: fileName })
            element.lastChange = data.filterType
            return new Promise(async (resolve, reject) => {
                try {
                    if (element.url) {
                        switch (data.filterType) {
                            case 'rotate':
                                await sharp(element.url)
                                    .rotate(data.value)
                                    .toFile(fileName);
                                break;
                            case 'resize':
                                await sharp(element.url)
                                    .resize({
                                        width: data.width,
                                        height: data.height
                                    })
                                    .toFile(fileName);
                                break;
                            case 'reformat':
                                let reformatName = helparray.join('.') + "-" + data.filterType + "." + data.value;
                                element.history.pop()
                                element.history.push({ status: data.filterType, timestamp: Date.now(), url: reformatName })
                                await sharp(element.url)
                                    .toFormat(data.value)
                                    .toFile(reformatName);
                                break;
                            case 'crop':
                                await sharp(element.url)
                                    .extract({ width: data.width, height: data.height, left: data.left, top: data.top })
                                    .toFile(fileName);
                                break;
                            case 'grayscale':
                                await sharp(element.url)
                                    .grayscale()
                                    .toFile(fileName);
                                break;
                            case 'flip':
                                await sharp(element.url)
                                    .flip()
                                    .toFile(fileName);
                                break;
                            case 'flop':
                                await sharp(element.url)
                                    .flop()
                                    .toFile(fileName);
                                break;
                            case 'negate':
                                await sharp(element.url)
                                    .negate()
                                    .toFile(fileName);
                                break;
                            case 'tint':
                                await sharp(element.url)
                                    .tint({ r: data.r, g: data.g, b: data.b })
                                    .toFile(fileName);
                                break;
                        }
                        element.url = fileName
                        resolve(element.id)
                    }
                    else {
                        resolve("url_not_found")
                    }
                } catch (err) {
                    reject(err.mesage)
                }
            })
        }
    });
}

module.exports = { metaData, useFilter }