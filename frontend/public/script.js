const form = document.querySelector("#add-category");
form.addEventListener("submit", function (event) {
  event.preventDefault();
  // megtiltja a html elem alapműködését (itt pl nem megyünk majd át a máv oldalra, vagy az url sávban nem jelennek meg a dolgok)
  const product = {
    name: document.querySelector("#name").value,
    category: document.querySelector("#category").value,
    price: parseInt(document.querySelector("#price").value),
  };

  const formData = new FormData();

  formData.append("fileName", document.querySelector("#fileName").value);

  formData.append("file", document.querySelector("#file").files[0]);
  //ez tömböt ad vissza, egy elem esetén is, ezért kell a [0]
  //append: feltölti adattal a formData-t

  fetch("/upload", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(product),
  });
  //megmondjuk a szervernek, hogy ez egy post request(ezt most nem tudom, mi), hogy mi az adat, és hogy json-ban küldjük
  // post-tal küldünk legtöbbször adatokat a backendnek; ehhez először összegyűjtjük a kívánt formátumba (pl. fenti product objektum)

  // adatot json ban, képet formDatával küldjünk

  fetch("/upload-image", {
    method: "POST",
    body: formData,
  });
});
