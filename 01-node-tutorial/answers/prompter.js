const http = require("http");
var StringDecoder = require("string_decoder").StringDecoder;

const getBody = (req, callback) => {
  const decode = new StringDecoder("utf-8");
  let body = "";
  req.on("data", function (data) {
    body += decode.write(data);
  });
  req.on("end", function () {
    body += decode.end();
    const body1 = decodeURI(body);
    const bodyArray = body1.split("&");
    const resultHash = {};
    bodyArray.forEach((part) => {
      const partArray = part.split("=");
      resultHash[partArray[0]] = partArray[1];
    });
    callback(resultHash);
  });
};

// here, you could declare one or more variables to store what comes back from the form.
let number = Math.floor(Math.random() * 10 + 1);
let phrase = "Good luck!";
console.log("The correct number to guess:", number);
// here, you can change the form below to modify the input fields and what is displayed.
// This is just ordinary html with string interpolation.
const form = () => {
  return `
  <body>
  <p>I am thinking of a number between 1 & 10. Try guessing:</p>
  <p>${phrase}</p>
  <form method="POST">
  <input name="userInput"></input>
  <button type="submit">Guess</button>
  </form>
  </body>
  `;
};

const correctGuess = () => {
  return `
  <body>
    <p>I am thinking of a number between 1 & 10. Try guessing:</p>
    <p id="myParagraph">${phrase}</p>
    <form method="POST">
    <input name="userInput"></input>
    <button type="submit">Guess</button>
    </form>
    <script>
      // Function to generate a random color
      function getRandomColor() {
        var red = Math.floor(Math.random() * 256);
        var green = Math.floor(Math.random() * 256);
        var blue = Math.floor(Math.random() * 256);
        return 'rgb(' + red + ',' + green + ',' + blue + ')';
      }

      // Function to set random background color for 'p'
      function setRandomBackgroundColor() {
        var randomColor = getRandomColor();
        var paragraph = document.querySelector("#myParagraph");
        paragraph.style.backgroundColor = randomColor;
      }

      // Set initial background color
      setRandomBackgroundColor();

      // Change background color every 1 second (1000 milliseconds)
      setInterval(setRandomBackgroundColor, 500);
    </script>
  </body>
  `;
};

const server = http.createServer((req, res) => {
  if (req.method === "POST") {
    getBody(req, (body) => {
      console.log("User input: ", body);
      // here, you can add your own logic
      if (body["userInput"] == number) {
        phrase = `Nice! Correct number was: ${number}`;
        res.end(correctGuess());
      } else {
        if (parseInt(body["userInput"]) > number) {
          phrase = "Too big, try a smaller number!";
        } else if (parseInt(body["userInput"]) < number) {
          phrase = "Too small, try a bigger number!";
        } else {
          phrase = "Input a whole number!";
        }
      }
      // Your code changes would end here
      res.writeHead(303, {
        Location: "/",
      });
      res.end();
    });
  } else {
    res.end(form());
  }
});

server.listen(3000);
console.log("The server is listening on port 3000.");
