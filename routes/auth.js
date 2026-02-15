const express = require('express');
const router = express.Router();
const Auth = require('../models/Auth')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'vipadmin@akhuwatfoundation36'

router.post("/createuser",  async (req, res)=>{
   
   //Finding email exist or not
   try {
   const salt = await bcrypt.genSalt(10);
   const secPass = await bcrypt.hash(req.body.password, salt)
   user = await Auth.create({
    username: req.body.username,
    password: secPass,
})
const data = {
    user:{
        id: user.id
    }
}

const authtoken = jwt.sign(data, JWT_SECRET);
succes= true;
res.json({succes, authtoken: authtoken})
} catch (error) {
    console.error(error.message)
    res.status(500).send("Internal Server Error")
}
})



router.post("/login", async (req, res)=>{
const {username, password} = req.body;
try {
    let user = await Auth.findOne({username})
    if(!user){
        succes = false;
        return res.status(400).json({succes, errors: "Please try to login with correct credentials" })
    }
// user.password is the password of above user email password for comparing
    const passCompare = await bcrypt.compare(password, user.password)
    if(!passCompare){
        succes = false;
        return res.status(400).json({succes, errors: "Please try to login with correct credentials" })
    }

    const data = {
        user:{
            id: user.id
        }
    }
    const authtoken = jwt.sign(data, JWT_SECRET)
    succes = true;
    res.json({succes, authtoken: authtoken})
} catch (error) {
    console.error(error.message)
    res.status(500).send("Internal Server Error")
}
})




module.exports = router; 