const documentRoute = require("./documentRoute");
const examRoute = require("./examRoute");
const errorHandle = require("../Middleware/errorHandle");
const authRoute = require("./authRoute");
const userRoute = require("./userRoute");
const subjectRoute = require("./subjectRoute");
const projectRoute = require("./projectRoute");

function route(app){
    app.use("/api/v1/subject", subjectRoute)
    app.use("/api/v1/auth", authRoute);
    app.use("/api/v1/exam", examRoute);
    app.use("/api/v1/project", projectRoute);
    app.use("/api/v1/document", documentRoute);
    app.use("/api/v1/user", userRoute);
    app.use(errorHandle);
}

module.exports = route;