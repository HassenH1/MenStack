const mongoose = require('mongoose')

//blueprint for our document
//go into a collection in mongodb
//mot the model itself but is part of it
const carsSchema = new mongoose.Schema({
    name: {type: String, required: true},
    color: {type: String, required: true},
    readyToGo : Boolean
})

//collection in mongodb is called fruits
//const Fruit is the model ! All powerful objec that performs CRUD 
const Car = mongoose.model('Car', carsSchema)

module.exports = Car