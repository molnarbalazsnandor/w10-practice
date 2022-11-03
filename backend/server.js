const express = require("express");
const app = express();
const port = 3000;

const path = require("path");
//az elérési útvonal

app.get("/", (req, res) => {
  res.sendFile(path.join(`${__dirname}/../frontend/index.html`));
});
// __dirname: a kiindulási pont
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

app.use("/public", express.static(`${__dirname}/../frontend/public`));

app.listen(port, () => {
  console.log(`Server is running at: http://127.0.0.1:${port}`);
});
//ez legyen a legvégén
