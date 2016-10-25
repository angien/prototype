var express = require('express');
var router = express.Router();
var multer = require('multer');
var fs = require('fs');
var path = require('path');

var uploadFolder = "./public/uploads"

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadFolder)
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

var upload = multer({ storage: storage })

module.exports = router;

/* GET home page. */
router.get('/',
  function(req, res) {
    res.render('index', {});
  });

/* Get other apps */
router.get('/test1',
  function(req, res) {
    res.render('test1', {});
  });

router.get('/upload', function (req, res) {
   res.render("upload", {});
});

router.get('/:image1/:image2',
  function(req, res) {
    var message = "Successfully did a GET request.";
    console.log(message);
    res.render('prototype',
      {images:
        [
          {"url": "/uploads/" + req.params.image1 + ".png", "filename": req.params.image1},
    	   {"url": "/uploads/" + req.params.image2 + ".png", "filename": req.params.image2}
        ]}
      );
  });

router.post('/upload', upload.single('image'), function (req, res) {
   res.render("upload", {});
});

router.get('/allImages', function(req, res) {
	fs.readdir(uploadFolder, (err, files) => {
		var allImages = []
		files.forEach(file => {
			allImages.push({"url": "/uploads/" + file, "filename": path.parse(file).name})
		})
	    res.send(allImages)
	 })
  });

