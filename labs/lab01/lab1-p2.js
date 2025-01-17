const http = require("http");
const fs = require("fs");

const app = http.createServer((req, res)=>{
    if(req.url === "/") {
        let webpage = fs.readFileSync("homepage.html")
        res.end(webpage)
    }else if (req.url ==="/homepage") {
        let webpage = fs.readFileSync("homepage.html")
        res.end("webpage")
    }
    else if (req.url ==="/about") {}
    else if (req.url ==="/contact") {}
    else if (req.url ==="/login") {}
    else  {res.end("Error 404 - Page not found")}
})

let PORT = 8000
app.listen(PORT, ()=>{
    console.log(`http://localhost:${PORT}`)
});