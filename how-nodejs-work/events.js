const EventEmitter = require("events");

const myEmitter = new EventEmitter();

myEmitter.on("newSale", () => {
  console.log("There was a new Sale!");
});

myEmitter.on("newSale", () => {
  console.log("Customer Name:Jonas!");
});

myEmitter.emit("newsale");
console.log("hello");

//////////////////

const server = http.createServer();

server.on("request", (req, res) => {
  console.log("Request received!");
  console.log(req.url);
  res.end("Request received");
});

server.on("request", (req, res) => {
  console.log("Another request 😀");
});

server.on("close", () => {
  console.log("Server closed");
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Waiting for requests...");
});
