const express = require('express');
const cors = require('cors');
require('dotenv').config();
const GlobalRouter = require('./src/app/router');
const app = express();
const port = 3001;



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/v1', GlobalRouter);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})