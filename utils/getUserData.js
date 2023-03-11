const fs = require("fs");
const path = require("path");

const dirPath = path.join(__dirname, "../public");

const fileName = `${dirPath}\\data.json`;

const getUserData=()=>{
    const userData=fs.readFileSync(fileName);
    return JSON.parse(userData)
}

module.exports=getUserData;