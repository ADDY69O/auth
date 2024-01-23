const express = require("express");

const dotenv = require("dotenv");
const cors = require("cors")

const app = express();
app.use(cors());
app.use(express.json());

dotenv.config({path:"./config.env"})

//conection with database
require("./db/conn.js")


//api calls
app.use('/api/v1/user',require('./routes/userRoutes'))

const PORT = process.env.PORT || 5000;


app.listen( PORT ,(req,res)=>{
    console.log(`listening on PORT ${PORT}`)
})