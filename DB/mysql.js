const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("user", "root", "root", {
  host: "localhost",
  dialect: "mysql"
});

sequelize
  .authenticate()
  .then(() => console.log("mysql is connected"))
  .catch((error) => console.log(error));

const user = sequelize.define("User", {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

sequelize
  .sync()
  .then(() => {
    console.log("User table created successfully!");
  })
  .catch((error) => {
    console.error("Unable to create table : ", error);
  });

const model = {};
model.user = user;

module.exports = model;
