require('dotenv').config();
const express = require("express");
const router = express.Router();

const Event = require("../models/Events")
const isUser = require("../middleware/confirmOwner")


router.post("/",(req, res, next) => {
  console.log("ALGO",req.body)
    const {title,description,place,time,date}=req.body;
    const join_us=[req.user._id];
    
    const newEvent = new Event({
      title,
      description,
      place,
      date,
      time,
      join_us
    }) 
    
    if (title === "" || description === "" || place === "" || date === "" || time === "") {
        res.status(500).json({ message: "Some field is empty" });
        return;
      }
    
   
    newEvent.save()
    .then((event) => {
      console.log(event);
      
      res.status(200).json({message:"Event Saved"})
    })
  })
  
  router.get('/showevent',(req,res,next)=>{
    Event.find()
    // .populate("join_us", "username")
    .then(events => {
      res.status(200).json({events})
    })
  }) 
  
  router.get("/showevent/:id",(req,res,next)=>{
    Event.findById(req.params.id)
    .populate("join_us", "username")
    .then(event=>{
      res.status(200).json({event})
    })
  })
  
  router.get("/join/:eventid",(req,res,next)=>{
    Event.findByIdAndUpdate(req.params.eventid, {$push:{join_us:req.user._id}}, {new:true})
    .then(event=>{
      res.status(200).json({messaje:'OK'})
      //res.redirect(`/event/showevent/${event._id}`)
  })
  })
  router.get('/deleteevent/:id',isUser(),(req,res,next)=>{
    Event.findByIdAndRemove(req.params.id)
    .then(() =>{
      res.status(200).json({messaje:'Deleted'})
      // res.redirect("/event/showevent")
    })
  })


  router.get('/random/:ran', (req, res) => {
    const ran = parseInt(req.params.ran)

    if(!Number.isInteger(ran)){
      res.status(500).json({msg:"No seas cabron, pasame numeros"})
      return
    }
    Event.find()
    .then(events => {
      const random = Math.floor(Math.random() * events.length - 1)
      const randomEvents = []
      for(let i = random; i< random+ran; i++){
        if(events[i])
        randomEvents.push(events[i])
      }
      res.status(200).json({events:randomEvents})
    })
  })
  
  
module.exports = router;