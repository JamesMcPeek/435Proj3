const express = require('express');
var app = express();
const fs = require('fs');
const fetch = require('node-fetch');
const fileName = $("#name").val();
const fileExt = ".txt";
const fileFinal = fileName + fileExt;
const note = $("#note").val();
let names = [];
var textArea = $("#textarea").val();

//START TRIAL/ERROR

// $(document).ready( () => {
//     $("#readBtn").click( () => {
//         return fetch(displayNote(fileFinal))
//         .then(response => response.json())
//         .then(data => textArea.innerHTML)
//     });
// });

$(document).ready( () => {
    $("#readBtn").click( () => {
        var test = function (req, res){
            res.send(textArea.innerHTML = "test")
        }
        app.get('/Frodo.txt', [test])
    })
})

// END T/E

function displayNote(fileFinal){
    var textArea = document.getElementById("textarea");
    const fileFinal = fileFinal;
    
    fs.readFile(fileFinal, 'utf8', (error,data) => {
        if (error) {
            throw error;
        } else if (data === ""){
            textArea.innerHTML = "File empty";
        }else{
            return data;
        }
        
        textArea.innerHTML = (data);
    });
}

// Write file
function writeFile(){
    var fileName = document.getElementById("name").value;
    var fileExt = ".txt";
    const fileFinal = fileName + fileExt;
    var note = document.getElementById("note").value;

    names.forEach(function(name, index, array){
        if (name === fileName){ // Append to file if already created
            fs.appendFile(fileFinal, "\n", (error) => {
                if (error) throw error;
        
                fs.appendFile(fileFinal, note, (error) => {
                    if (error) throw error;
                });
            });
        } else{ // Create new file with fileName
            fs.writeFile(fileFinal, note, (error) => {
                if (error) throw error;
                names.push(fileName);
            });
        }
    })

    displayNote(fileFinal);
    
    document.getElementById("message").innerHTML = fileFinal + " has been updated.";
}

// Read file
function readFile(){
    var fileName = document.getElementById("name").value;
    var fileExt = ".txt";
    const fileFinal = fileName + fileExt;

    displayNote(fileFinal);

    document.getElementById("message").innerHTML = "File has been opened";
}

// Delete file
function deleteFile(){
    var fileName = document.getElementById("name").value;
    var fileExt = ".txt";
    const fileFinal = fileName + fileExt;

    fs.unlink(fileFinal, (error) => {
        if (error) throw error;
    });

    let pos = names.indexOf(fileName);
    names.splice(pos,1); 

    document.getElementById("message").innerHTML = "File has been deleted";
}
