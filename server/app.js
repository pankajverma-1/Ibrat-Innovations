require('dotenv').config();
require('./db/conn');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./models/Router');
const dirname = path.resolve();
const port = process.env.PORT || 500;

const app = express();
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', router);

app.use(express.static(path.join(dirname, '/client/build')));
app.get('*', (req, res) =>
    res.sendFile(path.join(dirname, '/client/build/index.html'))
);

app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
});

app.listen(port, () => console.log(`server ${port}`));