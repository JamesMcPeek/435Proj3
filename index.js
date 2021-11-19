//HTML with CSS
const { Router } = require('express');
const express = require('express');
const app = new express();
const port = 3000;

app.use(express.static(__dirname));
app.get('/', function (req,res){
    res.sendFile(__dirname + '/index.html');
})

app.listen(port, () => console.log("port " + port));
