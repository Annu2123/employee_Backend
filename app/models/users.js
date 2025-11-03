const {Schema,model} = require('mongoose');
const UserRegisterSchema=new Schema({
    username:String,
    email:{type:String,
        required:true,
        unique:true
    }, 
    password:String,
        
    role:{type:String,default:'user'},
    isVerified:{type:Boolean,default:false}
},{timestamps:true});
const User=model('User',UserRegisterSchema);
module.exports=User;