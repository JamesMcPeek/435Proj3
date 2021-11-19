// Append to file, create if not found
const fs = require("fs");

const fileName = "Gandalf";
const fileExt = ".txt";
const fileFinal = fileName + fileExt;
const note = "test";

fs.appendFile(fileFinal, "\n", (error,data) => {
    if (error) throw error;
    console.log("new line");

    fs.appendFile(fileFinal, note, (error,data) => {
        if (error) throw error;
        console.log("note appended");
    });
});
