let outputArea;   //globally available to all functions
let outputMessage;
let outputFiles;
var fileList = new Array();

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

        outputMessage.innerHTML = "Your file has been read";

}//end handleBasicButton
//---------------------------------------------------------

//-------------------------send message to server to update file 
function handleUpdateButton() {
    const name = document.querySelector('#name').value;
    const note = document.querySelector('#note').value;
    outputArea.innerHTML = "";

    const url = "http://localhost:3000/update-file";

    const dataObject = {
        name: name,
        note: note
    };

    const fetchObject = {
        method: 'PUT',
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
    const writeButton = document.querySelector('#writeBtn');
    const readButton = document.querySelector('#readBtn');
    const updateButton = document.querySelector('#updateBtn');
    const deleteButton = document.querySelector('#deleteBtn');
    
    writeButton.onclick = handleWriteButton;
    readButton.onclick = handleReadButton;
    updateButton.onclick = handleUpdateButton;
    deleteButton.onclick = handleDeleteButton;
    
    //initialize global outputArea
    outputArea = document.querySelector('#output');
    outputMessage = document.querySelector('#message');
    outputFiles = document.querySelector('#directory');

}//end start

window.onload = start;

// Create -> POST
// Read -> GET
// Update -> PUT
// Delete -> DELETE
