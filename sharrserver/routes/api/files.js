const express = require("express");
const router = express.Router();
const fs = require("fs");
const Files = require("../../models/Files");

//upload file
router.post("/upload", async (req, res) => {
  //console.log(req.files)
  if (req.files === null || req.files === undefined) {
    return res.status(400).json({ message: "no file uploaded" });
  }
  const { file } = req.files;
  //console.log(file)
  if (file.size >= 1024 * 1024 * 200) {
    return res
      .status(400)
      .json({ message: "file too large, it must be less than 200mb" });
  }
  try {
    let path = `${__basedir}/uploads/${file.name}`;
    //console.log(`${__basedir}`)
    file.mv(path);
    let newFile = new Files({
      name: file.name,
      path,
    });
    await newFile.save();
    res.json({
      name: newFile.name,
      url: `${req.protocol}://${req.get("host")}/${newFile.url}`,
    });
    //console.log(req.get('host'))

    // deleting file after T amount of time
    setTimeout(() => {
      fs.unlink(path, (err) => {
        if (err) {
          console.log(`delete file error: ${err}`);
        }
      });
    }, 3600000);
  } catch (error) {
    res.status(500).json({ message: `upload faild ${error}` });
    //console.log(error)
  }
});

// download file
router.get("/download/:fileUrl", async (req, res) => {
  let fileUrl = req.params.fileUrl;
  try {
    let file = await Files.findOne({ url: fileUrl });
    if (!file) {
      return res.status(404).json({ message: "ERROR 404 file not found" });
    }
    //console.log(file)
    fs.createReadStream(`${file.path}`).pipe(res)
    
  } catch (error) {
    console.log(`download err: ${error}`);
    res.status(500).json({ message: error });
  }
});
module.exports = router;
