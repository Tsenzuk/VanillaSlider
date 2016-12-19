var express = require('express');
var app = express();

app.set('view engine', 'pug');
app.use(express.static('public'));

app.get('/', function (req, res) {
  //   res.send('Hello World!');
  res.render('index', { title: 'Vanilla Slider Example'});
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
