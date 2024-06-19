const mongoose = require('mongoose');

async function DataBaseConnection(DBurl){
    return mongoose.connect(DBurl);
}

module.exports = DataBaseConnection;
