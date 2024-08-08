const multer = require('multer');

const storage = multer.memoryStorage(); 

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 10 
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true); 
    } else {
      cb(new Error('Only Image files are allowed'), false); 
    }
  }
});

const singleUpload = upload.single('image'); 

module.exports = singleUpload;
