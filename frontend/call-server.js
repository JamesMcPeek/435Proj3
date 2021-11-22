let outputArea;   //globally available to all functions
let outputMessage;
let outputFiles;
var fileList = new Array();

//----------------------testing basic GET functionality
function handleReadButton() {
    const name = document.querySelector('#name').value;
    const note = document.querySelector('#note').value;


    const url = "http://localhost:3000";
    const params = `?name=${name}&note=${note}`;

    const fetchObject = {
        method: 'GET',
        headers: {
            'Content-Type' : 'text/html'
        }
    };

    //perform fetch on url with parameters (query String on GET)
    fetch(url + params, fetchObject)
        .then(response => response.json())               // obtain json object sent from server
        .then(jsonObject => {                            // use jsonObject and get its message property
            outputArea.innerHTML = jsonObject.message;   // set innerHTML of Area to message sent in jsonObject
        });

        outputMessage.innerHTML = "File has been read";

}//end handleBasicButton
//---------------------------------------------------------

//-------------------------send message to server to write to file 
function handleWriteButton() {
    const name = document.querySelector('#name').value;
    const note = document.querySelector('#note').value;
    outputArea.innerHTML = "";

    const url = "http://localhost:3000/write-file";

    const dataObject = {
        name: name,
        note: note
    };

    const fetchObject = {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(dataObject)
    };

    //perform fetch on url with parameters (query String on GET)
    fetch(url, fetchObject)
        .then(response => response.json())               // obtain json object sent from server
        .then(jsonObject => {                            // use jsonObject and get its message property
            outputMessage.innerHTML = jsonObject.message;   // set innerHTML of Area to message sent in jsonObject
        });

    if (!fileList.includes(name)){
        fileList.push(name);
    }

    outputFiles.value = fileList.join("\n");

}//end handleWriteButton

//-------------------------send message to server to delete to file 
function handleDeleteButton() {
    const name = document.querySelector('#name').value;
    const note = document.querySelector('#note').value;
    outputArea.innerHTML = "";

    const url = "http://localhost:3000/delete-file";

    const dataObject = {
        name: name,
        note: note
    };

    const fetchObject = {
        method: 'DELETE',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(dataObject)
    };

    //perform fetch on url with parameters (query String on GET)
    fetch(url, fetchObject)
        .then(response => response.json())               // obtain json object sent from server
        .then(jsonObject => {                            // use jsonObject and get its message property
            outputMessage.innerHTML = jsonObject.message;   // set innerHTML of Area to message sent in jsonObject
        });

        const index = fileList.indexOf(name);
        if (index > -1){
            fileList.splice(index,1);
        }

        outputFiles.value = fileList.join("\n");

}//end handleDeleteButton

//----------------------------------------------------------------
function start() {
    const readButton = document.querySelector('#readBtn');
    const writeButton = document.querySelector('#writeBtn');
    const deleteButton = document.querySelector('#deleteBtn');

    readButton.onclick = handleReadButton;
    writeButton.onclick = handleWriteButton;
    deleteButton.onclick = handleDeleteButton;

    //initialize global outputArea
    outputArea = document.querySelector('#output');
    outputMessage = document.querySelector('#message');
    outputFiles = document.querySelector('#directory');

}//end start

window.onload = start;

// Read -> GET
// Write -> POST
// Delete -> DELETE
