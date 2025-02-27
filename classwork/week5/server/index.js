import express from "express";
import cors from "cors";
import multer from "multer";

// grab info, parse info, save file in destination, 

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniquePrefix + file.fieldname);
  },
});

const upload = multer({ storage: storage })
 
const app = express();
const PORT = process.env.PORT || 8000;
 
// middlelware
app.use(cors());
app.use(express.urlencoded({extended:true})); //plain HTML FORMS
app.use(express.json()); //accepts json DATA
 
// routes
app.get("/", (req, res) => {
  res.send("Welcome to our server");
});

app.get("/data", (req, res) => {
  res.send({
    name: "Ohanson",
    password:"12345",
    username: "Andy"

  });
});

app.post("/login", (req, res)=>{
  console.log(req.body);
  res.json("I got your info");
});

app.post("upload", upload.single("file", (req,res)=>{
    console.log(req, body)
    console.log(req.file)
    res.json("I got your file");
}))
 
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
 
app.use("", (req, res) => {
  res.status(404).send("Page not found");
});

/*
React ->Server-> /image -> Parse for req.body with multer -> save the file
*/