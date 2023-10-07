const tagsRawArray = ["#love", "#instagood", "#fashion", "#photooftheday", "#art", "#photography", "#instagram", "#beautiful", "#picoftheday", "#nature", "#happy", "#cute", "#travel", "#style", "#followme", "#tbt", "#instadaily", "#repost", "#like4like", "#summer", "#beauty", "#fitness", "#food", "#selfie", "#me", "#instalike", "#girl", "#friends", "#fun"]
let tags = []
const logger = require("./logger")

const objectTags = () => {
    tags = []
    tagsRawArray.map((val, ind) => {
        let temp = {}
        temp.id = ind,
        temp.val = val,
        temp.popularity = Math.floor(Math.random() * 20);
        tags.push(temp)
    })
    return tags
}

const getOneTag = (req) => {
    const input = req.split("/").at(-1)
    let chosen = 0;
    tags.forEach(element => {
        logger.log(element)
        if (element.id == input) {
            chosen = element
        }
    });
    if (chosen == 0) return { status: "error element not found" }
    else return chosen
}
const addOneTag = (data) => {
    if(!tagsRawArray.includes(data.name)){
    tagsRawArray.push(data.name)
    tags.push({id: tags.length, val: data.name, popularity: Math.floor(Math.random() * 20) })
    return "sucess"
    }
    else{
        return "tag is already added"
    }
}


module.exports = { tagsRawArray, objectTags, getOneTag, addOneTag}