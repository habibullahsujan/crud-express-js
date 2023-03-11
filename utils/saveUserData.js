const fs = require("fs");
const path = require("path");

const dirPath = path.join(__dirname, "../public");

const fileName = `${dirPath}\\data.json`;
const saveUserData = (data) => {
  const stringifyData = JSON.stringify(data);
  fs.writeFileSync(fileName, stringifyData);
};
module.exports = saveUserData;
