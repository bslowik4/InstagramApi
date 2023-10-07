const logger = require("./logger")
const tagsController = require("./tagsController")
const controller = [];

const jsonController = (data) => {
    console.log(controller);
    const newFile = {
        id: Date.now(),
        album: data[1].album,
        originalName: data[0].file.name,
        url: data[0].file.path,
        lastChange: 'original',
        history: [{ status: 'original', lastModifiedDate: data[0].file.lastModifiedDate }],
        tags: []
    }
    logger.info(newFile)
    controller.push(newFile)
    return newFile
}

const getRequestData = (req) => {
    const input = req.split("/").at(-1)
    let chosen = 0;
    controller.forEach(element => {
        logger.log(element)
        if (element.id == input) {
            chosen = element
        }
    });
    if (chosen == 0) return { status: "error element not found" }
    else return chosen
}

const getPhotoById = (id) => {
    let chosen = 0
    controller.forEach(element => {
        if (element.id == id) {
            chosen = element
        }
    });
    if (chosen == 0) return { status: "error element not found" }
    else return chosen
}

const patchRequest = (data) => {
    controller.forEach(element => {
        if (element.id == data.id) {
            element.history.push({
                "status": `zmienione ${element.history.length}`,
                "timestamp": Date.now()
            })
            element.lastChange = `zmienione ${element.history.length}`
            return element;
        }
    });
    return "Completed"
}

const deleteRequest = (req) => {
    const input = req.split("/").at(-1)
    let chosen = 0;
    controller.forEach((element, index) => {
        logger.log(index)
        if (element.id == input) {
            chosen = "Sucess"
            controller.splice(index, 1)
        }
    });
    if (chosen == 0) return { status: "error element not found" }
    else return chosen
}
const addTagToPhoto = (data) => {
    controller.forEach(element => {
        if (element.id == data.id) {
            let tags = tagsController.objectTags()
            element.tags.push({ name: tags[data.tagId].val, pupularity: tags[data.tagId].popularity })
            return element;
        }
    });
    return "Completed"
}
const addTagsToPhoto = (data) => {
    let tags = tagsController.objectTags()
    data.tagId.forEach(element => {
        controller.forEach(elements => {
            if (elements.id == data.id) {
                elements.tags.push({ name: tags[element].val, pupularity: tags[element].popularity })
                return elements;
            }
        });
    })
    return "Completed"
}

const getTagsfromPhoto = (id) => {
    let chosen = 0
    controller.forEach(element => {
        if (element.id == id) {
            chosen = { id: id, tags: element.tags }
        }
    });
    if (chosen == 0) return { status: "error element not found" }
    else return chosen
}


const getPhotoPath = (id) => {
    let chosen = 0
    controller.forEach(element => {
        if (element.id == id) {
            chosen = element.url
        }
    });
    if (chosen == 0) return { status: "error element not found" }
    else return chosen
}

module.exports = { jsonController, controller, getRequestData, patchRequest, deleteRequest, addTagToPhoto, getPhotoById, addTagsToPhoto, getTagsfromPhoto, getPhotoPath }