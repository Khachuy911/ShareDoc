const express = require("express");
const app = express();
const dotenv = require("dotenv");
const db = require("./Config/database");
const route = require("./Routes/index");
const path = require("path");
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');

//Connect dotenv
dotenv.config();
//connect db
db();
const port = process.env.PORT || 3000;

//view engine
app.set("view engine", "ejs");
//body-parser
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser())

app.use(express.static(path.join(__dirname,"Public")));

//use PUT/ DELETE 
app.use(methodOverride('_method'));

route(app);


app.listen(port, ()=>{console.log(`🎄🎄Server running with http://localhost:${port}`)})
