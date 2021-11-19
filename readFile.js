// Read file
const fs = require("fs");

const fileName = "Gandalf";
const fileExt = ".txt";
const fileFinal = fileName + fileExt;

fs.readFile(fileFinal, 'utf8', (error,data) => {
    if (error) throw error;
    console.log("file opened");
    console.log(data);
});
