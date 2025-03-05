const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

const userSchema= new mongoose.Schema({
    fullname:{
        firstname:{
            type: String,
            required: true,
        },

    lastname:{
            type: String,
        }
    },

    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true
        // match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,'Please enter a valid email']
    },

    password:{
        type: String,
        required: true,
        select: false
    },

    socketId:{
        type: String,
    }

});

userSchema.methods.generateAuthToken= function(){
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
}

userSchema.methods.comparePassword= async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}

userSchema.statics.hashPassword= async function(password){
    return await bcrypt.hash(password,10);
}

const userModel=mongoose.model('user',userSchema);
module.exports=userModel;