const express = require("express");
const sheetdb = require("sheetdb-node");
const bodyParser = require("body-parser");
// const res = require('express/lib/response');

const client = sheetdb({ address: "ugjgyx0u56vge" });

const app = express();
const port = 3000;
// Middleware
app.use(express.static("./public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/database", (req, res) => {});

app.post("/", (req, res) => {
  const fName = req.body.First;
  const lName = req.body.Last;
  const Email = req.body.Email;

  // let email = client.read({E_mail: Email })
  // console.log(email)

  client
    .read({ search: { First_Name: fName, Last_Name: lName, E_mail: Email } })
    .then(
      function (data) {
        const da = JSON.parse(data);
        if (da.length === 0) {
          client
            .create({ First_Name: fName, Last_Name: lName, E_mail: Email })
            .then(
              function (data) {
                const da = JSON.parse(data);

                if (data) {
                  res.sendFile(`${__dirname}/success.html`);
                }
              },
              function (err) {
                console.log(err);
              }
            );
        }
        else {
            res.sendFile(`${__dirname}/failure.html`)
        }
      },
      function (err) {
        console.log(err);
      }
    );
});
app.post('/failure', (req, res)=>{
    res.redirect('/')
})

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
