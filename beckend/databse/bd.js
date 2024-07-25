const mongoose = require('mongoose')

const connect = ()=>{
    mongoose.set("strictQuery",true)
    const db =  mongoose.connect('mongodb://127.0.0.1:27017/Kharedo');
    console.log("database connected");
    return db
}

module.exports = connect