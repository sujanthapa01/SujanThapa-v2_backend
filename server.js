// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const router = require('./Routes/router.js');
const DataBaseConnection = require('./connection.js');

const app = express();
const PORT = process.env.SERVER_PORT || 8000;
const DataBaseURL = process.env.DATA_BASE_URL;

DataBaseConnection(DataBaseURL).then(() => console.log("DataBase Connected Successfully"));

app.use(cors());
app.use(express.json());
app.use('/', router);

app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
