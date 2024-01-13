import express from "express";
import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";
import bodyParser from "body-parser";


inquirer
  .prompt([
    {
      // message: "Type in your URL: ",
      // name: "URL",
    },
  ])
  .then((answers) =>{
    const url = answers.URL;
    var qr_svg = qr.image(url);
    qr_svg.pipe(fs.createWriteStream("Certificates.png"));
  })
  .catch((error) =>{
    if (error.isTtyError) {

    } else {

    }
  });


const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
  res.render("main.ejs");
});

app.get("/about_me", (req, res) => {
  res.render("about_me.ejs");
});

app.get("/contact_me", (req, res) => {
  res.render("contact_me.ejs");
});

app.post("/contact_me", (req, res) =>{
  const heading = req.body["name"] + req.body["email"] + req.body["text"];
  res.render("contact_me.ejs", {Heading : heading});
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
