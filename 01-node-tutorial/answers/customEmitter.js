const EventEmitter = require("events");
// readline module is used to read user's input
const readline = require("readline");

// An instance of the 'Interface' class is used in order to access the input/output streams
const line = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Create an event emitter instance
const emitter = new EventEmitter();

const eventPromise = () => {
  return new Promise((resolve) => {
    emitter.on("trigger", (msg) => resolve(msg));
  });
};

const eventDelay = async (seconds) => {
  console.log(`Event will trigger after ${seconds} seconds!`);
  const msg = await eventPromise();
  setTimeout(() => {
    console.log(msg);
  }, seconds * 1000);
};

// question() method is used to display a prompt and wait for user input
line.question("After how many seconds should the event trigger? ", (answer) => {
  eventDelay(answer);
  emitter.emit("trigger", `Your event triggered after ${answer} seconds!`);
  // this line closes the 'Interface' and allows the program to exit
  line.close();
});
