require('./models/db');

const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');


var app = express();
app.use(bodyparser.urlencoded({
    extended: true
}));

//all data gain from form formatted into json
app.use(bodyparser.json());
//in order to include views/layout
app.set('views', path.join(__dirname, '/views/'));

//set the mainLayout with a extname of hbs as main layout
app.engine('hbs', exphbs({extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/'}));
app.set('view engine', 'hbs');

//to use controller
const employeeController = require('./controllers/employeeController');

//host used
app.listen(3000, () => {
    console.log('Express server at port: 3000')
});


//Routers
app.use('/employee', employeeController);