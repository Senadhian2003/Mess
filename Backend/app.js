const express = require('express');
const dispatchRtr = require('./routes/dispatch');
let cors = require('cors');
let bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.get('/',(req,res)=>{
    res.send("Request Received");
})

app.use('/dispatch',dispatchRtr);

app.listen(5000,function(){
    console.log("App running on port 5000");
})

