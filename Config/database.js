const mongoose = require('mongoose');

async function connect (){
    try {
        await mongoose.connect(URL_MONGOOSE_ONLINE);
        console.log("Connect with data successfully");
    } catch (error) {
        console.log("Connect with data fail !");
    }
}

module.exports = connect;