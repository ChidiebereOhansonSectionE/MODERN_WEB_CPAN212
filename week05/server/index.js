import express from "express"; // if you are using type: module
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 8000;

// middlelware
// need to modify if deployed
app.use(cors());
app.use(express.urlencoded({extended: true})); // Allows HTML forms
app.use(express.json()); // For our class stuff

// routes
app.get("/", (req, res) => {
  res.send("Welcome to our server");
});

// send READ information to user, something that doesnt require auth
app.get("/data", (req, res) => {
  // const data = {
  //   fname: "harman",
  //   lname: "mann",
  // };

  const data = { message: `<h1 style="color:blue">Hello, XSS!</h1>` };


  res.json(data);
});

app.post("/login", (req, res) => {
  console.log(req.body);
  res.json("I stole your Data, hahahaha");
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});

app.use("", (req, res) => {
  res.status(404).send("Page not found");
});
