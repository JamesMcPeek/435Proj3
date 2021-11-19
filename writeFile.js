// Write to file, create if not found
const fs = require("fs");

const fileName = "Frodo";
const fileExt = ".txt";
const fileFinal = fileName + fileExt;
const note = "test";

fs.writeFile(fileFinal, note, (error) => {
    if (error) throw error;
    console.log("file created with note");
});
