const mongoose = require('mongoose');

var envJSON = require('./config.json');

var node_env = process.env.NODE_ENV || 'development';

var host = envJSON[node_env].DB_HOST;
var puerto = envJSON[node_env].DB_PORT;
var db_name = envJSON[node_env].BD_NAME;


mongoose.connect(`mongodb://${host}:${puerto}/${db_name}`, { useNewUrlParser: true }, (err) => {
    if (!err)
        console.log('MongoDB connection succeded...');
    else
        console.log('Error in DB connection: ' + JSON.stringify(err, undefined, 2));
});

module.exports = mongoose;