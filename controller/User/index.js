const model = require("../../DB/mysql");
const client = require('../../DB/redis');

const addUser = async (req, res) => {
  const { firstName, lastName, age } = req.body;
  try {
    const User = await model.user.findOrCreate({
      where: { firstName: firstName, lastName: lastName,age:age}
    });
    res.send("User added successfully");
  } catch (err) {
    console.log(err);
  }
};

const getUser = async (req, res) => {
  try {
    let User =await model.user.findAll();
    res.send(User); 
  } catch (err) {
    console.log(err);
  } 
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    let data = await client.get(`user:${id}`);
    if (data) {
      return res.send(JSON.parse(data));
    }
    const User = await model.user.findOne({where:{id:id}})
    if(User){
      await client.set(`user:${id}`, JSON.stringify(User),{EX:180,NX:true});
     return  res.send(User);
    }else {
      return res.send("data not found");
    }
  } catch (err) {
    console.log(err);
  } 
};

const updateUser = async (req, res) => {
  try {
    const { firstName, lastName, age } = req.body;
    const id = req.params.id;
    const data = await model.user.findOne({ where: { id: id } });
    if (data) {
      let update = await model.user.update({ firstName, lastName, age }, { where: { id: id } });
      if (update) {
        const User = await model.user.findOne({ where: { id: id } });
        await client.set(`user:${id}`,JSON.stringify(User),{EX:180,NX:true});
        res.send(User);
      }
        } else {
          res.json({ message: "Data not found" });
        }
  } catch (err) {
    console.log(err);
  } 
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    let data=await model.user.destroy({ where: { id: id } });
    if (data) {
      await client.del(`user:${id}`);
      res.send({ message: "Data deleted successfully" });
    } else {
        res.send({ message: "Data not found" });
      }
  } catch (error) {
    console.log(error);
  } 
};

module.exports = {
  addUser,
  getUser,
  getUserById,
  updateUser,
  deleteUser
};
