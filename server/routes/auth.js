require('dotenv').config();
const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");
const transporter=require('../mail/transporter')
const isActive = require("../middleware/confirmEmails");
const moment = require("moment");
const Event = require("../models/Events")
const Post = require('../models/Post')

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const nodemailer=require("nodemailer")

router.get ('/profile',isActive(),(req,res,next)=>{
  Post.find({author: req.user._id}).then(function(allMyPostsPayload){
    res.status(200).json({allMyPosts: allMyPostsPayload})
  })
  
})


router.post("/login", function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return res.status(500).json({message: "Error login"}) }
    if (!user) { return res.status(500).json({message: "Error login"}) }

    req.logIn(user, function(err) {
      console.log(user)
      if (err) { return res.status(500).json({message: "Error login"}) }
      return res.status(200).json(user);
    });
  })(req, res, next);
});



router.post("/signup", (req, res, next) => {
  console.log("entra")
  const username = req.body.username;
  const password = req.body.password;
  const confpass = req.body.confpass;
  const email = req.body.email;

  const createdAt=req.body.createdAt;
  const updatedAt=req.body.updatedAt;
  
  
  if (confpass!==password){
    
    res.status(500).json({ messageWrongPass: "wrong password when you try to confirm" })
    return
  }

  if (username === "" || password === "") {
    res.status(500).json({ message: "Indicate username and password" });
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.status(500).json({ message: "The username already exists" })
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);
    const hashPassConf = bcrypt.hashSync(confpass,salt)
    const newUser = new User({
      username,
      password: hashPass,
      email,
      confpass:hashPassConf
    });
      
    newUser.save()
    .then((user) => {
      transporter.sendMail({
        from: 'Miguel <migueliron166@gmail.com>',
        to: email,
        subject: 'Confirmation message',
        text: 'Confirmation message',
        html: `<h1>WELCOME TO SKATE-SOCIETY</h1>
        <img src="https://cdn.pixabay.com/photo/2015/06/25/16/54/skater-821502_960_720.jpg"></img>
        <p> To confirm you have logged in our web click in the link below </p>
        <a href="http://localhost:3000/auth/confirm/${encodeURIComponent(newUser.confpass)}">CONFIRM<a>`,
      }
    ).then(() => {
      res.status(200).json(user)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: "Something went wrong" });
    })
  });
});
});

router.get("/confirm/:confpass", (req, res) => {
  User.find({ confpass: req.params.confpass })
    .then((user) => {
      if (user !== null) {
        let status = "Active"
        User.findByIdAndUpdate(user[0]._id, { status })
          .then((user) => {
            res.status(200).json({ message: "Confirmation Successful" });
          })
          .catch((err) => {
            res.status(500).json({message: `Confirmation FAILED. Please check that everything is in order at the nodemailer. 
        Error: ${err}`
            });
            return err
          })
      }
    })
    .catch((err) => {
      return err
    })
})


router.get("/logout", (req, res) => {
  req.logout();
  res.status(200).json({msg:"logout"});
});

router.get("/loggedin", (req, res) => {
  if(req.isAuthenticated()){
    res.status(200).json({user:req.user})
  } else {
    res.status(500).json({msg:"No authenticated"})
  }
})
module.exports = router;
