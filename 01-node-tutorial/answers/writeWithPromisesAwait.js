const { writeFile, readFile } = require("fs").promises;

const line1 = "Async/await is a syntactical sugar for promises.";
const line2 =
  "Async/await allows you to write asynchronous code that looks synchronous.";
const line3 =
  "Async/await can be used to handle multiple asynchronous operations at the same time.";

const writer = async () => {
  try {
    await writeFile("./temporary/fileAsyncAwait.txt", `${line1} \n`, {
      flag: "a",
    });
    await writeFile("./temporary/fileAsyncAwait.txt", `${line2} \n`, {
      flag: "a",
    });
    await writeFile("./temporary/fileAsyncAwait.txt", `${line3} \n`, {
      flag: "a",
    });
  } catch (error) {
    console.log(error);
  }
};

const reader = async () => {
  try {
    const result = await readFile("./temporary/fileAsyncAwait.txt", "utf8");
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

const readWrite = async () => {
  try {
    await writer();
    await reader();
  } catch (error) {
    console.log(error);
  }
};

readWrite();
