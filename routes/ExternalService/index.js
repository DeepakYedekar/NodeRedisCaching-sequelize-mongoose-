const route = require("express").Router();
const {weatherApi} = require("../../controller/ExternalService/index");
route.get("/weather/:city", weatherApi)

module.exports = {
    External: route,
};
