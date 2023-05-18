const { Pet } = require('../routes/Pet/index');
const { User } = require("../routes/User/index");
const { External } = require('../routes/ExternalService/index');

module.exports = {
    Pet,
    User,
    External
}