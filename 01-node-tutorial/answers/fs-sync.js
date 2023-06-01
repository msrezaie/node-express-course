const { readFileSync, writeFileSync } = require("fs");

const line1 =
  "Async functions are used to handle asynchronous code in a manner that appears synchronous.";
const line2 =
  "Callbacks are functions that are passed as arguments to other functions and are called when the first function completes.";
const line3 =
  "Promises are objects that represent the eventual completion of an asynchronous operation.";

writeFileSync("./temporary/fileA.txt", `${line1}, ${line2}, ${line3}`, {
  flag: "a",
});

const fileA = readFileSync("./temporary/fileA.txt", "utf8");
console.log(fileA);
