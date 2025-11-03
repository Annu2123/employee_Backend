const User=require("../models./users");
const usersLoginValidation={
email:{
    trim:true,
    normalizeEmail:true,
    notEmpty:{
        errorMesage:"Email is required"
    },
    isEmail:{
        errorMessage:"Inavlide Email format"
    }
}   ,
password:{
    notEmpty:{
        errorMessage:"password is required"
    },
    isLength:{
        option: [{min:5,max:128}],
        errorMessage:"password length must be greater thn 5 and less than 128 characters"
    }
}
}
module.exports={usersLoginValidation}