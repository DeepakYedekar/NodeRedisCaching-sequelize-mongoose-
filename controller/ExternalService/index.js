const axios = require("axios");
const client = require("../../DB/redis");

const weatherApi = async (req, res) => {
  try {
    let { city } = req.params;
    let data = await client.get(`weather:${city}`);
    if (data) return res.send(JSON.parse(data));
    else {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=${process.env.KEY}&q=${city}`
      );
      await client.set(`weather:${city}`, JSON.stringify(response.data), { EX: 180, NX: true });
      return res.send(response.data);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
    weatherApi
}