const getUserData = require("./getUserData");


function getDataById(id){
    console.log(id)
    const allUser=getUserData();
    const existed=allUser.filter(user=>user._id !== id)
    return existed
}

module.exports=getDataById;