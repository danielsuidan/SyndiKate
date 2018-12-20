const express = require('express');
const router = express.Router();
const Post = require('../models/Post')
const User = require('../models/User')
const uploadCloud = require('../config/cloudinary');
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const isActive = require("../middleware/confirmEmails");




router.post('/', uploadCloud.single('photo'),(req, res, next) => {
  console.log(req.body)
  const {text,
    content
  } = req.body;
  const creatorId = req.user._id;
  const pictureURL = req.file.url;
  const picName = req.file.originalname;

  let newPost = new Post({
    text:text,
    coments: content,
    author: creatorId,
    picture: pictureURL
  });


  newPost.save()
    .then(() => {
      res.status(200).json({message:'Save OK'});
    })
    .catch((err) => {
      return err
    })
})

router.get('/',(req, res, next) => {
  Post.find({author:req.user._id})
    .then(posts => {
      res.status(200).json({posts});
    })
});
router.get('/randomphoto/:ranPhoto', (req, res) => {
  const ranPhoto = parseInt(req.params.ranPhoto)
  console.log(ranPhoto)
  if(!Number.isInteger(ranPhoto)){
    res.status(500).json({msg:"No seas cabron, pasame numeros"})
    return
  }
  Post.find()
  .then(RandomPhoto => {
    const randomphoto = Math.floor(Math.random() * RandomPhoto.length - 1)
    const randomPhotos = []
    for(let i = randomphoto; i< randomphoto+ranPhoto; i++){
      if(RandomPhoto[i])
        randomPhotos.push(RandomPhoto[i])
    }
    res.status(200).json({RandomPhoto:randomPhotos})
  })
})

module.exports = router;