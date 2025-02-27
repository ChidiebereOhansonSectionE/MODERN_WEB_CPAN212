const {logger} = require("./middleware/logger") 
const {auth} = require("./middleware/auth")

const express = require("express"); // if using common JS (Default)
 
const app = express();
const PORT = process.env.PORT || 8000;


// middlelware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger); //app wide
 
// routes

app.get("/profile", auth, (req, res) => {
    res.send("Welcome to you Profile page");
});

app.get("/01", (req, res) => {

    // DO SOMTHING - middleware
    // DO SOMETHING ELSE - Middleware

    logger(req);

  res.send("Welcome to our server - 01");
});

app.get("/02", (req, res) => {

    logger(req);
    res.send("Welcome to our server - 02");
  });





 
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
 
app.use("", (req, res) => {
  res.status(404).send("Page not found");
});