const mongoose = require('mongoose');
const mongoURI = "mongodb://0.0.0.0:27017/iNotebook";

// mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false

function connectToMongo(){
    // await mongoose.connect(mongoURI).then(()=>console.log("Connected to mongo successfully")).catch(err=>console.log(err));
    // console.log("Connected successfully");

    mongoose.connect(mongoURI).then(()=>console.log("Connected successfully")).catch(()=>console.log("error"));
};

module.exports = {connectToMongo};
