const mongoose = require('mongoose')
const shortId = require('shortId')

const schema = mongoose.Schema

const filesSchema = new schema({
  createdAt:{
    type: Date,
    default: Date.now,
    expires: 3600
  },
  name: String,
  path: String,
  url:{
    type: String,
    default: shortId.generate
  }, 
})

module.exports = Files = mongoose.model('files', filesSchema)