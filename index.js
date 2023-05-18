const express = require('express');
require('dotenv').config();
const {Pet} = require('./routes/index');
const {User} = require('./routes/index');
const { External } = require('./routes/index');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(Pet);
app.use(User);
app.use(External);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`server is started at port ${PORT}`);
});