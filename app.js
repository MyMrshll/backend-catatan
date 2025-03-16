const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT
const cors = require('cors');
const router = require('./src/routes/userRoutes');
const marked = require('marked');
const fs = require('fs');
const morgan = require('morgan');
const helmet = require('helmet');


app.get('/', (req, res) => {
    res.send('<h1 style = "color:red"> API CATATAN </h1> ')
})


app.get('/documentation/auth', (req, res) => {
    const htmlContent = marked.parse(fs.readFileSync('./AUTH_API.md', 'utf-8'));
    res.send(htmlContent)
})
app.get('/documentation/notes', (req, res) => {
    const htmlContent = marked.parse(fs.readFileSync('./NOTES_API.md', 'utf-8'));
    res.send(htmlContent)
})


app.use(morgan('combined'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', router);
app.use(cors({ origin: '*' }));


app.use((req, res) => {
    res.status(404).send('Page Not Found');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})