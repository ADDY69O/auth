const mongoose = require('mongoose')
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    email:{
        type:String,
        minlength:[1,"Email should not be null"],
        
        unique: true,
        require:true
    },
    password:{
        type:String,
       
        require:true
    },
    phone:{
        type:Number,
        minlength:[10,"Phone Number should be of 10 digits"],
        maxlength:[10,"Phone Number should be of 10 digits"],
        unique:true,
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
