// const { rejects } = require("assert");
const { rejects } = require("assert");
const fs = require("fs");
// const { resolve } = require("path");
const superagent = require("superagent");

// fs.readFile(`${__dirname}/dog.txt`, "utf-8", (err, data) => {
//   console.log(data);
//   superagent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .end((err, res) => {
//       if (err) return console.log(err.message);
//       console.log(res.body.message);
//       fs.writeFile("dog-img.txt", res.body.message, (err) => {
//         console.log(err);
//         console.log("Saving Ramdom dog images");
//       });
//     });
// });
// const readFilePromise = (file) => {
//   return new Promise((resolve, reject) => {
//     fs.readFile(file, (errr, data) => {
//       console.log("Data of Reas:", data);
//       if (errr) reject("errr I conuld not find any files");
//       resolve(data);
//     });
//   });
// };

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject("I could not find that file 😢");
      resolve(data);
    });
  });
};
const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject("Could not write file 😢");
      resolve("success");
    });
  });
};
// const writeFilePromise = (file, data) => {
//   return new Promise((resolve, reject) => {
//     fs.writeFile(file, data, (err) => {
//       if (err) reject("Something Is error");
//       resolve("Success");
//     });
//   });
// };

const getDogsPic = async () => {
  const data = await readFilePro(`${__dirname}/dog.txt`);
  console.log("DAta:", data);
  const pic1 = superagent.get(
    `https://dog.ceo/api/breed/${data}/images/random`
  );
  const pic2 = superagent.get(
    `https://dog.ceo/api/breed/${data}/images/random`
  );
  const pi3 = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);

  const all = await Promise.all([pic1, pic2, pi3]);
  //   console.log(all);
  const finalPic = all.map((el) => {
    return el.body.message;
  });
  console.log("final:", finalPic);
  //   console.log("Pic:", all.body.message);
  await writeFilePro("dog-img.txt", finalPic.join("\n"));
  console.log("finished Doing....");
  return "Unish";
};
// getDogsPic();
let x = getDogsPic();
console.log(x);
/*
readFilePromise(`${__dirname}/dog.txt`)
  .then((data) => {
    console.log("dATa:", data);
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  .then((res) => {
    return writeFilePromise("dog-img.txt", res.body.message);
  })
  .then(() => {
    console.log("Ramdom dog Save Success fullyy");
  })
  .catch((error) => {
    console.log(error);
  });
  */

// fs.readFile(`${__dirname}/dog.txt`, "utf-8", (err, data) => {
//   console.log(data);
//   superagent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .then((res) => {
//       console.log(res.body.message);
//       fs.writeFile("dog-img.txt", res.body.message, (err) => {
//         console.log(err);
//         console.log("Saving Ramdom dog images");
//       });
//     })
//     .catch((err) => {
//       console.log(err.message);
//     });
// });
