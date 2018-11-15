const express = require('express');
const multer = require('multer');
const fs = require('fs');

// config destination and filename for uploaded files
const multerStorage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  }
});
const upload = multer({
  storage: multerStorage
}); 

// instantiate express
const app = express();
app.use(express.static('.'));
const appRoot = { root: '.' };

// routing
app.get('/', (req, res) => {
  res.sendFile('index.html', appRoot);
});

app.get('/task_a', (req, res) => {
  res.sendFile('task_a.html', appRoot);
});

app.get('/task_b', (req, res) => {
  res.sendFile('task_b.html', appRoot);
});

app.post('/upload', upload.single('file'), (req, res) => {
  console.log(req.file);
  return res.send({
    code: 204,
    data: {
      filePath: req.file.destination + req.file.filename,
      fileName: req.file.filename,
      isImage: req.file.mimetype.indexOf('image/') === 0
    }
  });
});

app.listen(5000);
