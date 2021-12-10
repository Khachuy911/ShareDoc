const express = require("express");
const app = express();
const dotenv = require("dotenv");
const db = require("./Config/database");
const route = require("./Routes/index");
const path = require("path")
//Connect dotenv
dotenv.config();
//connect db
db();
const port = process.env.PORT || 3000;

//body-parser
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname,"Public")));

route(app);


app.listen(port, ()=>{console.log(`Server running with http://localhost:${port}`)})
