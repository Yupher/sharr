const express = require('express')
const fileUpload = require('express-fileupload')
const path = require('path')
const cors = require('cors')
const helmet = require('helmet')
const mongoose = require('mongoose')
require('dotenv').config()
const {db} = require('./config')

const app = express()
app.use(helmet())
mongoose.connect(db,{useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false,useCreateIndex: true,})
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




app.use('/api/files', require('./routes/api/files'))
app.use('/', require('./routes/redirect'))
if(process.env.NODE_ENV === 'production'){
  app.use(express.static('../sharrclient/build'))
  app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__basedir, 'sharrclient', 'build', 'index.html'))
  })
}

let PORT = 5000 || process.env.PORT
app.listen(PORT,()=>console.log('server started...'))