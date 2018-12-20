const express = require('express');
const router = express.Router();
const Post = require('../models/Post')
const User= require('../models/User')
const uploadCloud = require('../config/cloudinary');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');


  router.post('/', uploadCloud.single('photo'),(req,res,next)=>{
    console.log(req.file.url);
    const imageURL  = req.file.url;
    
  

    User.findByIdAndUpdate(req.user._id, {image:imageURL}, {new:true})
    .then(user => res.json(user))
    .catch(err => console.log(err))
    // req.user.update({$push:{image:imageURL}})
    // .then((response) => {
    //   console.log(response)
    //   res.status(200).json({message:OK});
    // }).catch(err => console.log(err))
  })
  router.post('/userback', uploadCloud.single('photo'),(req,res,next)=>{
    console.log(req.file.url);
    const picktureBack= req.file.url;  
    console.log(picktureBack)
    // req.user.update({picktureBack:[picktureBack]}).then(response => {
    //   console.log(response);
    //   res.status(200).json({msg:"OK"})
    // })
    // .catch()
    User.findByIdAndUpdate(req.user._id, {$set:{pictureBack:picktureBack}}, {new:true})
    .then(user => {console.log(user);res.json(user)})
    .catch(err => console.log(err))
    // req.user.update({$push:{image:imageURL}})
    // .then((response) => {
    //   console.log(response)
    //   res.status(200).json({message:OK});
    // }).catch(err => console.log(err))
  })


  router.get('/userback', (req, res, next) => {
    Post.find({picktureBack:req.user.picktureBack})
      .then(posts => {
        console.log(posts)
        res.status(200).json({posts});
      })
  });

  
  router.get('/user', (req, res, next) => {
    Post.find({image:req.user.image})
      .then(posts => {
        console.log(posts)
        res.status(200).json({posts});
      })
  });

  
  module.exports = router;