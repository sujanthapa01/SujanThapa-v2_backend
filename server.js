require('dotenv').config();
const express = require('express');
const DataBaseConnection= require('./connection.js')
const app = express();
const router = require('./Routes/router.js');

const DataBaseURL = process.env.DATA_BASE_URL;
DataBaseConnection(DataBaseURL).then(() =>{
	console.log("DataBase Connected sucessfully");
})

app.use(express.json());
app.use('/', router);


const PORT = process.env.SERVER_PORT ;
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));