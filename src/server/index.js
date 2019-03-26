var express = require('express');
var app = express();

app.use(express.static(__dirname + './../../')); //serves the index.html
app.use('/signin', express.static(__dirname + './../../')); //serves the index.html
app.use('/signup', express.static(__dirname + './../../')); //serves the index.html
app.listen(4000); //listens on port 4000 -> http://localhost:4000/
