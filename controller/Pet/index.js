const pet = require("../../DB/mongodb");
const client = require("../../DB/redis");

const addPet = async (req, res) => {
  const { Name, FavoriteFood } = req.body;
  try {
    const Pet = await pet.findOne({ Name });
    if (Pet) {
      res.send("Pet already exists");
    } else {
      const done = pet.create({ Name, FavoriteFood });
      if (done) {
        res.send("Pet added successfully");
      } else {
        res.send("error");
      }
    }
  } catch (err) {
    console.log(err);
  }
};

const getPet = async (req, res) => {
  try {
    const Pet = await pet.find();
    res.send(Pet);
  } catch (err) {
    console.log(err);
  }
};

const getPetById = async (req, res) => {
  const { id } = req.params;
  try {
    let data = await client.get(`Pet:${id}`);
    if (data) {
       return res.send(JSON.parse(data));
    }
    let Pet = await pet.findById(id);
    if (Pet) {
      await client.set(`Pet:${id}`, JSON.stringify(Pet), { EX: 180, NX: true });
      return res.send(Pet);
    } else {
      return res.send("data not found");
    }
  } catch (err) {
    console.log(err);
  } 
};

const updatePet =async (req, res) => {
  try {
    const { Name } = req.body;
    const id = req.params.id;
    let data = await pet.findByIdAndUpdate(id, { Name });
    if (data) {
       let Pet = await pet.findById(id)
      await client.set(`Pet:${id}`, JSON.stringify(Pet),{ EX: 180, NX: true });
      res.send(Pet);
        } else {
          res.json({ message: "Data not found" });
        }
  } catch (err) {
    console.log(err);
  }

};

const deletePet = async (req, res) => {
  try {
    const id = req.params.id;
    let data = await pet.findByIdAndDelete(id);
      if (data) {
        client.del(`Pet:${id}`);
        res.send({ message: "Data deleted successfully" });
      } else {
        res.send({ message: "Data not found" });
      }
  } catch (error) {
    console.log(error);
  } 
};

module.exports = {
  addPet,
  getPet,
  getPetById,
  updatePet,
  deletePet,
};
