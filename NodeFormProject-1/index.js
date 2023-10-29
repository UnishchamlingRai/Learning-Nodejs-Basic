// const { error } = require("console");
const fs = require("fs");
const http = require("http");
const url = require("url");

//////////////////////////////////////
//FILE SYSTEM------------
//------Blocking, synchronous way----------
// const readedValue=fs.readFileSync("./File1.txt","utf-8");
// console.log(readedValue)

// const writedValue=`This writed Value ${readedValue}  \n ${2+3}  date: ${Date.now()}`
// fs.writeFileSync('./Output.txt',writedValue);

//-----------Non-blocking asynchronous way--------------
// fs.readFile('./reader.txt','utf-8',(err,data1)=>{
//     if(err) return console.log("Error!")
//     console.log("Data:",data1)
//     fs.readFile(`./${data1}.txt`,'utf-8',(err,data2)=>{
//         console.log("Data of read this File: ",data2)
//         fs.readFile('./append.txt','utf-8',(err,data3)=>{
//             console.log("Data 3:",data3)
//             fs.writeFile('./writeFile.txt',`${data2}\n ${data3}`,'utf-8',(err)=>{
//                 console.log("Your file has been Written")
//             })
//         })
//     })
// })
// console.log("Files Wrtten")

//////////////////////////////////////
//SERVER------------
const replaceTemplates = (product, temp) => {
  let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%ID%}/g, product.id);
  output = output.replace(/{%NUTRIENTS NAME%}/g, product.nutrients);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%DISCRIPTION%}/g, product.description);
  if (!product.organic) {
    output = output.replace(/{%NOT-ORGANIC%}/g, "not-organic");
  }
  // console.log(output)
  return output;
};
let temOverview = fs.readFileSync(
  `${__dirname}/templates/templates-overview.html`,
  "utf-8"
);

let tempProduct = fs.readFileSync(
  `${__dirname}/templates/templates-product.html`,
  "utf-8"
);
let tempCards = fs.readFileSync(
  `${__dirname}/templates/templates-cards.html`,
  "utf-8"
);

let data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObject = JSON.parse(data);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);
  //OVERVIEW PAGE
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });

    let cardHTML = dataObject
      .map((product) => {
        return replaceTemplates(product, tempCards);
      })
      .join("");

    let tempOverviewOutput = temOverview.replace(
      / {%PRODUCT CARD%}/g,
      cardHTML
    );

    res.end(tempOverviewOutput);
    //PRODUCT PAGE
  } else if (pathname === "/product") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });
    let productData = replaceTemplates(dataObject[query.id], tempProduct);
    // console.log(productData)
    res.end(productData);

    //API
  } else if (pathname === "/api") {
    res.writeHead(200, {
      "Content-type": "application/json",
    });
    res.end(data);
    //PAGE NOT FOUND
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "Hello my name is unish ",
    });
    res.end("<h1>Page Not Found!</h1>");
  }
});

server.listen(800, "127.0.0.1", () => {
  console.log("listining Server:");
});
