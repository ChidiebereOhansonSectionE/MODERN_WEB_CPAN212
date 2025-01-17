const http = require("http")
const app = http.createServer((req, res)=>{
    if(req.url === "/") {
        res.end("hello from Home")
    } else if(req.url === "/homepage") {
        res.end("hello from hompage")
    } else if(req.url === "/About") {
        res.end("hello from About page")
    } else if(req.url === "/contact_us") {
        res.end("hello from Contact Us Here")
    } else if(req.url === "/Login") {
        res.end("hello from Login page")
    } else if(req.url === "/fetch_data") {
        res.end("hello from Fetch page")
    }
    else {
        res.end("page not found")
    }
})
app.listen(8000)