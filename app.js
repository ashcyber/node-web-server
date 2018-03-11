const express = require('express');
const hbs = require('hbs');
const fs = require('fs');


var app = express();

app.set('view engine', 'hbs');
app.use((req,res, next) => {
  var now = new Date().toString();
  var log = `${now} : ${req.method} ${req.url}`
  fs.appendFile('Server.log', log + '\n', (err) =>{
    if(err){
      console.log('Unable to append to server.log')
    }
  });
  next();
});


// // Put Site in maintenance mode
// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
//
//   // Code after maintenance mode is not executed
//   // There is no next();
// });

app.use(express.static(__dirname + '/public'));


hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) =>  {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my website',
  })
});



app.get('/about', (req, res) => {
  res.render('about.hbs',{
    pageTitle: 'About Page',
  })
});


app.get('/bad', (req, res) => {
  res.send({
    status: '404'
  })
});




app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
