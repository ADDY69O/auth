const express = require('express');
const router=express.Router();

const {Login,Register}=require('../controllers/userControllers')

router.route('/register').post(Register);
router.route('/login').post(Login);



module.exports=router;






