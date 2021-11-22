//make sure to run on terminal:
//   npm i express
//   npm i cors
//   npm i body-parser   [optional]
//otherwise these modules will not work!

const express = require('express');
const app = express();  //get an express object
const cors = require('cors');  //avoid that nasty CORS error
const bodyParser = require('body-parser');
const fs = require('fs');

const portNum = 3000;

//take care of CORS situation
app.use(cors({origin: '*'}));

//allow body parsing
app.use(express.json());

app.use(express.static(__dirname));

//second argument is a callback function
//-- this is the function that will be called when 
//   there is an HTTP GET request for this endpoint
app.get('/', (req, res) => {
    console.log('\n\nON THE SERVER');
    console.log('received from client: ' + req.query.name + ' ' + req.query.note);
    console.log('sending response to the client from / ...');

    const file = req.query.name + ".txt";

    var content = fs.readFileSync(file).toString();

    res.send(JSON.stringify({message : `${content}`}));
});

app.post('/write-file', (req, res) => {
    console.log('\n\nON THE SERVER');
    console.log('writing to file: ' + req.body.name + ' ' + req.body.note);
    console.log('sending response to client from /write-file ...');

    const file = req.body.name + ".txt";
    const note = req.body.note + "\n";

    fs.appendFile(file, note, (err) => {
        if (err) {throw err;}
        console.log("wrote file");
    })

    res.send(JSON.stringify({message: 'Your note has been recorded'}));
});

app.delete('/delete-file', (req, res) => {
    console.log('\n\nON THE SERVER');
    console.log('deleting the file: ' + req.body.name + '.txt');
    console.log('sending response to client from /delete-file ...');

    const file = req.body.name + ".txt";

    fs.unlink(file, (err) => {
        if (err) {throw err;}
        console.log("deleted file");
    })

    res.send(JSON.stringify({message: 'Your file has perished in the depths of Moria'}));
});

//make server listen on a port
app.listen(portNum, () => {
    console.log(`listening on port ${portNum}`);
});
