const fs = require("fs");
const server = require("http").createServer();

server.on("request", (req, res) => {
  ////solution 1
  //   fs.readFile("./test.txt", "utf-8", (err, data) => {
  //     res.end(data);
  //   });

  ////solution 2
  //   const readable = fs.createReadStream("./test.txt");
  //   readable.on("data", (chunk) => {
  //     res.write(chunk);
  //   });

  //   readable.on("end", () => {
  //     res.end();
  //   });

  //   readable.on("error", (error) => {
  //     console.log(error);
  //     res.statusCode = 500;
  //     res.end("file NOt found");
  //   });

  // Solution 3
  const readable = fs.createReadStream("test-file.txt");
  readable.pipe(res);
  // readableSource.pipe(writeableDest)
});

server.listen("8000", "127.0.0.1", () => {
  console.log("Listining Server..........");
});
