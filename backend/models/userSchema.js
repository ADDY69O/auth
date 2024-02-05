const mongoose = require('mongoose')
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
       
        require:true
    },
    phone:{
        type:Number,
        require:true
    }

})

userSchema.pre('save',async function(next){
   if(this.isModified('password')){
    this.password = await bcrypt.hash(this.password, 12);
   }
   next();
})



const User = mongoose.model("User",userSchema);

module.exports = User;
