const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = "Rashiis@prettygirl";
const fetchuser = require('../middleware/fetchUser');


//ROUTE 1

//Create a User using: POST "/api/auth/createUser". Doesnt require auth. No login required
router.post('/createUser', [
    body('name', 'Enter a valid name.').isLength({ min: 3 }),
    body('email', 'Enter a valid e-mail ID').isEmail(),
    body('password', 'Password must be atleast 5 characters long').isLength({ min: 5 })
], async (req, res) => {
    let success=false;
    //if there are errors, return Bad request and the errors

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() });
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        });

        const data = {
            user: {
                id: user.id
            }
        };

        const authtoken = jwt.sign(data, JWT_SECRET);
        success=true;
        res.json({success,authtoken});

    }
    catch (error) {
        if (error.code === 11000) {
            //duplicate key error
            return res.status(400).json({success, error: "Email Already exists" });

        }
        console.log(error);
        res.status(500).json({success, error: "Some error occured" });
    }
    // User.create({
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: req.body.password
    // }).then(user => res.json(user));

}
    // console.log(req.body);
    // const user = User(req.body);
    // user.save();

    //     res.send(req.body);
);


//--------------------------------------------------------------------------------------------------------------------------------------
//ROUTE 2

//Authenticate a user: POST "/api/auth/login". NO LOGIN REQUIRED
router.post('/login', [
    
    body('email', 'Enter a valid e-mail ID').isEmail(),
    body('password','Password cannot be blank').exists()

], async (req, res) => {
    let success=false;
    //if there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errorss: errors.array() });
    }

    const {email,password} = req.body;
    try{
        let user = await User.findOne({email});
        if(!user){
            success=false;
            return res.status(400).json({error:"Please try to login with correct credentials"});
        }
        const passwordCompare = await bcrypt.compare(password,user.password);
        if(!passwordCompare){
            success=false;
            return res.status(400).json({success, error:"Please try to login with correct credentials"});
        }
        const data = {
            user:{
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        success=true;
        res.json({success, authtoken});
    }
    catch(error){
        console.log(error);
        res.status(500).json({ error: "Some error occured" });

    }


})





//---------------------------------------------------------------------------------------------------------------------
//ROUTE 3
//Get logged in user details using: POST. LOGIN REQUIRED
router.post('/getUser', fetchuser, async (req, res) => {

try {
    userId=req.user.id;
    const user=await User.findById(userId).select("-password");
    res.send(user);
    
} catch (error) {
    console.log(error);
    res.status(500).json("Some error occured");
    
}
});


module.exports = router;