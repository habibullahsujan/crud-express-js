const fs = require("fs");
const path = require("path");
const getUserData = require("../utils/getUserData");
const saveUserData = require("../utils/saveUserData");
const getDataById = require("../utils/userData");
const getUser = require("../utils/userData");

const dirPath = path.join(__dirname, "../public");

const fileName = `${dirPath}\\data.json`;

module.exports.getARandomUser = async (req, res) => {
  const parseData = getUserData();
  const randomNumber = Math.floor(Math.random() * 10);
  const randomUser = parseData.find((user) => user.index === randomNumber);
  res.status(200).send(randomUser);
};

module.exports.getAllUser = async (req, res) => {
  const { limit } = req.query;
  const parseData = getUserData();
  const limitedData = parseData.slice(0, parseInt(limit));
  res.status(200).send(limitedData);
};

module.exports.saveUser = async (req, res) => {
  const existedData = JSON.parse(fs.readFileSync(fileName));
  const newUserData = req.body;

  if (
    newUserData.name == null ||
    newUserData.gender == null ||
    newUserData.picture == null ||
    newUserData.contact == null ||
    newUserData.address == null
  ) {
    return res.status(401).send({ error: true, msg: "User data missing" });
  }
  const findExist = existedData.find((user) => user._id === newUserData._id);
  if (findExist) {
    return res.status(409).send("user already existed");
  }

  existedData.push(newUserData);
  const stringifyData = JSON.stringify(existedData);
  saveUserData(stringifyData);
  res.send("User data added successfully");
};

module.exports.updateUser = async (req, res) => {
  const id = req.params.id;
  const { name, picture, gender, contact, address } = req.body;
  const existedData = JSON.parse(fs.readFileSync(fileName));
  let existUser = existedData.find((user) => user._id === id);
  if (!existUser) {
    return res.status(409).send("the user does not exist");
  } else {
    existUser = {
      _id: existUser._id,
      index: existUser.index,
      name: name ? name : existUser.name,
      picture: picture ? picture : existUser.picture,
      gender: gender ? gender : existUser.gender,
      contact: contact ? contact : existUser.contact,
      address: address ? address : existUser.address,
    };
  }
  const updateUser = existedData.filter((user) => user._id !== id);
  updateUser.push(existUser);
  saveUserData(updateUser);
  res.status(200).send("user updated.");
};

module.exports.updateMultipleUser = async (req, res) => {
  const usersId = req.body.updatedUsers;

  const storedUsersData = getUserData();
  let existedUserData = [];
  let allUser=[];

  usersId.forEach((user) => {
    let users = storedUsersData.find((usr) => usr._id === user._id);
    if (!users) {
      return res.status(409).send("the user does not exist");
    } else {
      users = {
        _id: users._id,
        index: users.index,
        picture: user.picture ? user.picture : users.picture,
        name: user.name ? user.name : users.name,
        contact:user.contact?user.contact:users.contact,
        gender: user.gender ? user.gender : users.gender,
        address: user.address ? user.address : users.address,
      };

    }
    existedUserData.push(users);
  });

  existedUserData.forEach(usr=>{
    const dt=storedUsersData.filter(user=>user._id !== usr._id);
    if(dt){
      allUser.push(dt)
    }
  })

console.log(allUser)
  res.send("multiple user are updated");
};

module.exports.deleteUser = async (req, res) => {
  const id = req.params.id;
  const userData = getUserData();
  const user = userData.find((user) => user._id === id);
  const deleteUser = userData.filter((user) => user._id !== id);
  if (!user) {
    return res.status(409).send("user does not exist");
  }
  saveUserData(deleteUser);
  res.send("the user are deleted");
};
