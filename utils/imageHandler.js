const fs = require ("fs");
const uuid = require ("node-uuid");
const saveImage = (file) =>{
    const extensionAllow = ["jpeg","jpg", "png"];
    let fileNameResult = "";
    const {mimetype, filename} = file;
    const extension = mimetype.split ("/") [1];
    if (extensionAllow.includes(extension)){
        const uid = uuid();
        const fileNameTmp = `./public/tmp/${filename}`;
        fileNameResult = `${uid}.${extension}`;
        const fileNameOut = `./public/images/${fileNameResult}`;
        fs.createReadStream(fileNameTmp).pipe(fs.createWriteStream(fileNameOut));
        fs.unlink(fileNameTmp, (error) => console.log(error));
        return fileNameResult;
    };
};

module.exports = {saveImage}