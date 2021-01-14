const express = require('express')
const fileUpload = require('express-fileupload')
const cors = require('cors')
const helmet = require('helmet')
const mongoose = require('mongoose')

const app = express()
app.use(helmet())
mongoose.connect('mongodb://localhost:27017/sharingapp',{useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false,useCreateIndex: true,})
  .then(()=>console.log('mongodb satrted.....'))
  .catch(e=>console.log(e))
app.use(fileUpload({
  limits: {
      fileSize: 200 * 1024 *1024 //200mb
  }
}))
app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())
global.__basedir = __dirname;



app.use('/api/files', require('./routes/api/files'))
app.use('/', require('./routes/redirect'))


app.listen(5000,()=>console.log('server started...'))