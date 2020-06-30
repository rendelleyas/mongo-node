const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/express-mongo-crud', { useUnifiedTopology: true, useNewUrlParser: true },
    (err) => { 
        if(!err){
            console.log('Successfuly Connected');
        }else {
            console.log('Error in connecting: ' + err);
        }
    } 
);
