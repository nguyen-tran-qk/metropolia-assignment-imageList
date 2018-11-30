const express = require('express');
const app = express();
const multer = require('multer');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bodyParser = require('body-parser');
const session = require('express-session');

app.set('trust proxy');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(passport.initialize());
app.use(passport.session());
app.use('/modules', express.static('node_modules'));

const db = require('./modules/database');
const exif = require('./modules/exif');
const img_handler = require('./modules/img-handler');

//-----------------------------------------------
//for handling uploading of files and adding files' data to database
const upload = multer({dest:'./public/img/original'});
const connection = db.connect();
app.post('/upload/', upload.single('mediafile'), (req, res, next) =>{
  next();
});

app.use('/upload/', (req, res, next)=>{
  img_handler.resize(req.file.path, 200, './public/img/thumb/'+req.file.filename+'_thumbs');
  next();
});

app.use('/upload/', (req, res, next)=>{
  img_handler.resize(req.file.path, 400, './public/img/med/'+req.file.filename+'_med');
  next();
});

app.use('/upload/', (req, res, next)=>{
  exif.getCoordinates(req.file.path).then(coor =>{
    req.coor = coor;
    next();
  })
});

app.use('/upload/', (req, res, next)=>{
  //category, title, details, image, thumbnail, original, coordinates
  console.log(req.body.category);
  const data = [
    req.body.category,
    req.body.title,
    req.body.details,
    req.file.filename+'_med',
    req.file.filename+'_thumbs',
    req.file.filename,
    req.coor
  ];
  db.insert(connection, data,res,next);
});

//-----------------------------------------------
//for getting data and file location
app.get('/grabpic/', (req, res) =>{
  db.select(connection,res);
});

//-----------------------------------------------
//for remove item from data
app.post('/remove/', (req, res)=>{
  console.log('-----remove-----');
  const id = req.body.content_id;
  db.remove(connection, id, res);
});

//for updating data for pic
app.post('/update/', (req, res)=>{
  console.log(req.body);
  const data = [req.body.ctgy, req.body.ttl, req.body.dtl, req.body.content_id];
  console.log(data);
  db.update(connection, data, res);
});

//for searching data
app.post('/search/', (req, res)=>{
  console.log('search');
  db.search(connection, req, res);
});
//-----------------------------------------------
//for authentication
passport.use(new LocalStrategy((username, password, done)=>{
  console.log('xxxxx   '+ username);
  if(username != 'qwe' || password != 'qwe'){
    return done(null, false);
  }
  else{
    return done(null, {user:username});
  }
}));
//
app.get('/', (req, res, next)=>{
  console.log(req.user);
  if(req.user !== undefined){
    res.send('/public/index.html');
  }
  else{
    res.redirect('/public/index.html');
  }
  next();
});

app.get('/content.html', (req, res, next)=>{
  console.log(req.user);
  if(req.user !== undefined){
    res.send('/public/index.html');
  }
  else{
    res.redirect('/public/index.html');
  }
  next();
});

app.post('/login',
    passport.authenticate('local',
        { successRedirect: '/node/content.html',
          failureRedirect: '/node/',
          session: true})
);

//-----------------------------------------------
//for session
passport.serializeUser((user, done) => {
  console.log('serialize: ' + user);
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.use(session({
  secret: '01266040503xyz',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: true }
}));

//-----------------------------------------------
//for redirecting and switching http https server
const http = require('http');
const https = require('https');
const fs = require('fs');

const sslkey = fs.readFileSync('/etc/pki/tls/private/ca.key');
const sslcert = fs.readFileSync('/etc/pki/tls/certs/ca.crt');

const options = {
  key: sslkey,
  cert: sslcert
};

https.createServer(options, app).listen(8000);
http.createServer((req, res)=>{
  console.log('xxxx');
  res.writeHead(302, {'Location': 'https://'+ req.headers.host +'/node'+req.url});
  res.end();
}).listen(3000);