const { writeFile, readFile } = require("fs").promises;

const line1 =
  "then is a method that can be used to chain asynchronous operations together";
const line2 =
  "then takes two arguments: a function that is called when the promise is fulfilled, and a function that is called when the promise is rejected.";
const line3 =
  "then can be used to handle errors that occur during asynchronous operations.";

writeFile("./temporary/fileThen.txt", `${line1} \n`, { flag: "a" })
  .then(() => {
    return writeFile("./temporary/fileThen.txt", `${line2} \n`, { flag: "a" });
  })
  .then(() => {
    return writeFile("./temporary/fileThen.txt", `${line3} \n`, { flag: "a" });
  })
  .then(() => {
    return readFile("./temporary/fileThen.txt", "utf8");
  })
  .then((result) => console.log(result))
  .catch((error) => console.log(error));
