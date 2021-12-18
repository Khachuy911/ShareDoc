const documentRoute = require("./documentRoute");
const examRoute = require("./examRoute");
const errorHandle = require("../Middleware/errorHandle");
const authRoute = require("./authRoute");
const userRoute = require("./userRoute");

function route(app){
    app.use("/api/v1/auth", authRoute);
    app.use("/api/v1/exam", examRoute);
    app.use("/api/v1/document", documentRoute);
    app.use("/api/v1/user", userRoute);
    app.use(errorHandle);
}

module.exports = route;