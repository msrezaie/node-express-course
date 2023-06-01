const { readFile, writeFile } = require("fs");

const line1 =
  "Async functions are a new feature in JavaScript that allow you to write asynchronous code that is more readable and maintainable.";
const line2 =
  "Callbacks are a way of passing a function as an argument to another function to be executed later.";
const line3 =
  "Promises are a more advanced way of handling asynchronous code that can help you avoid callback hell.";

console.log("at start");

writeFile("./temporary/fileB.txt", `${line1} \n`, (err, result) => {
  console.log("at point 1");
  if (err) {
    console.log("This error happened: ", err);
    return;
  } else {
    writeFile(
      "./temporary/fileB.txt",
      `${line2} \n${line3}`,
      { flag: "a" },
      (err, result) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log("done with writing");
      }
    );
  }
});

readFile("./temporary/fileB.txt", "utf8", (err, result) => {
  if (err) {
    console.log("This error happened: ", err);
    return;
  }
  console.log(result);
});
