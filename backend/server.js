const { response } = require("express");
const fileUpload = require("express-fileupload");
const express = require("express");
const app = express();
const port = 3000;

const path = require("path");
//az elérési útvonal
//require: importálás

const fs = require("fs");
//fs: filesystem

app.use(express.json());
//innen tudja a backend, hogy json-ban kapja a frontend által küldött infót: megjelenik a terminalban

app.use(fileUpload());

app.get("/", (req, res) => {
  res.sendFile(path.join(`${__dirname}/../frontend/index.html`));
});
// __dirname: a kiindulási pont: ahol vagyunk
// .. jelentés: kilép az adott mappából
//azt hozzáfűztük a path-hoz: lényegében átküldtük a frontend index-re

/* app.get("/style.css", (req, res) => {
  res.sendFile(path.join(`${__dirname}/../frontend/style.css`));
});

app.get("/script.js", (req, res) => {
  res.sendFile(path.join(`${__dirname}/../frontend/script.js`));
}); 

Lehet fájlokat egyesével is linkelni, de egyszerőbb, ha az index.html-en kívül mindent beteszünk egy public mappába frontendben, és azt linkeljük, az alábbiak szerint

De az index.html-ben javítani kell az útvonalakat!

*/

app.get("/about", (req, res) => {
  res.send("Hello");
});

app.use("/public", express.static(`${__dirname}/../frontend/public`));

app.post("/upload", (request, response) => {
  console.log(request.body);
  fs.writeFileSync(
    `${__dirname}/data/userdata.json`,
    JSON.stringify(request.body, null, 4),
    (error) => {
      if (error) {
        console.log(error);
        return response.status(500).send(error);
      } else {
        response.status(200).send("ok");
      }
    }
  );
});

app.post("/upload-image", (request, response) => {
  if (!request.files) {
    return response.status(400).send("no files were uploaded");
  }
  const picture = request.files.file;
  const picName = request.body.fileName;
  console.log(picName);

  picture.mv(`${__dirname}/data/${picName}.jpg`, (error) => {
    if (error) {
      console.log(error);
      return response.status(500).send(error);
    } else {
      response.status(200).send("image ok");
    }
  });
  //mv: move: átmozgatja másik mappába
});

//az első mindig a request, a második a response(de bármilyen neve lehet a változóknak)
//kell küldeni egy response-t különben sokáig ötltene az oldal (a 200-as státusz az hogy betöltött)
app.listen(port, () => {
  console.log(`Server is running at: http://127.0.0.1:${port}`);
});
//ez legyen a legvégén
