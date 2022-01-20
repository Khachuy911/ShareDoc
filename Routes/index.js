const documentRoute = require("./documentRoute");
const examRoute = require("./examRoute");
const errorHandle = require("../Middleware/errorHandle");
const authRoute = require("./authRoute");
const userRoute = require("./userRoute");
const subjectRoute = require("./subjectRoute");
const projectRoute = require("./projectRoute");

function route(app){
    app.use("/", subjectRoute)
    app.use("/auth", authRoute);
    app.use("/exam", examRoute);
    app.use("/project", projectRoute);
    app.use("/document", documentRoute);
    app.use("/user", userRoute);
    app.use(errorHandle);
}

module.exports = route;