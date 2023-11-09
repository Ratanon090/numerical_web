const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const db = require('./db.js');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get("/", (req, res) => {
    db.query("SELECT * FROM `dd`",(errgay,result)=>{
        res.json(result);
    })

})

app.listen("8081", () => {
    console.log("server start at http://localhost:8081/")
});