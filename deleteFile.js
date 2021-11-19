// Delete file
const fs = require("fs");

const fileName = "Frodo";
const fileExt = ".txt";
const fileFinal = fileName + fileExt;
const note = "test";

fs.unlink(fileFinal, (error) => {
    if (error) throw error;
    console.log("file deleted");
});
