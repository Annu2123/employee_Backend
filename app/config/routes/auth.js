const express =require('express');
const { usersControll } = require('../../controllers/users');
const router= express.Router();

router.post("/register",usersControll.register)
router.post("/login",usersControll.login)
module.exports=router;