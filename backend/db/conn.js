const mongoose = require('mongoose')

const DB = process.env.DB ;

mongoose.connect(DB,{} ).then(()=> console.log("DB Connected Successfully")).catch((err)=> console.log("error while connection"));


