const route = require("express").Router();
const { addUser, getUser, getUserById, deleteUser, updateUser } = require("../../controller/User/index");
route.get("/users", getUser);
route.post("/users", addUser);
route.get("/users/:id", getUserById);
route.patch("/users/:id", updateUser);
route.delete("/users/:id", deleteUser);

module.exports = {
  User : route
};
