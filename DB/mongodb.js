const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
    console.log('Mongo Is Connected');
}).catch((err) => {
    console.log(`error from mongo ${err}`);
})

const petSchema = new mongoose.Schema({
  Name: String,
  FavoriteFood: String
});

let pet = mongoose.model("Pet", petSchema);

module.exports = pet;