const express = require('express');
const bodyParser = require('body-parser'); 
const cors = require('cors');

const app=express();

//Middleware
app.use(bodyParser.json());
app.use(cors());

const posts=require('./routes/api/posts');

app.use('/api/posts',posts);

//Handle Production
if (process.env.NODE_ENV==='production') {
    //static folder
    app.use(express.static(__dirname+'/public/'));


    //Handle SPA
    app.get(/.*/,(req,res) => res.sendFile(__dirname+'/public/index.html'))
}

//in localhost run in 5000 for heroku use env.PORT
const port=process.env.PORT || 5000;

app.listen(port,() => console.log(`Server listen on port ${port}`));