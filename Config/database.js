const mongoose = require('mongoose');

async function connect (){
    try {
        await mongoose.connect(process.env.URL_MONGOOSE);
        console.log("Connect with data successfully");
    } catch (error) {
        console.log("Connect with data fail !");
    }
}

module.exports = connect;