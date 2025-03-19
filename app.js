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
const path = require('path');



app.get('/', (req, res) => {
    res.send('<h1 style = "color:red"> API CATATAN </h1> ')
})



// Endpoint buat akses dokumentasi
const docPath = path.join(__dirname, 'documentation.md');
app.get('/documentation', (req, res) => {
    try {
        // Baca file documentation.md
        const markdownContent = fs.readFileSync(docPath, 'utf-8');

        // Convert ke HTML
        const htmlContent = marked.parse(markdownContent);

        // Kirim HTML ke client
        res.send(htmlContent);
    } catch (error) {
        console.error('Error baca documentation.md:', error.message);
        res.status(500).send('Documentation not found');
    }
});


app.use(morgan('combined'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', router);
app.use(cors({ origin: '*' }));



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})