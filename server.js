const express = require("express")
const app = express()
const methodOverride = require("method-override")
require('./db/db.js')

app.use(express.urlencoded({extended:false}))

app.use(methodOverride("_method"))

const carsController = require('./controller/cars.js');

app.use('/cars', carsController);


app.listen(3000, () => {
  console.log('listening');
});
