const express = require('express')
const router = express.Router()
//const Files = require ('../models/Files')

router.get('/:fileUrl', async (req,res)=> res.redirect(`/api/files/download/${req.params.fileUrl}`))

module.exports = router