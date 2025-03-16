const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT
const cors = require('cors');
const router = require('./src/routes/userRoutes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', router);
app.use(cors());

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})