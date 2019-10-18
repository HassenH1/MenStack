const express = require("express")
const router = express.Router()

const Cars = require("../models/cars.js")

router.get('/new', (req, res) =>{
  res.render("new.ejs")
})

router.post('/', (req, res) => {
  console.log(req.body, "<--- content should be here")
  if (req.body.readyToGo === 'on') {
    req.body.readyToGo = true;
  } else {
    req.body.readyToGo = false;
  }
  Cars.create(req.body, (err, newCar) => {
    if(err){
      res.send(err)
    } else {
      console.log(newCar)
      res.redirect("/cars")
    }
  })
})

router.get("/:id/edit", (req,res) => {
  Cars.findById(req.params.id, (err, foundCars) => {
    if(err){
      res.send(err)
    } else {
      res.render("edit.ejs", {
        cars: foundCars
      })
    }
  })
})

router.put('/:id', (req, res) => {
  console.log(req.body, 'contents of the form')

  if(req.body.readyToGo === 'on'){
    req.body.readyToGo = true;
  } else {
    req.body.readyToGo = false;
  }

  Cars.findByIdAndUpdate(
    req.params.id, // first is identifier of object we want to update
    req.body,  // second is object we want to update to
    {new: true}, // do we want the updated document returned? Yes
    (err, carsUpload) => {

    if(err){
      res.send(err);
    } else {
      console.log(carsUpload);
       res.redirect('/cars')
    }

  }); 
});

router.get('/', (req,res) => {
  Cars.find({}, (err, createCars) => {
    if(err){
      res.send(err)
    } else {
      res.render('index.ejs', {
        cars: createCars
      })
    }
  })
})

router.delete("/:id", (req,res) => {
  Cars.deleteOne({_id: req.params.id}, (err, deleteCar) => {
    if(err){
      res.send(err)
    } else {
      console.log(deleteCar)
      res.redirect('/cars')
    }
  })
})

router.get("/:id", (req, res) => {
  Cars.findById(req.params.id, (err, foundCar) => {
    if(err){
      res.send(err)
    } else {
      res.render("show.ejs", {
        cars: foundCar
      })
    }
  })
})

module.exports = router