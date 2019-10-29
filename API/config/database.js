//Set up mongoose connection
console.log('in db config');
const mongoose = require('mongoose');
const mongoDB = 'mongodb://admin:admin@cluster0-shard-00-00-zxq5m.mongodb.net:27017,cluster0-shard-00-01-zxq5m.mongodb.net:27017,cluster0-shard-00-02-zxq5m.mongodb.net:27017/ljackdb?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority';

mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;

module.exports = mongoose;
/*const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));*/